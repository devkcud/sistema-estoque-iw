class Storage {
    static nomeStorageLocal = 'inventario';

    static get inventario() {
        return JSON.parse(localStorage.getItem(Storage.storageName)) ?? [];
    }

    static set inventario(novoInventario) {
        localStorage.setItem(Storage.storageName, JSON.stringify(novoInventario));
    }
}
