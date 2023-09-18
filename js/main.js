const estoque = new Estoque();
const tabela = new Tabela();

tabela.atualizar();

document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.adicionar(
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';

    StorageManager.inventario = estoque.produtos;
    tabela.atualizar();
});

document.getElementById('form-update').addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.atualizar(
        e.target['id'].value,
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';

    StorageManager.inventario = estoque.produtos;
    tabela.atualizar();
});

document.getElementById('form-remove').addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.deletar(e.target['id'].value);
    e.target['id'].value = '';

    StorageManager.inventario = estoque.produtos;
    tabela.atualizar();
});
