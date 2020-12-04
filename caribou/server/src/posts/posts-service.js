// methods to store database transactions
let table = 'posts';

const PostsService = {
	getAllPosts(knex) {
		return knex.select('*').from(table);
	},
	insertPost(knex, newPost) {
		return knex
			.insert(newPost)
			.into(table)
			.returning('*')
			.then(rows => {
				return rows[0];
			});
	},
	deletePost(knex, id) {
		return knex(table)
			.where({ id })
			.delete();
	},
	updatePost(knex, id, newPostFields) {
		return knex(table)
			.where({ id })
			.update(newPostFields);
	}
};

module.exports = PostsService;