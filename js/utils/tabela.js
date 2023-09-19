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

    atualizar() {
        this.#elementoTabela.innerHTML = '';
        this.#criarLinha(
            'ID',
            'Nome',
            'Quantidade',
            'Preço Unitário',
            'Preço Total',
        );

        for (const produto of Storage.inventario) {
            this.#criarLinha(
                produto.id,
                produto.nome,
                produto.quantidade,
                `R$${parseFloat(produto.precoUnitario).toFixed(2)}`,
                `R$${(produto.quantidade * produto.precoUnitario).toFixed(2)}`,
            );
        }

        const total = Storage.inventario.reduce(function (valor, prod) {
            return valor + prod.precoUnitario * prod.quantidade;
        }, 0);
        this.#criarLinha('', '', '', '', `R$${total.toFixed(2)}`);
    }
}
