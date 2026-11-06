import { RepositoryAnimes } from "../model/repository/repository-animes.js";
import { RepositoryCapas } from "../model/repository/repository-capas.js";
import { ServiceAnimes } from "../model/service/service-animes.js";
export class PresenterAnimes{
    
    #serviceAnime = null;
    #view = null;

    constructor(view){
        this.#view = view;
        this.#serviceAnime = new ServiceAnimes( new RepositoryAnimes());
    }

    async listarAnimes(){
        try{
            const animes = await this.#serviceAnime.getAnimes();
            this.#view.desenharTabela(animes);
        }catch(erro){
            this.#view.exibirErro(erro.message);
        }
    }

    saveAnime(){
        const form = document.querySelector('form');
        const valido = form.reportValidity();
        if(!valido) return;
        const id = this.#view.id;
        if(id) this.#editAnime(id);
        else this.#postAnime();
        this.limparForm();
    }

    async #postAnime(){
        try{
            await this.#serviceAnime.postAnime(
                this.#view.nome,
                this.#view.temporadas,
                this.#view.episodios,
                this.#view.lancamento,
                this.#view.andamento ? 'em andamento' : this.#view.fim,
                this.#view.sinopse
            );
        }catch(erro){
            this.#view.exibirErro(erro.message);
        }
    }

    async removeAnime(id){
        try{
            await this.#serviceAnime.removeAnime(id);
        }catch(erro){
            this.#view.exibirErro(erro.message);
        }
    }
    
    async #editAnime(id){
        try{
            await this.#serviceAnime.editAnime(
            id,
            this.#view.nome,
            this.#view.temporadas,
            this.#view.episodios,
            this.#view.lancamento,
            this.#view.andamento ? 'em andamento' : this.#view.fim,
            this.#view.sinopse
            );
        }catch(erro){
            this.#view.exibirErro(erro.message);
        }
    }

    limparForm(){
        this.#view.id = '';
        this.#view.nome = '';
        this.#view.temporadas = '';
        this.#view.episodios = '';
        this.#view.lancamento = '';
        this.#view.fim = '';
        this.#view.andamento = false;
        this.#view.sinopse = '';
    }

    async preencheForm(id){
        try{
            const anime = await this.#serviceAnime.getAnimeById(id);
            this.#view.id = anime.id;
            this.#view.nome = anime.nome;
            this.#view.temporadas = anime.temporadas;
            this.#view.episodios = anime.episodios;
            this.#view.lancamento = this.#serviceAnime.getDataInternacional(anime.lancamento);
            if (anime.fim === 'em andamento'){
                this.#view.andamento = true;
                this.#view.fim = '';
            }else{
                this.#view.andamento = false;
                this.#view.fim = this.#serviceAnime.getDataInternacional(anime.fim);
            }
            this.#view.sinopse = anime.sinopse;
            this.#view.openModal();
        }catch(erro){
            this.#view.exibirErro(erro.message);
        }
    }
}