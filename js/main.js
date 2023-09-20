const estoque = new Estoque();
const tabela = new Tabela();
const select = new Select();

const formAdd = document.getElementById('form-add');
const formUpdate = document.getElementById('form-update');

tabela.atualizar();
select.atualizar();

function limparFormUpdate() {
    formUpdate.querySelector('select').value = '';
    formUpdate.querySelector('input[name="nome"]').value = '';
    formUpdate.querySelector('input[name="quantidade"]').value = '';
    formUpdate.querySelector('input[name="preco"]').value = '';
}

limparFormUpdate();

formAdd.addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.adicionar(
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';

    Storage.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();

    limparFormUpdate();
});

formUpdate.querySelector('select').addEventListener('change', (e) => {
    formUpdate.querySelector('input[name="nome"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).nome;

    formUpdate.querySelector('input[name="quantidade"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).quantidade;

    formUpdate.querySelector('input[name="preco"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).precoUnitario;
});

formUpdate.addEventListener('submit', (e) => {
    e.preventDefault();

    estoque.atualizar(
        e.target['id-select'].value,
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    Storage.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();

    limparFormUpdate();
});
