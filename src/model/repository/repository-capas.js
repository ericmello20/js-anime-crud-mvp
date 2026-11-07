import {API_CAPAS} from '../api/api.js';

export class RepositoryCapas{
    async getPosterByName(nome){
        const nomeFormatado = encodeURIComponent(nome); // encodeURIComponent() me ajuda para que espaços e acentos não atrapalhem a busca
        const response = await fetch(`${API_CAPAS}?filter[text]=${nomeFormatado}&page[limit]=1`);
        if(response.status === 404) throw new Error('Capa não encontrada');
        if(!response.ok) throw new Error('Erro ao buscar capa.');
        const dados = await response.json();
        const posterUrl = dados.data[0].attributes?.posterImage?.original;
        if(!posterUrl) throw new Error('Capa indisponível.');
        return posterUrl;
    }
}