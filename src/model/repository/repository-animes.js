import { API_ANIMES } from "../api/api.js";
import { Anime } from "../anime.js";
export class RepositoryAnimes{

    async getAnimes(){
        const response = await fetch(API_ANIMES);
        if(!response.ok) throw new Error('Erro ao obter animes');
        return await response.json();
    }

    async postAnime( anime ){
        new Anime(anime);
        const obj = {
            "method": 'POST',
            "headers": { "Content-Type": "application/json"},
            "body": JSON.stringify(anime)
        }
        const response = await fetch(API_ANIMES, obj);
        if(!response.ok){
            throw new Error('Erro ao cadastrar anime.');
        }
    }

    async removeAnime( id ){
        const obj = {
            "method": "DELETE"
        }
        const response = await fetch(API_ANIMES + id, obj);
        if(response.status == 404) throw new Error('Anime não encontrado.');
        if(!response.ok) throw new Error('Erro ao deletar anime.');
    }

    async editAnime( id, anime ){
        new Anime(anime);
        const obj = {
            "method": 'PUT',
            "headers": { "Content-Type": 'application/json'},
            "body": JSON.stringify(anime)
        }
        const response = await fetch(API_ANIMES + id, obj);
        if(response.status == 404) throw new Error('Anime não encontrado.');
        if(!response.ok) throw new Error('Erro ao atualizar anime.');
    }

    async getAnimeById( id ){
        const response = await fetch(API_ANIMES + id);
        if(response.status === 404) throw new Error('Anime não encontrado.');
        if(!response.ok)throw new Error('Erro ao buscar anime por ID.');
        return await response.json();
    }
}