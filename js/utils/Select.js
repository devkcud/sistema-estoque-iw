class Select {
    #elementosSelect = document.querySelectorAll('select[name="id-select"]');

    atualizar() {
        function criarOption(id, nome) {
            const option = document.createElement('option');

            option.value = id;
            option.textContent = nome;

            return option;
        }

        this.#elementosSelect.forEach((select) => {
            select.innerHTML = '';

            const optionVazio = document.createElement('option');
            optionVazio.textContent = 'Selecione um produto';
            optionVazio.value = '';
            optionVazio.selected = true;
            optionVazio.disabled = true;
            optionVazio.hidden = true;

            select.appendChild(optionVazio);

            StorageManager.inventario.forEach((produto) =>
                select.appendChild(criarOption(produto.id, `${produto.nome} (${produto.id})`)),
            );
        });
    }
}
