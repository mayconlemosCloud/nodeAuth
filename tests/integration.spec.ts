import request from 'supertest';
import { app } from '../src/app';
import { AppDataSource } from '../src/config/database';

describe('Auth & User Integration Tests', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    // Clean database before tests
    await AppDataSource.synchronize(true);
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  let token: string;

  it('should register a new user (POST /api/user)', async () => {
    const res = await request(app)
      .post('/api/user')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
    expect(res.body).not.toHaveProperty('password');
  });

  it('should not register user with duplicate email', async () => {
    const res = await request(app)
      .post('/api/user')
      .send(testUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Email already in use');
  });

  it('should login and return tokens (POST /api/auth/login)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    token = res.body.accessToken;
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
  });

  it('should access protected route with token (GET /api/user)', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should block access to protected route without token', async () => {
    const res = await request(app).get('/api/user');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('No token provided');
  });
});
