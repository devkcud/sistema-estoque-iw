class Tabela {
    #table = document.querySelector('table');

    #insertHeader() {
        const headerRow = this.#table.insertRow();

        headerRow.insertCell().textContent = 'ID';
        headerRow.insertCell().textContent = 'Nome';
        headerRow.insertCell().textContent = 'Quantidade';
        headerRow.insertCell().textContent = 'Preço Unitário';
        headerRow.insertCell().textContent = 'Preço Total';
    }

    #insertRow(id, nome, quantidade, precoUnitario) {
        const row = this.#table.insertRow();

        row.insertCell().textContent = id;
        row.insertCell().textContent = nome;
        row.insertCell().textContent = quantidade;
        row.insertCell().textContent = `R$${precoUnitario}`;
        row.insertCell().textContent = `R$${quantidade * precoUnitario}`;
    }

    #insertFooter() {
        const footerRow = this.#table.insertRow();

        const lastCell = footerRow.insertCell();
        lastCell.textContent = 'Total';
        lastCell.colSpan = 4;

        const valueCell = footerRow.insertCell();
        valueCell.textContent =
            'R$' +
            inv.items.reduce(
                (total, produto) => total + produto[3] * produto[2],
                0,
            );
        valueCell.colSpan = 1;
    }

    update() {
        this.#table.innerHTML = '';
        this.#insertHeader();

        for (const item of inv.items) {
            this.#insertRow(item[0], item[1], item[2], item[3]);
        }

        this.#insertFooter();
    }
}

const table = new Tabela();

class Inventario {
    #items;

    constructor() {
        this.#items = JSON.parse(localStorage.getItem('inventario')) ?? [];
    }

    #store() {
        localStorage.setItem('inventario', JSON.stringify(this.#items));
        table.update();
    }

    add(nome, quantidade, precoUnitario) {
        let id = Math.random().toString(36).substring(2);

        while (this.#items.find((produto) => produto[0] === id)) {
            id = Math.random().toString(36).substring(2);
        }

        this.#items.push([id, nome, quantidade, precoUnitario]);

        this.#store();
    }

    update(id, obj) {
        for (const item of this.#items) {
            if (item[0] === id) {
                item[1] = obj.nome ?? item[1];
                item[2] = obj.quantidade ?? item[2];
                item[3] = obj.precoUnitario ?? item[3];

                break;
            }
        }

        this.#store();
    }

    delete(id) {
        if (id === '*') {
            this.#items = [];
        } else {
            this.#items = this.#items.filter((produto) => produto[0] !== id);
        }

        this.#store();
    }

    get items() {
        return this.#items;
    }
}

const inv = new Inventario();

table.update();

document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();

    inv.add(
        e.target['nome'].value,
        e.target['quantidade'].value,
        e.target['preco'].value,
    );

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';
});

document.getElementById('form-update').addEventListener('submit', (e) => {
    e.preventDefault();

    function estaVazio(value) {
        return value === '' ? null : value;
    }

    inv.update(e.target['id'].value, {
        nome: estaVazio(e.target['nome'].value),
        quantidade: estaVazio(e.target['quantidade'].value),
        precoUnitario: estaVazio(e.target['preco'].value),
    });

    e.target['nome'].value = '';
    e.target['quantidade'].value = '';
    e.target['preco'].value = '';
});

document.getElementById('form-remove').addEventListener('submit', (e) => {
    e.preventDefault();

    inv.delete(e.target['id'].value);
    e.target['id'].value = '';
});
