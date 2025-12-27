# Análise de Requisitos do Produto AgilizAI (Fase Beta)

## 1. Visão Geral e Estratégia de Negócio

**AgilizAI** é uma plataforma de Software as a Service (SaaS) projetada para fornecer catálogos online personalizáveis para diversos tipos de negócios, como restaurantes, lanchonetes e pet shops.

A estratégia de entrada no mercado seguirá o modelo **Lean Startup**. Lançaremos uma versão beta funcional para um grupo selecionado de clientes ("beta testers"). O objetivo é validar o produto, coletar feedback real e iterar sobre a plataforma. Durante esta fase, não haverá custos de infraestrutura para a empresa, e os clientes participantes terão acesso gratuito em troca de feedback. Após a validação do produto e a aquisição dos primeiros clientes pagantes, o sistema será migrado para uma infraestrutura de nuvem paga e escalável.

## 2. Arquitetura Geral do Sistema

Adotaremos uma arquitetura moderna baseada em **microsserviços** para garantir escalabilidade, segurança e manutenibilidade. A arquitetura se divide nas seguintes partes:

-   **Frontend por Cliente**: Cada lojista terá sua própria instância de frontend, permitindo total personalização de identidade visual (logo, cores, layout). Essas instâncias serão "burras", focadas apenas na apresentação dos dados.
-   **Backend Centralizado**: Uma única API centralizada servirá todos os frontends. Esta API conterá toda a lógica de negócio, gerenciamento de dados e integrações.
-   **Banco de Dados**: Um banco de dados relacional centralizado servirá como a única fonte da verdade para toda a plataforma.
-   **Armazenamento de Arquivos**: Um serviço de Object Storage será utilizado para armazenar arquivos estáticos, como imagens de produtos.

## 3. Infraestrutura e Stack de Tecnologia (Fase Beta)

Para a fase beta, utilizaremos uma stack unificada na plataforma da **Vercel** para otimizar a produtividade e manter os custos em zero, aproveitando a experiência prévia com a plataforma.

-   **Hospedagem Frontend**: Instâncias individuais de frontend serão implantadas na **Vercel**.
-   **Hospedagem Backend**: A API central será implementada como **Vercel Serverless Functions**.
-   **Banco de Dados**: Utilizaremos o **Vercel Postgres**, que é integrado com o Neon.
-   **Armazenamento de Imagens**: **Cloudflare R2** será usado para o armazenamento de imagens. É compatível com a API S3, possui um tier gratuito generoso e não tem custos de egress, o que é ideal para a nossa fase inicial.

### 3.1. Stack de Tecnologia do Backend

-   **Linguagem**: **TypeScript**, para garantir segurança de tipos e robustez.
-   **Runtime**: **Node.js**.
-   **Framework Web**: **Fastify**, escolhido por sua alta performance, baixa sobrecarga e ótima experiência para o desenvolvedor.
-   **ORM (Object-Relational Mapping)**: **Prisma**, por sua integração perfeita com TypeScript (type-safety) e produtividade.
-   **Banco de Dados**: **PostgreSQL**.

### 3.2. Padrão de Arquitetura do Código Backend

O código seguirá os princípios da **Arquitetura em Camadas (Layered Architecture)** para garantir a separação de responsabilidades e alta testabilidade.

-   **`Routers`**: Camada de entrada da API. Responsável por receber requisições HTTP e chamar os Casos de Uso.
-   **`UseCases`**: O coração da aplicação. Contém toda a lógica de negócio pura, sem acoplamento com o framework web ou o banco de dados.
-   **`Repositories`**: Camada de acesso a dados. Isola a lógica de interação com o banco de dados (Prisma).
-   **`Interfaces`**: Contratos que definem como as camadas se comunicam, garantindo o desacoplamento.

## 4. Serviços de Backend Detalhados

A API central será composta por vários microsserviços lógicos, incluindo:

### 4.1. Serviço de Catálogo (Multi-tenant)

-   **Responsabilidade**: Gerenciar todos os dados de produtos, categorias e preços.
-   **Multi-tenancy**: O banco de dados será modelado para garantir que cada lojista (`Cliente`) só possa acessar e gerenciar seus próprios dados. Todas as tabelas de negócio (ex: `Produtos`, `Categorias`) terão uma chave estrangeira `clienteId`.

### 4.2. Serviço de Pagamentos

