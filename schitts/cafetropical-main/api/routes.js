"use strict";

module.exports = app => {
  const router = app.get("router");

  app.get('/getCustomerList', (request, response) => {
    let q = 'SELECT * FROM customer ';
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    //console.log("getOrders")
  })
  app.post('/newCustomer', (request, response) => {
    var body = request.body;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted)
    let q = `INSERT INTO customer(
      customer_name,
      customer_type,
      customer_datecreated)
      VALUES('test',  1, '` + formatted + `') RETURNING  *`;
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })
  app.post('/updateCustomer', (request, response) => {
    var body = request.body;
    var query = ` UPDATE customer SET `;

    for (var key in body['fields']) {
      if (body['fields'][key] !== '' && body['fields'][key] != undefined && body['fields'][key] != null) {

        if (!paramIsFirst) {
          query += ` , `;
        }
        query += key + `='` + body['fields'][key] + `'`
        paramIsFirst = false;
      }
    }
    query += ` WHERE customer_id = $1`
    app.get('pool').query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })
  app.get('/getOrderList', (request, response) => {
    let q = `SELECT * FROM 'order' `;
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })
  app.post('/newOrder', (request, response) => {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted)
    let q = `INSERT INTO order(
        order_name,
        order_type,
        order_datecreated)
        VALUES('test',  1, '` + formatted + `') RETURNING  *`;
    
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      //createOrderMenuItemRecord for each items associated

      //createOrderCustomerRecord for each customer associated
      
      response.status(200).json(results.rows)
    })
    //console.log("getOrders")

  })
  app.post('/updateOrder', (request, response) => {
    var body = request.body;
    var query = ` UPDATE order SET `;

    for (var key in body['fields']) {
      if (body['fields'][key] !== '' && body['fields'][key] != undefined && body['fields'][key] != null) {

        if (!paramIsFirst) {
          query += ` , `;
        }
        query += key + `='` + body['fields'][key] + `'`
        paramIsFirst = false;
      }
    }
    query += ` WHERE order_id = `
    app.get('pool').query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })

  app.get('/getMenuItemList', (request, response) => {
    let q = `SELECT * FROM menuitem `;
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  });
  app.post('/newmenuitem', (request, response) => {
    var body = request.body;
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted)
    console.log(body)
    let q = `INSERT INTO menuitem(
      menuitem_name, 
      menuitem_datecreated,  
      menuitem_type,
      menuitem_maxovercooklevel,
      menuitem_expiringdate, 
      menuitem_price
      )
      VALUES('` + body['name'] + `', 
             '` + formatted + `',
             '` + body['type'].toLowerCase() + `', 
             '` + body['overcookness'] + `',
             '` + body['expirationdate']['year']+'-'+body['expirationdate']['month']+'-'+body['expirationdate']['day'] + `',  
             '` + body['price'] + `'   ) RETURNING  *`;
    app.get('pool').query(q, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  });
  app.post('/updateMenuItem', (request, response) => {
    var body = request.body;
    var query = ` UPDATE menuitem SET `;

    for (var key in body['fields']) {
      if (body['fields'][key] !== '' && body['fields'][key] != undefined && body['fields'][key] != null) {

        if (!paramIsFirst) {
          query += ` , `;
        }
        query += key + `='` + body['fields'][key] + `'`
        paramIsFirst = false;
      }
    }
    query += ` WHERE menuitem_id = $1`
    app.get('pool').query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  });
  return router;
}