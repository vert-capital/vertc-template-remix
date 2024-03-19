<h1 align="center" id="title">{{PROJECT_NAME}}</h1>

<p id="description">{{PROJECT_NAME}} desenvolvido por VERT Capital.</p>

<h2>⚠️ ATENÇÃO</h2>

O <a href="https://www.npmjs.com/package/@vert-capital/design-system-ui">Design System VERT</a> está em construção, portanto ainda não existe uma documentação.

Utilize a documentação do <a href="https://ui.shadcn.com/">shadcn/ui</a> para se basear em componentes comuns, e também no código fonte de outros projetos da VERT.

<h2>⚙️ Configuração</h2>

Instale as dependências do com o gerenciador de pacotes de sua preferência. Recomendamos o uso do <a href="https://pnpm.io/">pnpm</a>.

<pre>
<code>pnpm i</code>
</pre>

Configure o arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Para esse template o arquivo vem preenchido com as variáveis de ambiente necessárias rodar a demonstração.

Depois basta rodar o projeto em modo de desenvolvimento:

<pre>
<code>pnpm dev</code>
</pre>

<h2>🔑 Autenticação</h2>

Neste template estamos apontando para uma url publicada da API que utiliza SSO. Por isso, para que rode localmente, é necessário acessar o <a href="https://ausencias.vert-capital.app/">Sistema de Ausências</a> atual, copiar o TOKEN e REFRESH TOKEN do local storage.

Após isso, monte a url da seguinte forma:

<pre>
<code>http://localhost:3000/auth/[TOKEN]/[REFRESH_TOKEN]</code>
</pre>

<h2>🧐 Funcionalidades</h2>

Aqui estão alguns dos melhores recursos do projeto:

-

<h2>💻 Construído com</h2>

Tecnologias utilizadas no projeto:

- <a href="https://react.dev/">React</a>
- <a href="https://remix.run/">Remix</a>
- <a href="https://vitejs.dev/">Vite</a>
- <a href="https://tailwindcss.com/docs/installation">TailwindCSS</a>
- <a href="https://www.npmjs.com/package/@vert-capital/common">Utilitários VERT</a>
- <a href="https://www.npmjs.com/package/@vert-capital/design-system-ui">Design System VERT</a>