-   **Responsabilidade**: Processar pagamentos de forma flexível e segura.
-   **Camada de Abstração**: Será criada uma interface de pagamento genérica que permitirá a adição de múltiplos "adaptadores" para diferentes métodos e gateways.
-   **Métodos Suportados**:
    1.  **Gateways de Pagamento Online (Stripe, Mercado Pago, etc.)**: A integração seguirá o fluxo de **Checkout com Redirecionamento (Hosted Payment Page)**. Nossa API iniciará a transação, receberá uma URL de pagamento do gateway e a retornará ao frontend. O cliente final insere os dados sensíveis diretamente no ambiente seguro do gateway, e nosso backend é notificado via webhooks.
    2.  **Pagamento Manual via WhatsApp/PIX**: Um adaptador específico gerará os dados do PIX e redirecionará o cliente final para o WhatsApp com uma mensagem pré-preenchida. A confirmação deste tipo de pagamento exigirá uma ação manual posterior do lojista.
-   **Segurança**: As credenciais de API dos gateways dos lojistas serão gerenciadas de forma centralizada e segura no backend, utilizando um cofre de segredos quando o sistema migrar para a nuvem paga.

## 5. Estrutura de Dados (Schema do Banco de Dados)

O banco de dados PostgreSQL conterá, no mínimo, as seguintes tabelas:

-   **`Cliente`**: Representa nossos clientes (os lojistas).
    -   Campos: `id`, `nome_loja`, `subdominio`, `configuracoes_visuais` (JSON), `configuracoes_pagamento` (JSON), etc.
-   **`LojistaUser`**: Representa as credenciais de acesso do lojista ao painel admin.
    -   Campos: `id`, `clienteId`, `email`, `whatsapp`, `senha_hash`.
-   **`UsuarioFinal`**: Representa os clientes dos nossos lojistas.
    -   Campos: `id`, `nome`, `email`, `telefone`, `senha_hash`.
-   **`Endereco`**: Endereços do `UsuarioFinal`.
    -   Campos: `id`, `usuarioFinalId`, `rua`, `numero`, `cidade`, etc.
-   **`Categoria`**: Categorias de produtos.
    -   Campos: `id`, `clienteId`, `nome`, `ordem`.
-   **`Produto`**: Produtos do catálogo.
    -   Campos: `id`, `clienteId`, `categoriaId`, `nome`, `descricao`, `preco`, `imagemUrl` (string).

## 6. Autenticação e Autorização

A segurança de acesso será implementada com as melhores práticas da indústria.

-   **Criptografia de Senhas**: As senhas (tanto do lojista quanto do usuário final) serão sempre hasheadas usando o algoritmo **bcrypt**. Senhas nunca serão armazenadas em texto plano.
-   **Gerenciamento de Sessão**: As sessões de API serão gerenciadas via **JWT (JSON Web Tokens)**. Após o login, o cliente recebe um token que deve ser enviado no cabeçalho de autorização de cada requisição subsequente.

## 7. Fluxos de Usuário Essenciais

### 7.1. Fluxo de Onboarding do Lojista

1.  **Descoberta**: O lojista acessa o site institucional do AgilizAI (ex: moduloweb.com.br).
2.  **CTA (Call to Action)**: Clica em "Experimentar Grátis".
3.  **Cadastro**: Preenche um formulário simples com **Email**, **WhatsApp** e **Senha**. O formulário informará sobre os termos do teste gratuito (tempo vs. feedback). Não serão solicitados dados de pagamento.
4.  **Verificação**: Um email de confirmação é disparado para o endereço fornecido.
5.  **Ativação**: Ao clicar no link de confirmação, a conta é ativada, e o lojista é redirecionado para a tela de login do Painel de Administração.

### 7.2. Fluxo do Painel de Administração do Lojista

1.  **Login**: O lojista acessa o painel com seu email e senha.
2.  **Boas-Vindas**: Uma tela de onboarding inicial o orienta a configurar sua loja na seção "Minha Empresa".
3.  **Configuração da Loja**: Nesta seção, o lojista poderá configurar:
    -   **Identidade Visual**: Cores, nome da empresa, logo.
    -   **Catálogo**: Adicionar/editar produtos, categorias, preços e imagens.
    -   **Pagamentos**: Configurar os métodos de pagamento que deseja oferecer.
4.  **Gerenciamento Contínuo**: O lojista pode acessar o painel a qualquer momento para atualizar as informações da sua loja e editar seus próprios dados de perfil.