# Análise de Requisitos do Produto AgilizAI (Fase Beta)

## 1. Visão Geral e Estratégia de Negócio

**AgilizAI** é uma plataforma de Software as a Service (SaaS) multitenant focada no nicho de **Bares, Lanchonetes e Restaurantes**. O sistema gerencia o catálogo de produtos (lanches, comidas e bebidas) para vendas via delivery ou consumo local (takeaway/balcão).

### 1.1. Diferencial Estratégico (Oceano Azul)
Diferente de marketplaces tradicionais, o AgilizAI foca na **construção de audiência própria para o lojista**. 
- **CRM Nativo**: O sistema exige o cadastro do cliente final (Nome, Email, WhatsApp) antes do pedido, transformando cada venda em um lead qualificado.
- **Serviço Premium de Marketing (Upsell)**: Estratégia futura de cobrar por automações de marketing (disparos de promoções via WhatsApp/Email) baseadas nos dados coletados.

A estratégia segue o modelo **Lean Startup**, validando o produto com beta testers antes da escala global.

## 2. Arquitetura Geral do Sistema

Adotaremos uma arquitetura de **microsserviços** dentro de um monorepo para garantir separação de responsabilidades:

-   **App do Cliente (PWA)**: Aplicação web mobile-first (Progressive Web App). O foco é a experiência de compra fluida e sem fricção.
-   **Painel Administrativo (Admin)**: Onde o lojista gerencia seu estoque, cardápio, valores, pedidos e sua base de clientes (CRM).
-   **Backend Centralizado (API)**: Microsserviço central (`shopkeeperServer`) que gerencia a lógica multi-tenant e persistência.

## 3. Infraestrutura e Stack de Tecnologia (Fase Beta)

-   **Hospedagem**: Vercel (Frontends e Backend Serverless).
-   **Banco de Dados**: Vercel Postgres (PostgreSQL).
-   **Armazenamento**: Cloudflare R2 (Imagens de produtos).
-   **Backend Stack**: Node.js, Fastify, Prisma ORM, TypeScript.

## 4. Funcionalidades do MVP (Escopo Reduzido)

### 4.1. Espaço do Usuário Final (Cliente)
- **Cadastro Obrigatório**: Coleta de Nome, E-mail e WhatsApp.
- **Cardápio Interativo**: Visualização de produtos por categoria com valores.
- **Fluxo de Pedido**: Seleção de itens, definição de tipo (Delivery ou Retirada Local) e pagamento via app/manual.
- **Status em Tempo Real**: Monitoramento simplificado:
    1. `Pedido Recebido`
    2. `Entregue`

### 4.2. Espaço do Lojista (Administrador)
- **Gestão de Cardápio**: Adicionar/Editar lanches, comidas, bebidas e preços.
- **Gestão de Estoque**: Controle básico de disponibilidade.
- **Gestão de Pedidos**: Painel para visualização e alteração de status.
- **Gestão de Clientes (CRM)**: Visualização de dados (Nome, Whats, Email) e histórico de pedidos para futuras ações de marketing.

## 5. Estrutura de Dados (Schema Simplificado)

O banco de dados PostgreSQL conterá:

-   **`Tenant` (Lojista)**: ID, Nome, Subdomínio, Configurações.
-   **`UsuarioFinal` (Lead)**: ID, Nome, Email, WhatsApp (Obrigatórios para o CRM).
-   **`Produto`**: ID, TenantId, CategoriaId, Nome, Preço, Descrição, Imagem.
-   **`Pedido`**: ID, TenantId, UsuarioFinalId, Itens (JSON), Total, Tipo (Delivery/Local), Status.

## 6. Evolução Futura (Pós-MVP)
- Implementação de QR Code em mesas para "Garçom Inteligente".
- Integração de disparos automáticos de WhatsApp/Email marketing.
- Dashboard de analytics para o lojista.