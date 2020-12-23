'use strict';

const app = require('../../src/app');
const request = require('supertest')(app);

const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate user with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request.post('/sessions')
                                    .send({
                                        email: user.email,
                                        password: '123123'
                                    });

        expect(response.status).toBe(200);
    });

    it('should not authenticate user with invalid username', async () => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request.post('/sessions')
                                    .send({
                                        email: 'aa',
                                        password: '123124'
                                    });

        expect(response.status).toBe(401);
    });

    it('should not authenticate user with invalid password', async () => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request.post('/sessions')
                                    .send({
                                        email: user.email,
                                        password: '123124'
                                    });

        expect(response.status).toBe(401);
    });

    it('should receive JWT Token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request.post('/sessions')
                                    .send({
                                        email: user.email,
                                        password: '123123'
                                    });

        expect(response.body).toHaveProperty('token');
    });

    it('should not be able to access private routes with jwt token', async () => {
        const user = await factory.create('User');
      
        const token = user.generateToken();

        const response = await request.get('/dashboard').set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('should not be able to access private routes without jwt token', async () => {
        const user = await factory.create('User');

        const response = await request.get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to access private routes with ivalid jwt token', async () => {
        const user = await factory.create('User');

        const response = await request.get('/dashboard')
                                    .set('Authorization', `Bearer 123blabla`)
                                    .send();

        expect(response.status).toBe(401);
    });
});