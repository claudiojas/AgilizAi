# AgilizAI 🍽️

Bem-vindo ao AgilizAI, um moderno sistema de e-commerce para restaurantes e serviços de alimentação. Este projeto foi desenvolvido para oferecer uma experiência de usuário fluida e responsiva, permitindo que os clientes naveguem pelo cardápio, montem seus pedidos e gerenciem suas contas de forma intuitiva.

## ✨ Features Globais do AgilizAI

O AgilizAI é projetado como uma plataforma modular com as seguintes características e funcionalidades em seus diversos componentes:

*   **AgilizAI Cliente (`userClientFront`):**
    *   **Interface Responsiva:** Layouts otimizados para desktop e dispositivos móveis.
    *   **Navegação por Categorias:** Sistema de abas e um inovador menu circular (`SpinningPlateMenu`) para explorar as categorias de pratos.
    *   **Cardápio Dinâmico:** Visualização de produtos em formato de grade com cartões detalhados.
    *   **Carrinho de Compras Persistente:** O carrinho de compras salva o estado no navegador, mantendo os itens mesmo que a página seja recarregada.
    *   **Animações Modernas:** Uso de `framer-motion` para transições e animações suaves que melhoram a experiência do usuário.
    *   **Páginas Dedicadas:** Seções para busca de produtos, histórico de pedidos e gerenciamento de perfil.

*   **AgilizAI Lojista (`shopkeeperServer`):**
    *   **Gestão de Restaurantes:** API para gerenciamento de cardápios, pedidos, informações do restaurante e dados de lojistas. (Em desenvolvimento inicial)

*   **AgilizAI Pagamento (`paymentSever`):**
    *   **Processamento de Pagamentos:** API dedicada ao processamento seguro de transações financeiras. (Planejado)

*   **AgilizAI Admin (`userAdminFront`):**
    *   **Painel Administrativo:** Interface para gerenciamento geral da plataforma, usuários e lojistas. (Planejado)

*   **AgilizAI Institucional (`agilizai-institucional`):**
    *   **Website Corporativo:** Landing page para informações do produto, captura de leads e onboarding de clientes através de uma página de cadastro. (Em desenvolvimento avançado)

## 🚀 Tecnologias Utilizadas

O projeto AgilizAI é construído com um conjunto de tecnologias modernas, distribuídas entre seus vários componentes para garantir performance e escalabilidade.

### AgilizAI Cliente (`userClientFront`)
*   **Framework Frontend:** [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
*   **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand)
*   **Roteamento:** [React Router](https://reactrouter.com/)
*   **Animações:** [Framer Motion](https://www.framer.com/motion/)

### AgilizAI Lojista (`shopkeeperServer`)
*   **Framework Backend:** [Fastify](https://www.fastify.io/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)

### AgilizAI Pagamento (`paymentSever`)
*   **Framework Backend:** [Fastify](https://www.fastify.io/) (previsto)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (previsto)

### AgilizAI Admin (`userAdminFront`) e AgilizAI Institucional (`agilizai-institucional`)
*   **Framework Frontend:** [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/) (em desenvolvimento)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) (no `agilizai-institucional`)

## 🏁 Como Começar

O projeto AgilizAI é um monorepo. Para configurar e executar os diferentes serviços e aplicações, siga as instruções abaixo para cada componente desejado. É necessário ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o [npm](https://www.npmjs.com/) ou [Bun](https://bun.sh/) instalados.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd AgilizAI
    ```

2.  **Configuração e Execução dos Componentes:**

    Cada componente (frontend ou backend) reside em seu próprio diretório e possui suas próprias dependências e scripts de execução. Navegue até o diretório do componente desejado para gerenciá-lo.

    ### Para Aplicações Frontend (ex: `userClientFront`, `userAdminFront`, `institutional`)

    1.  **Navegue até o diretório:**
        ```bash
        cd <nome-do-diretorio-frontend> # Ex: cd userClientFront
        ```
    2.  **Instale as dependências:**
        ```bash
        npm install
        # ou
        bun install
        ```
    3.  **Inicie o servidor de desenvolvimento:**
        ```bash
        npm run dev
        # ou
        bun dev
        ```
        A aplicação estará disponível geralmente em `http://localhost:5173` ou outra porta configurada.

    ### Para Serviços Backend (ex: `shopkeeperServer`, `paymentSever`)

    1.  **Navegue até o diretório:**
        ```bash
        cd <nome-do-diretorio-backend> # Ex: cd shopkeeperServer
        ```
    2.  **Instale as dependências:**
        ```bash
        npm install
        # ou
        bun install
        ```
    3.  **Compile o código TypeScript (se aplicável):**
        ```bash
        npm run build
        # ou
        bun run build
        ```
    4.  **Inicie o serviço:**
        ```bash
        npm start
        # ou
        bun start
        ```
        O serviço estará ouvindo em uma porta específica (geralmente `3000` ou conforme configurado no `.env` do serviço).

**Observação:** Certifique-se de que as variáveis de ambiente necessárias (como as contidas em arquivos `.env` específicos de cada serviço) estejam configuradas corretamente antes de iniciar os backends.

## 📂 Estrutura Geral do Projeto

O repositório AgilizAI é um monorepo composto por várias aplicações e serviços. Abaixo está a estrutura de alto nível:

```
.
├── agilizai-institucional/ # Aplicação frontend para o site institucional e onboarding de clientes (React/Vite). Em desenvolvimento avançado.
├── paymentSever/       # Serviço de backend para processamento de pagamentos (Node.js/TypeScript). Status: Em análise.
├── shopkeeperServer/   # Serviço de backend para gestão de lojistas/restaurantes (Node.js/TypeScript). Em estágio inicial (Fastify/Prisma).
├── userAdminFront/     # Aplicação frontend para painel administrativo (React/Vite). Atualmente boilerplate.
├── userClientFront/    # Aplicação frontend para o cliente final (React/Vite). Altamente desenvolvida, mas usando dados mockados.
└── README.md           # Este arquivo.
```

Detalhes sobre a estrutura interna de cada subprojeto podem ser encontrados em seus respectivos `README.md` ou `README_INSTITUCIONAL.md`.

