# AgilizAI 🍽️

**A Revolução Digital para o seu Restaurante, Bar ou Lanchonete.**

O AgilizAI é uma plataforma SaaS (Software as a Service) multitenant de alta performance, projetada para profissionalizar a presença digital de estabelecimentos de alimentação. Mais do que um cardápio, entregamos uma ferramenta de **crescimento e gestão de audiência**.

## 🚀 O Diferencial AgilizAI

Diferente de sistemas que focam apenas em tirar pedidos, o AgilizAI foca no **sucesso do lojista**:
-   **App do Cliente (PWA)**: Experiência mobile-first, leve e moderna (Progressive Web App), sem necessidade de instalação via App Store.
-   **CRM Nativo**: Captura obrigatória de leads (Nome, WhatsApp, E-mail) para que o lojista construa sua própria lista de marketing.
-   **White-label**: Identidade visual personalizada para cada estabelecimento.
-   **Foco no "Garçom Inteligente"**: Futura integração com QR Code para pedidos locais e pagamentos ágeis.

## ✨ Features Globais

*   **AgilizAI Cliente (`userClientFront`):**
    *   **PWA Experience:** Layout mobile-first fluido e instalável.
    *   **SpinningPlateMenu:** Navegação inovadora por categorias.
    *   **Cadastro Lead-First:** Foco em CRM desde o primeiro contato.
    *   **Status Simplificado:** Acompanhamento de pedidos (Recebido/Entregue).

*   **AgilizAI Lojista/Backend (`shopkeeperServer`):**
    *   **Gestão Digital:** Controle de produtos, preços, estoque e CRM de clientes.
    *   **Arquitetura Multi-tenant:** Isolamento total de dados entre lojistas.
    *   **Clean Architecture:** Código modular e escalável seguindo princípios de arquitetura em camadas.

*   **AgilizAI Pagamento (`paymentSever`):**
    *   **Gateway Agnostic:** Microsserviço preparado para integrar com Stripe, Mercado Pago e PIX.

*   **AgilizAI Institucional (`agilizai-institucional`):**
    *   **Landing Page de Vendas:** Onboarding de novos lojistas e apresentação de planos.

## 🛠️ Tecnologias Utilizadas

A stack da Módulo Web garante o padrão "Zero Manutenção":
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion.
- **Backend**: Node.js + Fastify + Prisma ORM + TypeScript.
- **Banco de Dados**: PostgreSQL (Vercel Postgres).
- **Infra**: Vercel + Cloudflare R2.

## 📂 Estrutura do Monorepo

```
.
├── packages/
│   ├── agilizai-institucional/ # Landing page e onboarding de lojistas.
│   ├── shopkeeperServer/      # Cérebro do sistema (API central, CRM, Gestão).
│   ├── userClientFront/       # App PWA do cliente final.
│   ├── userAdminFront/        # Painel de controle do lojista.
│   └── paymentSever/          # Microsserviço de transações financeiras.
├── docs/                      # Documentação de persona e arquitetura.
└── requirementsAnalysis.md    # Documento mestre de metas e requisitos.
```

---
**Desenvolvido com visão de produto para a Módulo Web.** 🚀
