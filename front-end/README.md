## Template Start

Ambiente pré-configurado para inicialização de projeto.

<ul>
  <li>
    <a target="_blank" href="https://pt-br.react.dev">React</a>
  </li>
  <li>
    <a target="_blank" href="https://nextjs.org/docs">Next</a>
  </li>
  <li>
    <a target="_blank" href="https://www.typescriptlang.org/pt/docs/handbook/typescript-from-scratch.html">Typescript</a>
  </li>
  <li>
    <a target="_blank" href="https://sass-lang.com/documentation/">Sass</a>

  </li>
</ul>

<h2>Arquitetura</h2>
<p>Siga a arquitetura já definida para construção do projeto. Abaixo temos as descrições.</p>

<b>Componentes</b>

```bash
# Estruturas que geralmente se repetem/são iguais em um projeto ou que precisam necessáriamente de uma lógica isolada.
# Exemplo: components/Header/Header.tsx
/src/componentes/pasta-com-nome-componente/nome-do-componente.tsx
```
<b>Hooks Personalizados</b>

```bash
# Hooks são funções que podem ser reutilizáveis em várias partes de um projeto.
# Exemplo: hooks/utils/formatDate.ts
/src/hooks/use-nome-hook.ts
```

<b>Modules</b>

```bash
# Modules possuem toda estrutura das páginas separada por sessões.
# Nome do componente geralmente carrega o nome da pasta.
# Exemplo: modules/home/SectionOne/SectionOne.tsx
/src/modules/nome-da-pagina/nome-sessão/nome-da-sessão.tsx
```

<b>Páginas</b>

```bash
# Comporta os modules com estruturas. Independente da página sempre terá o nome do arquivo como page.tsx
# Exemplo: app/home/page.tsx
/src/app/pasta-com-nome-da-pagina/page.tsx
```

<b>Assets</b>

```bash
# Para manipulação de assets como imagens e fontes.
# Exemplo: public/assets/img/temp/img-default.svg
/public/assets/nome-do-tipo-asset/definicao-asset/arquivos-asset
```

<b>Dados</b>

```bash
# Aqui se obtem rotas e requisições para manipulação e integração dos dados.
/src/data/
```
<h2>Inicialização:</h2>

```bash
# install packages
yarn install
#run
yarn dev
# build
yarn build
```

Visualização local: [http://localhost:3000](http://localhost:3000).

<br/>
<br/>

<p>Observação: quando realizar a inicialização editar o arquivo .gitignore</p>

```bash
# add line 28 file .gitignore
.env*.local
```


