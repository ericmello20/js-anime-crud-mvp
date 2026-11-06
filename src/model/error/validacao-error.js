export class ValidacaoError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'ValidacaoError';
    }
}

