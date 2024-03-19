<h1 align="center" id="title">{{PROJECT_NAME}}</h1>

<p id="description">{{PROJECT_NAME}} desenvolvido por VERT Capital.</p>

<h2>⚠️ ATENÇÃO</h2>

O <a href="https://www.npmjs.com/package/@vert-capital/design-system-ui">Design System VERT</a> está em construção, portanto ainda não existe uma documentação.

Utilize a documentação do <a href="https://ui.shadcn.com/">shadcn/ui</a> para se basear em componentes comuns, e também no código fonte de outros projetos da VERT.

<h2>⚙️ Configuração</h2>

Instale as dependências com o gerenciador de pacotes de sua preferência. Recomendamos o uso do <a href="https://pnpm.io/">pnpm</a>.

<pre>
<code>pnpm i</code>
</pre>

Configure o arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Para esse template o arquivo vem preenchido com as variáveis de ambiente necessárias para rodar a demonstração.

Depois basta rodar o projeto em modo de desenvolvimento:

<pre>
<code>pnpm dev</code>
</pre>

<h2>🔑 Autenticação</h2>

Neste template estamos apontando para uma url publicada da API que utiliza SSO. Por isso, para que rode localmente, foi utilizado variáveis de ambiente local para TOKEN_ONLY_DEV e REFRESH_TOKEN_ONLY_DEV. ATENÇÃO: Use essas variáveis apenas no seu ambiente de local desenvolvimento, caso precise.

No seu projeto gerado, após configurar sua nova url de API, será necessário setar esses token no env local ou rodar sua API em localhost.

<h2>🔑 Dica versionamento</h2>

Como os projetos da VERT estão em sua maioria no bitbucket, fica uma dica para sincronizar pela primeira vez um novo projeto criado no bitbucket pela infra:

<pre>
<code>git init</code>
</pre>

<pre>
<code>git add .</code>
</pre>

<pre>
<code>git commit -m "First commit"</code>
</pre>

<pre>
<code>git remote add origin [URL_SSH]</code>
</pre>

<pre>
<code>git push -u origin master</code>
</pre>

OU

<pre>
<code>git push -u origin main</code>
</pre>

Pode ser necessário forçar o push caso o repositório ja tenha algum commit:

<pre>
<code>git push -u origin main --force</code>
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
