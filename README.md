# 🎌 CRUD MVP - Gerenciador de Animes

> Um projeto front-end em **JavaScript Vanilla** estruturado sob o padrão arquitetural **Model-View-Presenter (MVP)**, desenvolvido com foco em boas práticas de separação de responsabilidades, manipulação assíncrona (`fetch`) e persistência simulada.

---

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** JavaScript (ES6+) / HTML5 / CSS3
- **Arquitetura:** Model-View-Presenter (MVP)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)
- **API Mockada:** `json-server` (para simular uma API RESTful)

---

## 📂 Arquitetura do Projeto

O projeto segue rigorosamente a separação de camadas do padrão **MVP**, garantindo alta modularidade, facilidade de manutenção e testes:

```text
crud-mvp-storage/
├── node_modules/
├── src/
│   ├── model/
│   │   ├── api/             # Comunicação com o servidor / fetch
│   │   ├── anime.js         # Entidade / Validação de dados
│   │   ├── repository-animes.js
│   │   ├── repository-capas.js
│   │   ├── storage.js
│   │   └── validacao-error.js
│   ├── presenter/
│   │   └── presenter-animes.js # Orquestrador entre View e Model
│   ├── view/
│   │   └── view-animes.js   # Manipulação do DOM e interface
│   └── style/
│       └── index.css
├── api.json                 # Banco de dados simulado para o json-server
├── package.json
└── pnpm-lock.yaml

---

>>> Como Executar o Projeto <<<
📍 Pré-requisitos
Certifique-se de ter o Node.js e o pnpm instalados na sua máquina. Caso não tenha o pnpm, você pode instalá-lo via npm globalmente:

- Na pasta do projeto rode os seguintes comandos pnpm:
    * 1. pnpm install
    * 2. pnpm exec json-server api.json
- Por fim, utilize o live server para abrir o index.html.

---

>>> Status do Projeto <<<
⚠️ Em Desenvolvimento: As funcionalidades de CRUD de animes estão operacionais. A funcionalidade de exibição e gerenciamento de capas está em processo de implementação.


