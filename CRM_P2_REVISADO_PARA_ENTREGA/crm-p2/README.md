# CRM de Clientes — P2 Frontend (7,0 pontos)

Aplicação em **Vite + React + TypeScript**, consumindo o **servidor-crm original disponibilizado pela professora**. O servidor grava os dados em JSON. Não é necessário alterar o servidor oficial.

## Requisitos
- Node.js 20+ e npm
- Duas janelas de terminal abertas (uma para backend, uma para frontend)

## Executar

**Terminal 1 (API oficial)** — na pasta `servidor-crm` que veio da professora:

```powershell
cd servidor-crm
npm install
npm start
```

API em `http://localhost:3333`. Deixe este terminal aberto.

**Terminal 2 (frontend)** — na pasta `crm-p2`:

```powershell
cd crm-p2
npm install
npm run dev
```

O arquivo `.env` deve ter `VITE_API_URL=http://localhost:3333`. Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`). Se alterar o `.env`, reinicie o Vite.

**Conta de teste:** `emilys` / `emilyspass`.

## O que foi implementado

- Login (token, `Authorization: Bearer`, usuário de `/auth/me`, expiração de sessão, proteção das páginas, logout, volta para a rota solicitada).
- Painel (clientes, faturamento e ticket médio sem cancelados; quantidade e valor por status; três maiores clientes; botão Novo cliente).
- Clientes (busca nome/e-mail, paginação de cinco em cinco por `limit/skip`, detalhe, cadastro e edição com validação de nome, e-mail e dois campos opcionais, exclusão com confirmação e contagem, selo VIP/Regular/Sem compras).
- Pedidos por cliente (itens e total calculado no frontend, criação, edição apenas de abertos, transições de status válidas e exclusão com confirmação).
- Atendimento (listagem do mais recente, título, texto, data e canal, filtros e contador, criar, editar e excluir).
- Todos os pedidos (nome do cliente, filtro por status/faixa de valor, ordenação data/total, link para o cliente).
- Página não encontrada e cliente não encontrado, mensagens amigáveis de erros HTTP, carregando/vazio/erro.
- Layout responsivo para celular e funções puras em `src/utils/calculos.ts`.

## Regras importantes

- **Total do pedido:** soma de `preco × quantidade`. **Não** depende de campo `total` no servidor.
- **Total comprado / ticket médio / ranking:** ignoram pedidos `cancelado`; os contadores e valores **por status** exibem também os cancelados.
- **Selo:** VIP a partir de R$ 2.000,00 comprados; Sem compras sem pedido não cancelado; Regular no restante.
- **Status:** `aberto → pago/cancelado`; `pago → cancelado`; `cancelado` é final. Só edite itens enquanto aberto.
- **Atendimento:** API espera canal `telefone`, `email`, `whatsapp`, `presencial`.
- **401:** reiniciar o servidor invalida o token; o app exigirá novo login.

## Build e reset

Na pasta `crm-p2` execute `npm run build` (o resultado estará em `dist/`, não é preciso enviá-lo).
Na pasta `servidor-crm`, com a API parada, `npm run reset` restaura dados iniciais caso precise.

## Publicação no GitHub (obrigatória pela prova)

Crie um repositório **novo**, próprio para o CRM, e faça commits do **frontend**. Cole o link verdadeiro abaixo antes da entrega:

**Repositório:**(https://github.com/Craft0629/crm-p2-prova)

No AVA, anexe o ZIP **somente do frontend (`crm-p2`)** sem `node_modules` nem `dist`, e cole o link do GitHub no campo/comentário. O arquivo completo separado deste pacote serve para testar localmente com o servidor oficial da professora.

## Observação de validação

Faça testes no seu PC em `npm run dev`, `npm run build` e com a API oficial iniciada. Não trate recursos como testados apenas por estarem implementados. A pasta `servidor-crm` no pacote completo é uma cópia intacta do material recebido.
