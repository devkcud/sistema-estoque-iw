class Produto {
    constructor(id, nome, quantidade, precoUnitario) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}

class Estoque {
    #produtos = Storage.inventario;

    #clamp(quantidade) {
        if (quantidade < 0) {
            return 0;
        }

        return quantidade;
    }

    adicionar(nome, quantidade, precoUnitario) {
        let id = Math.random().toString(36).substring(2);

        while (this.#produtos.find((produto) => produto.id === id)) {
            id = Math.random().toString(36).substring(2);
        }

        this.#produtos.push(
            new Produto(id, nome, this.#clamp(quantidade), precoUnitario),
        );
    }

    atualizar(id, nome, quantidade, precoUnitario) {
        const produto = this.#produtos.find((produto) => produto.id === id);

        if (!produto) {
            return;
        }

        function estaVazio(value) {
            return value === '' ? null : value;
        }

        produto.nome = estaVazio(nome) ?? produto.nome;

        produto.quantidade = this.#clamp(
            estaVazio(quantidade) ?? produto.quantidade,
        );

        produto.precoUnitario = this.#clamp(
            estaVazio(precoUnitario) ?? produto.precoUnitario,
        );
    }

    deletar(id) {
        if (id === '*') {
            this.#produtos = [];
            Storage.inventario = [];
            return;
        }

        this.#produtos = this.#produtos.filter((produto) => produto.id !== id);
    }

    get produtos() {
        return this.#produtos;
    }
}
