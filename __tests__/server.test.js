'use strict';
const { app } = require('../src/server');  
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {

  it('Page not found error (404) on an invalid route', async () => {
    const response = await mockRequest.get('/fo');
    expect(response.status).toBe(404);
  });
  it('Page not found error (404) on an invalid method', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toBe(404);
  });

  it('Create a food item', async () => {
    const response = await mockRequest.post('/food').send({
      name: 'Pizza',
      price: 10
    });
    expect(response.status).toBe(201);
  });

  it('Return all food items', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);

  });

  it('Return one specific food item', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });

  it('Update one specific food item', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });

  it('Delete one specific food item', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  await db.drop();
});