const calcularDistancia = (endereco1, endereco2) => {
    return Math.sqrt(
        Math.pow(endereco2.latitude - endereco1.latitude, 2) +
        Math.pow(endereco2.longitude - endereco1.longitude, 2)
    );
}

const verificarMelhorRota = (pedidos, rotas) => {
    let melhorRota = null;
    let menorDistancia = Infinity;

    rotas.forEach(rota => {
        let distanciaTotal = 0;

        pedidos.forEach(pedido => {
            if (pedido.endereco) {
                distanciaTotal += calcularDistancia(pedido.endereco, rota);
            }
        });

        if(distanciaTotal < menorDistancia){
            menorDistancia = distanciaTotal;
            melhorRota = rota;
        }
    });

    return melhorRota;
}

module.exports = { verificarMelhorRota, calcularDistancia };
