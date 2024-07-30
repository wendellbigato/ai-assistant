# AI-Assistant RAG

### **[Link para Teste](https://main.d3dt651fw39e4g.amplifyapp.com/)**

Este projeto, denominado AI-Assistant RAG, é um aplicativo desenvolvido com Next.js e Material-UI, integrado a APIs para gerenciamento de usuários e troca de mensagens. A motivação por trás deste projeto é fornecer uma solução acessível e eficiente para empresas e desenvolvedores que desejam implementar agentes inteligentes capazes de fornecer respostas precisas e relevantes, combinando recuperação de informações e geração de texto. Com o AI-Assistant RAG, os usuários podem facilmente fazer upload de documentos, sincronizar bases de conhecimento e interagir com o agente treinado, tudo em uma plataforma intuitiva e fácil de usar.

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

- Node.js
- NPM ou Yarn
- Conta na AWS para uso do API Gateway e outras funções serverless

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto e adicione suas variáveis de ambiente:

```
NEXT_PUBLIC_APIURL=http://sua-api.com
NEXT_PUBLIC_CHAVEAPI=sua-chave-api
```

Certifique-se de configurar corretamente os endpoints da API e as chaves de acesso.

## Estrutura do Projeto

```plaintext
.
├── app
│   ├── apipage
│   │   ├── page copy.js
│   │   └── page.js
│   ├── cadastro
│   │   └── page.js
│   ├── configuracoes
│   │   └── page.js
│   ├── embreve
│   │   └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── home
│   │   ├── page copy.js
│   │   └── page.js
│   ├── knowledge
│   │   └── page.js
│   ├── layout.js
│   ├── login
│   │   └── page.js
│   ├── meuplano
│   │   └── page.js
│   ├── page.js
│   ├── page.module.css
│   ├── perfil
│   │   └── page.js
│   ├── playground
│   │   └── page.js
│   ├── recuperarsenha
│   │   └── page.js
│   └── teste
│       └── page.js
├── assets
│   └── images
├── components
│   ├── DropzoneArea
│   │   └── DropzoneArea.js
│   ├── DropzoneDocs
│   │   └── DropzoneDocs.js
│   ├── Footer
│   │   ├── Footer.css
│   │   └── Footer.js
│   ├── Header
│   │   ├── Header.css
│   │   └── Header.js
│   ├── icons
│   │   └── MdiCannabis.js
│   ├── InputMaskCustom
│   │   └── InputMaskCustom.js
│   ├── listItems
│   │   └── listItems.js
│   ├── Manutencao
│   │   └── Manutencao.js
│   ├── MenuMobile
│   │   └── MenuMobile.js
│   ├── Navbar
│   │   ├── Navbar.css
│   │   └── Navbar.js
│   ├── ProfileForm
│   │   └── ProfileForm.js
│   ├── Spinner
│   │   └── Spinner.js
│   ├── Title
│   │   └── Title.js
│   ├── TokenVerification
│   │   └── TokenVerification.js
│   └── UploadImagem
│       └── UploadImagem.js
├── estrutura_projeto.txt
└── styles
    ├── globals.css
    └── theme.css

32 directories, 40 files
```

## Uso

Para iniciar o aplicativo em modo de desenvolvimento:
```bash
npm run dev
```
ou
```bash
yarn dev
```

Acesse o aplicativo em [http://localhost:3000](http://localhost:3000).


