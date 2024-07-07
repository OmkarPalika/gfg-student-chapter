import request from 'supertest';
import app from '../server';

describe('Auth API', () => {
  let authToken = '';

  afterEach(async () => {
    // Clean up: Delete test user after each test
    await request(app)
      .delete('/api/auth/delete-test-user')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should register a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token; // Store token for cleanup
  });

  it('should return 400 for incomplete registration data', async () => {
    const incompleteUserData = {
      name: 'Test User',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(incompleteUserData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid email during registration', async () => {
    const invalidEmailUserData = {
      name: 'Test User',
      email: 'invalidemail',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(invalidEmailUserData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for incorrect login credentials', async () => {
    const incorrectLoginData = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(incorrectLoginData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

