## Aplicação de Análise de Texto - Desafio IA

### Sobre a aplicação

Esta aplicação realiza análise de sentimento em textos utilizando a API da HuggingFace, além de identificar as palavras mais frequentes e permitir busca de termos analisados recentemente.

## Instruções para rodar a aplicação com Docker

1. Na pasta api do projeto, crie uma cópia do arquivo **.env.example** com o nome **.env** e adicione sua chave da HuggingFace.

2. Execute o comando abaixo para subir o container:
   ```
   docker-compose up --build
   ```

### Usando Node.js (sem Docker) - Aplicar comandos no terminal na pasta api

1. Na pasta api do projeto, crie uma cópia do arquivo **.env.example** com o nome **.env** e adicione sua chave da HuggingFace.

2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie a aplicação:
   ```
   npm run dev
   ```

   Isso irá executar o **nodemon** e subir a aplicação em modo de desenvolvimento.

### Tecnologias e bibliotecas utilizadas

- **Express**
- **Typescript**
- **HuggingFace API**
- **dotenv**
- **stopword**
- **Docker**

### Endereço da aplicação

- API disponível em: [http://localhost:3001](http://localhost:3001)

### Rotas da aplicação

#### POST  `http://localhost:3001/api/analyze-text`

- Realiza a análise de sentimento e retorna as principais palavras do texto.

**Exemplo de requisição:**

```json
{
  "text": "Eu gosto muito de programar, é um ótimo exercício para a mente!"
}
```

**Exemplo de resposta:**

```json
{
  "totalWords": 10,
  "topWords": ["gosto", "muito", "programar", "ótimo", "exercício"],
  "sentiment": {
    "label": "POSITIVE",
    "score": 0.999
  }
}
```

#### GET `http://localhost:3001/api/search-term?term=palavra`

- Busca se o termo informado foi analisado no último texto processado.

**Exemplo de resposta:**

```json
{
  "isFoundTerm": true
}
```

---

**Observação:**
A análise de sentimento depende da variável de ambiente `HUGGINGFACE_API_KEY` configurada no arquivo `.env`.

> **Importante:** Para utilizar a API da HuggingFace, é necessário criar uma conta gratuita em [https://huggingface.co](https://huggingface.co). Após criar sua conta, acesse [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) e gere um novo token com permissão de leitura. Utilize esse token para preencher a variável `HUGGINGFACE_API_KEY` no arquivo `.env`.
