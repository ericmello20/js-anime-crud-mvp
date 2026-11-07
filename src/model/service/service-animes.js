export class ServiceAnimes{

    #repositoryAnimes;
    #repositoryCapas;
    #storage;
    constructor(repositoryAnimes, repositoryCapas, storage){
        this.#repositoryAnimes = repositoryAnimes;
        this.#repositoryCapas = repositoryCapas;
        this.#storage = storage;
    }

    async getAnimes(){
        return await this.#repositoryAnimes.getAnimes();
    }

    async getAnimeById(id){
        return await this.#repositoryAnimes.getAnimeById(id);
    }

    async postAnime(nome, temporadas, episodios, lancamento, fim, sinopse){
        const anime = this.#criarAnime(nome, temporadas, episodios, lancamento, fim, sinopse);
        await this.#repositoryAnimes.postAnime(anime);
    }

    
    async removeAnime(id){
        await this.#repositoryAnimes.removeAnime(id);
    }
    

    async editAnime(id, nome, temporadas, episodios, lancamento, fim, sinopse){
        const anime = this.#criarAnime(nome, temporadas, episodios, lancamento, fim, sinopse);
        await this.#repositoryAnimes.editAnime(id, anime);
    }

    #criarAnime(nome, temporadas, episodios, lancamento, fim, sinopse){
        return {
            nome,
            temporadas,
            episodios,
            lancamento: this.#getDataFormatada(lancamento),
            fim: fim == 'em andamento' ? 'em andamento' : this.#getDataFormatada(fim),
            sinopse
        }
    }

    #getDataFormatada( data ){
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    getDataInternacional( data ){
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    }

    async getPosterByName(nome){
        return await this.#repositoryCapas.getPosterByName(nome);
    }

    getStorageCapas(){
        return this.#storage.storage;
    }

    setStorageCapas(capa){
        this.#storage.storage = capa;
    }
}

