const STORAGE_KEY = 'capas';
export class StorageCapas{
    get storage(){
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    }

    set storage(capa) {
        const capas = this.storage;
        const jaExiste = capas.some(item => item.nome.toLowerCase() === capa.nome.toLowerCase());
        if (!jaExiste) {
            capas.push(capa);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(capas));
        }
    }
}

