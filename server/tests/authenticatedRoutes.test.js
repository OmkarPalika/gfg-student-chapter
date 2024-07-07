import request from 'supertest';
import app from '../server';

describe('Authenticated Routes', () => {
  let authToken = '';

  beforeAll(async () => {
    // Register a test user to obtain authentication token
    const userData = {
      name: 'Test User',
      email: 'auth_test@example.com',
      password: 'password123',
    };

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(userData);

    authToken = registerRes.body.token;
  });

  it('should fetch user profile for authenticated user', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('should return 401 for unauthorized access', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', '');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error');
  });

  afterAll(async () => {
    // Clean up: Delete test user after tests
    await request(app)
      .delete('/api/auth/delete-test-user')
      .set('Authorization', `Bearer ${authToken}`);
  });
});

