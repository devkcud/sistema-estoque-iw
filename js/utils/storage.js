class Storage {
    static nomeStorageLocal = 'inventario';

    static get inventario() {
        return JSON.parse(localStorage.getItem(StorageManager.storageName)) ?? [];
    }

    static set inventario(novoInventario) {
        localStorage.setItem(StorageManager.storageName, JSON.stringify(novoInventario));
    }
}