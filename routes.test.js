const request = require('supertest');
const app = require('./app');

describe('Testes de rotas', () => {
    it('Deve retornar uma lista de usuários ao acessar a rota GET /users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('Deve criar um novo usuário ao acessar a rota POST /users', async () => {
        const newUser = {
            name: 'Teste',
            email: 'teste@example.com',
            password: 'senha123'
        };
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    // Implemente mais testes para as outras rotas
});
