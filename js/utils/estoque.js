class Produto {
    constructor(id, nome, quantidade, precoUnitario) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}

class Estoque {
    #produtos = StorageManager.inventario;

    adicionar(nome, quantidade, precoUnitario) {
        let id = Math.random().toString(36).substring(2);

        while (this.#produtos.find((produto) => produto.id === id)) {
            id = Math.random().toString(36).substring(2);
        }

        this.#produtos.push(new Produto(id, nome, quantidade, precoUnitario));
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
        produto.quantidade = estaVazio(quantidade) ?? produto.quantidade;
        produto.precoUnitario = estaVazio(precoUnitario) ?? produto.precoUnitario;
    }

    deletar(id) {
        if (id === '*') {
            this.#produtos = [];
            StorageManager.inventario = [];
            return;
        }

        this.#produtos = this.#produtos.filter((produto) => produto.id !== id);
    }

    get produtos() {
        return this.#produtos;
    }
}
