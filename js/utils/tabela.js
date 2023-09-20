class Tabela {
    #elementoTabela = document.querySelector('table');

    #criarLinha(...elementos) {
        const linha = this.#elementoTabela.insertRow();

        for (let elemento of elementos) {
            const celula = linha.insertCell();

            if (typeof elemento !== 'object') {
                elemento = document.createTextNode(elemento);
            }

            celula.appendChild(elemento);
            linha.appendChild(celula);
        }
    }

    #criarBotao(id) {
        const botao = document.createElement('button');
        botao.classList.add('botao-remover');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('height', '1em');
        svg.setAttribute('viewBox', '0 0 448 512');
        svg.setAttribute('width', '1em');
        svg.setAttribute('fill', 'currentColor');
        svg.innerHTML = '<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>'
        svg.style.scale = '1.4';

        botao.appendChild(svg);

        botao.addEventListener('click', () => {
            const dialog = document.querySelector('dialog#confirm-remove');
            dialog.showModal();

            const form = dialog.querySelector('form');
            const produto = Storage.inventario.find(
                (produto) => produto.id === id,
            );

            form.querySelector(
                'p',
            ).textContent = `Você tem certeza que quer remover ${produto.nome} (${produto.id})?`;

            form.addEventListener('submit', ({ submitter }) => {
                if (submitter.value === 'Sim') {
                    estoque.deletar(id);

                    Storage.inventario = estoque.produtos;
                    tabela.atualizar();
                    select.atualizar();

                    limparFormUpdate();
                }
            });
        });

        return botao;
    }

    atualizar() {
        this.#elementoTabela.innerHTML = '';
        this.#criarLinha(
            'ID',
            'Nome',
            'Quantidade',
            'Preço Unitário',
            'Preço Total',
            '',
        );

        for (const produto of Storage.inventario) {
            this.#criarLinha(
                produto.id,
                produto.nome,
                produto.quantidade,
                `R$${parseFloat(produto.precoUnitario).toFixed(2)}`,
                `R$${(produto.quantidade * produto.precoUnitario).toFixed(2)}`,
                this.#criarBotao(produto.id),
            );
        }

        const total = Storage.inventario.reduce(function (valor, prod) {
            return valor + prod.precoUnitario * prod.quantidade;
        }, 0);
        this.#criarLinha('', '', '', '', `R$${total.toFixed(2)}`, '');
    }
}
