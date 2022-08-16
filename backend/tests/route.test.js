import request from 'supertest';
import app from '../app.js';

describe('Time route should display time in Epoch', () => {
  test('responds to /time', async () => {
    const res = await request(app).get('/time').set({ Authorization: 'mysecrettoken' });
    expect(res.statusCode).toBe(200);
    expect(typeof JSON.parse(res.text).epoch.timeEpoch).toBe('number');
  });
});
