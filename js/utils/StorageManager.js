class StorageManager {
    static get inventario() {
        return JSON.parse(localStorage.getItem('inventario')) ?? [];
    }

    static set inventario(inventario) {
        localStorage.setItem('inventario', JSON.stringify(inventario));
    }
}
