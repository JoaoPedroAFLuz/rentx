import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `
        INSERT
        INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
        VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', 'XXXXXXXX', true, 'now()')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { access_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category name Supertest',
        description: 'Category description Supertest',
      })
      .set({
        Authorization: `Bearer ${access_token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with name in use', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { access_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category name Supertest',
        description: 'Category description Supertest',
      })
      .set({
        Authorization: `Bearer ${access_token}`,
      });

    expect(response.status).toBe(400);
  });
});
