const { verificarMelhorRota, calcularDistancia } = require('./func');

describe('Função calcularDistancia', () => {
  test('Deve calcular corretamente a distância entre dois pontos', () => {
    const endereco1 = { latitude: 0, longitude: 0 };
    const endereco2 = { latitude: 3, longitude: 4 };

    const distancia = calcularDistancia(endereco1, endereco2);

    expect(distancia).toBe(5);
  });
});

describe('Função verificarMelhorRota', () => {
  test('Deve encontrar a melhor rota com base na menor distância total', () => {
    const pedidos = [
      { endereco: { latitude: 0, longitude: 0 } },
      { endereco: { latitude: 1, longitude: 1 } }
    ];
    const rotas = [
      { latitude: 2, longitude: 2 },
      { latitude: 3, longitude: 3 }
    ];

    const melhorRota = verificarMelhorRota(pedidos, rotas);

    expect(melhorRota).toEqual(rotas[0]);
  });

  test('Deve retornar null se nenhuma rota for fornecida', () => {
    const pedidos = [
      { endereco: { latitude: 0, longitude: 0 } },
      { endereco: { latitude: 1, longitude: 1 } }
    ];

    const melhorRota = verificarMelhorRota(pedidos, []);

    expect(melhorRota).toBeNull();
  });

  test('Deve lidar com pedidos sem endereço', () => {
    const pedidos = [
      { endereco: { latitude: 0, longitude: 0 } },
      {} // Pedido sem endereço
    ];
    const rotas = [
      { latitude: 2, longitude: 2 }
    ];

    const melhorRota = verificarMelhorRota(pedidos, rotas);

    expect(melhorRota).toEqual(rotas[0]);
  });
});
