import { ValidacaoError } from './error/validacao-error.js'

export class Anime{
    #nome = '';
    #temporadas = '';
    #episodios = '';
    #lancamento = '';
    #fim = '';
    #sinopse = '';
    
    constructor({nome, temporadas, episodios, lancamento, fim, sinopse}){
        this.#nome = nome;
        this.#temporadas = temporadas;
        this.#episodios = episodios;
        this.#lancamento = lancamento;
        this.#fim = fim;
        this.#sinopse = sinopse;
        this.#validacao();
    }

    get nome(){
        return this.#nome;
    }

    get temporadas(){
        return this.#temporadas;
    }

    get episodios(){
        return this.#episodios;
    }

    get lancamento(){
        return this.#lancamento;
    }

    get fim(){
        return this.#fim;
    }

    get sinopse(){
        return this.#sinopse;
    }

    #validacao(){
    // 1. Validação do Nome (obrigatório, min 1, max 30)
        if (!this.#nome || typeof this.#nome !== 'string' || this.#nome.trim().length === 0) {
            throw new ValidacaoError('O nome do anime é obrigatório.');
        }
        if (this.#nome.length > 30) {
            throw new ValidacaoError('O nome do anime não pode ter mais de 30 caracteres.');
        }

        // 2. Validação de Temporadas (número entre 0 e 50)
        const qtdTemporadas = Number(this.#temporadas);
        if (this.#temporadas === '' || isNaN(qtdTemporadas) || qtdTemporadas < 0 || qtdTemporadas > 50) {
            throw new ValidacaoError('A quantidade de temporadas deve ser um número entre 0 e 50.');
        }

        // 3. Validação de Episódios (número entre 0 e 5000)
        const epNum = Number(this.#episodios);
        if (this.#episodios === '' || isNaN(epNum) || epNum < 0 || epNum > 5000) {
            throw new ValidacaoError('A quantidade de episódios deve ser um número entre 0 e 5000.');
        }

        // 4. Validação de Lançamento (obrigatório e formato de data válido)
        if (!this.#lancamento) {
            throw new ValidacaoError('A data de lançamento é obrigatória.');
        }
        const dataLancamento = new Date(this.#lancamento);
        if (isNaN(dataLancamento.getTime())) {
            throw new ValidacaoError('A data de lançamento é inválida.');
        }

        // 5. Validação de Fim (pode ser uma data válida ou a string 'em andamento')
        if (this.#fim && this.#fim.trim() !== '') {
            const fimTrimmed = this.#fim.trim().toLowerCase();
            
            // Se não for a string 'em andamento', tratamos como data e validamos
            if (fimTrimmed !== 'em andamento') {
                const dataFim = new Date(this.#fim);
                if (isNaN(dataFim.getTime())) {
                    throw new ValidacaoError('A data de término é inválida.');
                }
                if (dataLancamento > dataFim) {
                    throw new ValidacaoError('A data de lançamento não pode ser posterior à data de fim.');
                }
            }
        }

        // 6. Validação da Sinopse (obrigatória)
        if (!this.#sinopse || typeof this.#sinopse !== 'string' || this.#sinopse.trim().length === 0) {
            throw new ValidacaoError('A sinopse do anime é obrigatória.');
        }
    }
}