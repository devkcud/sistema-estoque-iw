const estoque = new Estoque();
const tabela = new Tabela();
const select = new Select();

tabela.atualizar();
select.atualizar();

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
    select.atualizar();
});

document.getElementById('form-update').addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.atualizar(
        e.target['id-select'].value,
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';

    const indexAnterior = e.target['id-select'].selectedIndex;

    StorageManager.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();

    e.target['id-select'].selectedIndex = indexAnterior;
});

document.getElementById('form-remove').addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.deletar(e.target['id-select'].value);

    StorageManager.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();
});
