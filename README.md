## Aplicação de Análise de Texto - Desafio IA

### Sobre a aplicação

Esta aplicação realiza análise de sentimento em textos utilizando a API da HuggingFace, além de identificar as palavras mais frequentes e permitir busca de termos analisados recentemente.

---

**Observação:**
A análise de sentimento depende da variável de ambiente `HUGGINGFACE_API_KEY` configurada no arquivo `.env`.

> **Importante:** Para utilizar a API da HuggingFace, é necessário criar uma conta gratuita em [https://huggingface.co](https://huggingface.co). 
>
> Após criar sua conta, acesse [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) e gere um novo token com permissão de leitura. Utilize esse token para preencher a variável `HUGGINGFACE_API_KEY` no arquivo `.env`.

## Instruções para rodar a aplicação com Docker

1. Na pasta api do projeto, crie uma cópia do arquivo **.env.example** com o nome **.env** e adicione sua chave da HuggingFace.
2. Execute o comando abaixo na raiz do projeto para subir o container:

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

### 📄 Documentação da API (Swagger)

A documentação interativa da API está disponível via Swagger.

#### Como acessar

Após subir a aplicação (localmente ou via Docker), acesse:

```
http://localhost:3001/docs
```

Lá você pode visualizar todos os endpoints, parâmetros, exemplos de requisição e resposta, além de testar as rotas diretamente pelo navegador.

#### Como funciona

- A documentação é gerada automaticamente a partir dos comentários no código das rotas usando o [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) e exibida com o [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).
- Sempre que você atualizar ou criar novas rotas, basta documentá-las com os comentários no padrão Swagger/OpenAPI.

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

### Tecnologias e bibliotecas utilizadas

- **Express**
- **Typescript**
- **HuggingFace API**
- **dotenv**
- **stopword**
- **Docker**
- **Swagger**

## This is a challenge by Coodesh