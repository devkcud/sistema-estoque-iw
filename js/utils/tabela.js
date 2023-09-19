class Tabela {
    #elementoTabela = document.querySelector('table');

    #criarLinha(celulas) {
        const row = this.#elementoTabela.insertRow();

        for (const texto of celulas) {
            row.insertCell().textContent = texto;
        }

        return row;
    }

    #criarCelulaEstoque(produto) {
        const celula = this.#elementoTabela.insertRow();

        const botaoDiminuir = document.createElement('button');
        botaoDiminuir.textContent = '-';
        botaoDiminuir.addEventListener('click', () => {
            estoque.atualizar(produto.id, produto.nome, parseInt(produto.quantidade) - 1, produto.precoUnitario);

            Storage.inventario = estoque.produtos;
            this.atualizar();
        });

        const botaoAumentar = document.createElement('button');
        botaoAumentar.textContent = '+';
        botaoAumentar.addEventListener('click', () => {
            estoque.atualizar(produto.id, produto.nome, parseInt(produto.quantidade) + 1, produto.precoUnitario);

            Storage.inventario = estoque.produtos;
            this.atualizar();
        });

        botaoDiminuir.style.marginRight = '10px';
        botaoAumentar.style.marginLeft = '10px';

        celula.appendChild(botaoDiminuir);
        celula.appendChild(document.createTextNode(produto.quantidade));
        celula.appendChild(botaoAumentar);

        return celula;
    }

    atualizar() {
        this.#elementoTabela.innerHTML = '';
        this.#criarLinha([
            'ID',
            'Nome',
            'Quantidade',
            'Preço Unitário',
            'Preço Total',
        ]);

        for (const produto of Storage.inventario) {
            const linha = this.#criarLinha([produto.id, produto.nome]);

            linha.insertCell().appendChild(this.#criarCelulaEstoque(produto));

            linha.insertCell().textContent = `R$${parseFloat(
                produto.precoUnitario,
            ).toFixed(2)}`;
            linha.insertCell().textContent = `R$${(
                produto.quantidade * produto.precoUnitario
            ).toFixed(2)}`;
        }

        const total = Storage.inventario.reduce(function (
            valor,
            { precoUnitario, quantidade },
        ) {
            return valor + precoUnitario * quantidade;
        }, 0);
        this.#criarLinha(['', '', '', '', `R$${total.toFixed(2)}`]);
    }
}
