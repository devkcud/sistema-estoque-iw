class Tabela {
    #elementoTabela = document.querySelector('table');

    #criarLinha(celulas) {
        const row = this.#elementoTabela.insertRow();

        for (const texto of celulas) {
            row.insertCell().textContent = texto;
        }
    }

    atualizar() {
        this.#elementoTabela.innerHTML = '';
        this.#criarLinha([
            'ID',
            'Nome',
            'Quantidade',
            'Preço Unitário',
            'Preço Total',
        ]);

        for (const produto of Storage.inventario) {
            this.#criarLinha([
                produto.id,
                produto.nome,
                produto.quantidade,
                `R$${parseFloat(produto.precoUnitario).toFixed(2)}`,
                `R$${(produto.quantidade * produto.precoUnitario).toFixed(2)}`,
            ]);
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
