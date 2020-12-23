const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controller/SessionController');

//public
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); //authenticated routes

routes.get('/dashboard', (request, response) => {
    console.log('teste');
    return response.status(200).send();
});

module.exports = routes;