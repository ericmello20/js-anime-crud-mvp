import { PresenterAnimes } from "../presenter/presenter-animes.js";

export class ViewAnimes{
    
    #presenter;

    constructor(){
        this.#presenter = new PresenterAnimes( this );
    }

    start(){
        this.#presenter.listarAnimes();

        document.getElementById('btn-salvar').addEventListener('click', (event) =>{
            event.preventDefault();
            this.#presenter.saveAnime();
        });

        document.getElementById('btn-novo').addEventListener('click', (event) =>{
            event.preventDefault();
            this.openModal();
        });

        document.getElementById('btn-fechar').addEventListener('click', (event) =>{
            event.preventDefault();
            this.#presenter.limparForm();
            this.closeModal();
        });
    }

    get id(){
        return document.getElementById('id').value;
    }

    get nome(){
        return document.getElementById('nome').value;
    }

    get temporadas(){
        return document.getElementById('temporadas').value;
    }

    get episodios(){
        return document.getElementById('episodios').value;
    }

    get lancamento(){
        return document.getElementById('lancamento').value;
    }

    get fim(){
        return document.getElementById('fim').value;
    }

    get andamento(){
        return document.getElementById('andamento').checked;
    }

    get sinopse(){
        return document.getElementById('sinopse').value;
    }

    set id(id) {
        document.getElementById('id').value = id;
    }

    set nome(nome) {
        document.getElementById('nome').value = nome;
    }

    set temporadas(temporadas) {
        document.getElementById('temporadas').value = temporadas;
    }

    set episodios(episodios){
        document.getElementById('episodios').value = episodios;
    }

    set lancamento(lancamento) {
        document.getElementById('lancamento').value = lancamento;
    }

    set fim(fim) {
        document.getElementById('fim').value = fim;
    }

    set andamento(andamento) {
        document.getElementById('andamento').checked = andamento;
    }

    set sinopse(sinopse) {
        document.getElementById('sinopse').value = sinopse;
    }

    desenharTabela( animes ){
        const tbody = document.querySelector('tbody');
        const frag = document.createDocumentFragment();
        tbody.replaceChildren();
        frag.append(...animes.map(a => this.#criarLinhas(a)));
        tbody.append(frag);
    }

    #criarLinhas({id, nome, temporadas, episodios, lancamento, fim, sinopse}){
        return this.#criarCelula('tr',
            this.#criarCelula('td', id),
            this.#criarCelula('td', nome),
            this.#criarCelula('td', temporadas),
            this.#criarCelula('td', episodios),
            this.#criarCelula('td', lancamento),
            this.#criarCelula('td', fim),
            this.#criarCelula('td', sinopse),
            this.#criarCelula('td', this.#criarBotaoEditar()),
            this.#criarCelula('td', this.#criarBotaoRemover())
        );
    }

    #criarBotaoRemover(){
        const btn = document.createElement('button');
        btn.textContent = '🗑️';
        btn.classList.add('remover');
        btn.addEventListener('click', event => {
            event.preventDefault();
            const id = this.#buscarId(event);
            this.#presenter.removeAnime(id);
        })
        return btn;
    }

    #criarBotaoEditar(){
        const btn = document.createElement('button');
        btn.textContent = '✏️';
        btn.classList.add('editar');
        btn.addEventListener('click', event => {
            event.preventDefault();
            const id = this.#buscarId(event);
            this.#presenter.preencheForm(id);
        })
        return btn;
    }

    openModal(){
        document.querySelector('dialog').showModal();
    }

    closeModal(){
        document.querySelector('dialog').close();
    }

    #buscarId(event){
        const tr = event.target.parentElement.parentElement;
        const id = tr.firstChild.innerText;
        return id;
    }

    #criarCelula(elemento, ...conteudo){
        const el = document.createElement(elemento);
        el.append(...conteudo);
        return el;        
    }

    exibirErro(msg){
        document.querySelector('output').innerText = msg; 
    }

    removerDaTabela( tr ){
        tr.remove();
    }
}