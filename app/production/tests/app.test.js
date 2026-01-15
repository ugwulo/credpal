const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('App is running OK');
  });

  it('GET /status should return JSON with UP status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  it('POST /process should return 202', async () => {
    const res = await request(app)
      .post('/process')
      .send({ test: 'data' });
    expect(res.statusCode).toEqual(202);
    expect(res.body.message).toBe('Data received');
  });
});