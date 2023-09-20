document.getElementById('quantidade').textContent = Storage.inventario.length;
document.getElementById('total').textContent = Storage.inventario
    .reduce((valor, prod) => valor + prod.precoUnitario * prod.quantidade, 0)
    .toFixed(2);

function criarItem(produto) {
    const item = document.createElement('li');

    item.classList.add('produto');

    const header = document.createElement('div');
    header.classList.add('header');

    const title = document.createElement('h2');
    const id = document.createElement('p');

    header.append(title, id);

    const price = document.createElement('p');
    const quantidade = document.createElement('p');

    title.textContent = produto.nome;
    price.textContent = `R$${parseFloat(produto.precoUnitario).toFixed(2)}`;
    id.textContent = produto.id;
    quantidade.textContent = produto.quantidade;

    item.append(header, price, quantidade);

    return item;
}

for (const produto of Storage.inventario) {
    document.getElementById('produtos').appendChild(criarItem(produto));
}
