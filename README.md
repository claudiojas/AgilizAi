# AgilizAI 🍽️

Bem-vindo ao AgilizAI, um moderno sistema de e-commerce para restaurantes e serviços de alimentação. Este projeto foi desenvolvido para oferecer uma experiência de usuário fluida e responsiva, permitindo que os clientes naveguem pelo cardápio, montem seus pedidos e gerenciem suas contas de forma intuitiva.

## ✨ Features

*   **Interface Responsiva:** Layouts otimizados para desktop e dispositivos móveis.
*   **Navegação por Categorias:** Sistema de abas e um inovador menu circular (`SpinningPlateMenu`) para explorar as categorias de pratos.
*   **Cardápio Dinâmico:** Visualização de produtos em formato de grade com cartões detalhados.
*   **Carrinho de Compras Persistente:** O carrinho de compras salva o estado no navegador, mantendo os itens mesmo que a página seja recarregada.
*   **Animações Modernas:** Uso de `framer-motion` para transições e animações suaves que melhoram a experiência do usuário.
*   **Páginas Dedicadas:** Seções para busca de produtos, histórico de pedidos e gerenciamento de perfil.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas para garantir performance e escalabilidade:

*   **Framework Frontend:** [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
*   **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand)
*   **Roteamento:** [React Router](https://reactrouter.com/)
*   **Animações:** [Framer Motion](https://www.framer.com/motion/)

## 🏁 Como Começar

Para executar este projeto localmente, siga os passos abaixo. É necessário ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o [npm](https://www.npmjs.com/) ou [Bun](https://bun.sh/) instalados.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd AgilizAI
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

    A aplicação estará disponível em `http://localhost:8080`.

## 📂 Estrutura do Projeto

O código-fonte está organizado na pasta `src/` da seguinte forma:

```
src/
├── components/       # Componentes de UI reutilizáveis (shadcn/ui e layout)
│   ├── features/     # Componentes complexos que representam funcionalidades
│   ├── layout/       # Componentes de estrutura da página (ex: PageWrapper)
│   └── ui/           # Componentes base da UI (botões, inputs, etc.)
├── data/             # Dados mockados da aplicação (ex: produtos)
├── hooks/            # Hooks customizados para lógica reutilizável
├── lib/              # Funções utilitárias
├── pages/            # Componentes que representam as páginas da aplicação
└── store/            # Lojas de estado global (Zustand)
```

