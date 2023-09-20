const estoque = new Estoque();
const tabela = new Tabela();
const select = new Select();

const formInsert = document.getElementById('form-insert');

tabela.atualizar();
select.atualizar();

function limparFormUpdate(limparSelect = true) {
    if (limparSelect) {
        formInsert.querySelector('select').value = '';
    }

    formInsert.querySelector('input[name="nome"]').value = '';
    formInsert.querySelector('input[name="quantidade"]').value = '';
    formInsert.querySelector('input[name="preco"]').value = '';
}

limparFormUpdate();

formInsert.querySelector('select').addEventListener('change', (e) => {
    if (e.target.value === 'novo') {
        limparFormUpdate(false);
        return;
    }

    formInsert.querySelector('input[name="nome"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).nome;

    formInsert.querySelector('input[name="quantidade"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).quantidade;

    formInsert.querySelector('input[name="preco"]').value =
        Storage.inventario.find(
            (produto) => produto.id === e.target.value,
        ).precoUnitario;
});

formInsert.addEventListener('submit', (e) => {
    e.preventDefault();

    if (formInsert.querySelector('select').value === 'novo') {
        estoque.adicionar(
            e.target['nome'].value,
            e.target['quantidade'].value,
            e.target['preco'].value,
        );
    } else {
        estoque.atualizar(
            e.target['id-select'].value,
            e.target['nome'].value,
            e.target['quantidade'].value,
            e.target['preco'].value,
        );
    }

    Storage.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();

    limparFormUpdate();
});
