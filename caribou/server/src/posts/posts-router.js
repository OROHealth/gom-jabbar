//loading external resources
const path = require('path');
const express = require('express');
const xss = require('xss');
const logger = require('../logger');

//include service and validator
const PostService = require('./posts-service');
const { getPostValidationError } = require('./posts-validator');

//define postsRouter and jsonParser for reuse
const postsRouter = express.Router();
const jsonParser = express.json();

//serialization method to display selective data related to posts
const serializePost = post => ({
	id: post.id,
	content: xss(post.content),
	modified: post.modified
});

//routes
postRouter
	.route('/')
	//get all posts
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');
		PostService.getAllPosts(knexInstance)
			.then(posts => {
				res.json(posts.map(serializePost));
			})
			.catch(next);
	})
	//add new post
	.post(jsonParser, (req, res, next) => {
		const { content } = req.body;
		const newPost = { content };

		const knexInstance = req.app.get('db');
		//validating the fields we send accross
		for (const field of ['content']) {
			if (!req.body[field]) {
				logger.error({
					message: `${field} is required`,
					request: `${req.originalUrl}`,
					method: `${req.method}`,
					ip: `${req.ip}`
				});
				return res.status(400).send({
					error: { message: `'${field}' is required` }
				});
			}
		}
		//validates server where data is sent
		const error = getPostValidationError(newPost);
		if (error) {
			logger.error({
				message: `POST Validation Error`,
				request: `${req.originalUrl}`,
				method: `${req.method}`,
				ip: `${req.ip}`
			});
			return res.status(400).send(error);
		}
		//sending data to service in order to save data in db
		PostService.insertPost(knexInstance, newPost)
			.then(post => {
				logger.info({
					message: `Post with id ${post.id} created.`,
					request: `${req.originalUrl}`,
					method: `${req.method}`,
					ip: `${req.ip}`
				});
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${post.id}`))
					.json(serializePost(post));
			})
			.catch(next);
	});
//routes by id
postRouter
	.route('/:id')
	.all((req, res, next) => {
		const { id } = req.params;
		const knexInstance = req.app.get('db');
		PostService.getById(knexInstance, id)
			.then(post => {
				if (!post) {
					logger.error({
						message: `Post with id ${id} not found.`,
						request: `${req.originalUrl}`,
						method: `${req.method}`,
						ip: `${req.ip}`
					});
					return res.status(404).json({
						error: { message: `Post Not Found` }
					});
				}
				res.post = post;
				next();
			})
			.catch(next);
	})
	//get posts by id
	.get((req, res) => {
		res.json(serializePost(res.post));
	})
	//delete postby id
	.delete((req, res, next) => {
		const { id } = req.params;
		const knexInstance = req.app.get('db');
		PostService.deletePost(knexInstance, id)
			.then(numRowsAffected => {
				logger.info({
					message: `Post with id ${id} deleted.`,
					request: `${req.originalUrl}`,
					method: `${req.method}`,
					ip: `${req.ip}`
				});
				// need to send back message instead of .end()
				res.status(204).json({
					message: true
				});
			})
			.catch(next);
	})
	//patch by id
	.patch(jsonParser, (req, res, next) => {
		const knexInstance = req.app.get('db');
		const { id } = req.params;
		const { content } = req.body;
		const postToUpdate = { content };

		const numberOfValues = Object.values(postToUpdate).filter(Boolean).length;
		if (numberOfValues === 0) {
			logger.error({
				message: `Invalid update without required fields`,
				request: `${req.originalUrl}`,
				method: `${req.method}`,
				ip: `${req.ip}`
			});
			return res.status(400).json({
				error: {
					message: `Request body must contain either 'content'`
				}
			});
		}

		const error = getPostValidationError(postToUpdate);
		if (error) {
			logger.error({
				message: `PATCH Validation Error`,
				request: `${req.originalUrl}`,
				method: `${req.method}`,
				ip: `${req.ip}`
			});
			return res.status(400).send(error);
		}

		PostService.updatePost(knexInstance, id, postToUpdate)
			.then(numRowsAffected => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = postRouter;