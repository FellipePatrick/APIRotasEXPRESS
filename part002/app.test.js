const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  let testPedidoId;
  let testRotaId;

  test('GET /pedidos', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /pedidos', async () => {
    const newPedido = {
      endereco: { latitude: 10, longitude: 20 },
      produto: 'Produto Teste',
      quantidade: 5,
    };
    const response = await request(app)
      .post('/pedidos')
      .send(newPedido);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newPedido);
    testPedidoId = response.body.id;
  });

  test('GET /rotas', async () => {
    const response = await request(app).get('/rotas');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /rotas', async () => {
    const newRota = { latitude: 30, longitude: 40 };
    const response = await request(app)
      .post('/rotas')
      .send(newRota);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newRota);
    testRotaId = response.body.id;
  });

  test('POST /melhor-rota', async () => {
    const response = await request(app)
      .post('/melhor-rota')
      .send({
        pedidos: [
          { endereco: { latitude: 10, longitude: 20 } },
          { endereco: { latitude: 15, longitude: 25 } },
        ],
        rotas: [
          { latitude: 30, longitude: 40 },
          { latitude: 5, longitude: 10 },
        ],
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('melhorRota');
  });
});
