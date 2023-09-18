class StorageManager {
    static nomeStorage = 'inventario';

    static get inventario() {
        return JSON.parse(localStorage.getItem(storageName)) ?? [];
    }

    static set inventario(novoInventario) {
        localStorage.setItem(storageName, JSON.stringify(novoInventario));
    }
}
