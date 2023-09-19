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

    Storage.inventario = estoque.produtos;
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

    Storage.inventario = estoque.produtos;
    tabela.atualizar();
    select.atualizar();

    e.target['id-select'].selectedIndex = indexAnterior;
});

document.getElementById('form-remove').addEventListener('submit', (e) => {
    e.preventDefault();

    const dialog = document.querySelector('dialog#confirm-remove');
    dialog.showModal();

    const form = dialog.querySelector('form');
    const nomeProduto = Storage.inventario.find(
        (produto) => produto.id === e.target['id-select'].value,
    ).nome;

    form.querySelector(
        'p',
    ).textContent = `Você tem certeza que quer remover ${nomeProduto}?`;

    form.addEventListener('submit', ({ submitter }) => {
        if (submitter.value === 'Sim') {
            estoque.deletar(e.target['id-select'].value);

            Storage.inventario = estoque.produtos;
            tabela.atualizar();
            select.atualizar();
        }
    });
});
