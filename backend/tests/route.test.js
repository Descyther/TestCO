import request from 'supertest';
import app from '../app.js';

describe('Time route should display time in Epoch', () => {
  test('responds to /time', async () => {
    const res = await request(app).get('/time');
    expect(res.header.authorization[1]).toBe('mysecrettoken');
    expect(res.statusCode).toBe(200);
    expect(res.epoch.timeEpoch).toEqual(Math.floor(+new Date() / 1000));
  });
});
