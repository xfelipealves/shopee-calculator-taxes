# Preço em perspectiva — plano de portfólio

## Objetivo

Transformar a calculadora estática em uma ferramenta local demonstrável de precificação para vendedores: entender quanto uma venda gera após taxas, descontar custos e comparar alternativas. Evidenciar React, TypeScript, modelagem monetária e acabamento de interface sem conectar contas reais.

## Estado inicial

- Checkout com README, index.html, script.js, style.css e test.html; sem build ou dependências.
- Dois modos úteis: calcular a partir do preço e estimar preço a partir do valor após taxas; atualização ao editar; decomposição das taxas; BRL.
- Hipóteses históricas: 12% comissão, 2% transação, 6% opcional, 2% campanha; R$ 4/R$ 5 fixos, metade do preço abaixo de R$ 8, teto de R$ 100 por item.
- Quantidade afetava taxa fixa e teto, mas não multiplicava receita e percentuais. A chamada margem de lucro não descontava custos. Inversão usava até cinco iterações.
- Harness histórico dependia de elementos ausentes. Não foi corrigido nem executado nesta tarefa.
- Nenhum AGENTS.md adicional encontrado no checkout. Seguidas as instruções de sessão e RTK.md.

## Etapas

1. **Preservar e documentar:** página anterior em legacy.html, script.js e style.css mantidos; aviso visível de arquivo histórico. README atualizado.
2. **Motor independente:** centavos inteiros, percentuais em pontos-base, limites explícitos, quantidade inteira, custos e taxas por unidade, totais por lote, inversão por lucro real.
3. **Interface local:** React + TypeScript + Vite, dois modos, decomposição financeira, edição de taxas/teto, até quatro snapshots de cenários e exemplo fictício.
4. **Verificação autorizada:** revisão estática pelo agente principal e worker headless, sintaxe, typecheck, build e diff. Sem adicionar ou executar testes.
5. **Revisão posterior:** validar interface visualmente e por teclado no navegador autorizado, revisar regras oficiais de qualquer marketplace antes de criar presets atuais, avaliar persistência/exportação, preparar GIF e publicação somente após revisão específica.

## Decisões de produto e design

- Skill utilizada: `/Users/felipealves/.agents/skills/frontend-design/SKILL.md`.
- Paleta: fundo frio `#edf2f6`, superfície `#ffffff`, texto `#243746`, petróleo `#164e63`, lucro `#147568`, taxas `#cc953c`.
- Tipografia local Avenir Next/Avenir com Segoe UI de fallback; sem fontes remotas.
- Bancada alinhada à esquerda: edição à esquerda, resultado à direita, comparação abaixo. Em telas pequenas, uma coluna; comparação com rolagem horizontal.
- Elemento distintivo: composição da receita com barra de custos, taxas e lucro, reforçada por valores textuais. Prejuízo ganha texto e cor próprios.
- Crítica prévia: removida a ideia de cards repetidos por métrica; decomposição contábil contínua facilita reconciliar números. Sem grandes blocos promocionais ou gradientes.

## Critérios de entrega desta versão

- [x] React + TypeScript executável localmente, sem credenciais.
- [x] Custo do produto, embalagem, quantidade, taxas percentuais, taxa fixa e teto editáveis.
- [x] Preço unitário ou lucro líquido total desejado; separação de receita líquida e lucro.
- [x] BRL, vírgula/ponto decimal, até duas casas, sem truncar quantidade ou aceitar entradas vazias silenciosamente.
- [x] Comparação de até quatro cenários imutáveis na sessão, remoção e retorno ao exemplo.
- [x] Preset explicitamente demonstrativo; nenhuma regra apresentada como tarifa atual.
- [x] Histórico preservado e mudanças de semântica documentadas.
- [x] Worker headless iniciado, sem ativar/trocar tela Orca.
- [x] Registrar resultados finais dos checks e da revisão estática abaixo.
- [ ] Revisão visual/interativa posterior; não faz parte das verificações executadas neste turno.

## Limites e riscos conhecidos

- Sem conexão com Shopee, consulta de taxas oficiais, backend, persistência ou exportação. Não houve tentativa de verificar regras atuais: o escopo entregue é um simulador genérico demonstrativo.
- Preset usa 12% + 2% + 6%, R$ 4 e teto R$ 100 apenas como dados de demonstração. Regra histórica abaixo de R$ 8 e opção CPF permanecem somente no legado.
- Arredondamento percentual agregado por unidade; plataformas reais podem usar outra base ou ordem de arredondamento. O teto aplica-se ao conjunto das taxas configuradas.
- Apenas produto/embalagem são custos modelados. Frete real, tributos, publicidade, devoluções e despesas operacionais precisam ser incorporados ou considerados separadamente.
- Inputs monetários limitados a R$ 1 milhão, quantidade a 10.000 e soma percentual menor que 100%; lucro desejado não negativo. A venda pode resultar em prejuízo.
- Build estático não comprova interação, acessibilidade ou layout em navegador. Não adicionar/executar testes nesta tarefa foi uma restrição expressa do usuário.
- Deploy público e GIF aguardam revisão posterior. Sem push, merge, alteração de perfil GitHub ou escrita no Obsidian.

## Roteiro fictício de demonstração

1. Carregar exemplo: produto R$ 32, embalagem R$ 2,50, uma unidade a R$ 79,90, 20% percentuais e R$ 4 fixos. Taxas R$ 19,98, receita líquida R$ 59,92, lucro R$ 25,42.
2. Salvar como “Preço atual”. Alterar preço para R$ 69,90 e salvar “Promoção”: lucro R$ 17,42.
3. Selecionar “Quero um lucro”, meta R$ 25: preço mínimo R$ 79,37, lucro R$ 25,00 pelo arredondamento adotado. Salvar “Meta de lucro”.
4. Alterar quantidade para 3: a meta continua sendo total do lote. Comparar quantidades com atenção aos totais e preço unitário.
5. Alterar custos/taxas ou desligar o teto para discutir sensibilidade. Cenários anteriores não mudam.

## Registro de verificação

Verificação realizada em 2026-10-08, neste checkout, com Node v26.8.2:

- `rtk npm install`: concluído; 20 pacotes adicionados, auditoria informou zero vulnerabilidades. Lockfile gerado. npm informou script de instalação do esbuild ainda não listado em allowScripts; não foi alterada a política global e o build funcionou.
- `rtk npm run build`: exit 0; executou `tsc --noEmit` e Vite 7.3.7, com 30 módulos transformados. Saída: HTML 0,60 kB, CSS 9,59 kB e JS 235,60 kB (gzip JS 73,78 kB).
- `rtk proxy node --check script.js`: exit 0; somente sintaxe, sem executar funções históricas.
- `rtk git diff --check`: exit 0.
- `rtk proxy npm ls --depth=0`: exit 0; React/React DOM 19.3.0, TypeScript 5.9.3, Vite 7.3.7.
- Revisão estática do principal e worker headless `/root/static_review`: sem bloqueios monetários encontrados; fórmulas/teto/quantidade reconciliados, limites dentro de inteiros seguros e busca inversa coerente com a função monotônica usada. Removido import CSS vazio e acrescentada quebra de valores longos para telas pequenas.
- Revisão estática de interface: labels associados, botões com estado pressionado, foco visível, aviso de erro, anúncio de salvamento, tabela com cabeçalhos/caption e layouts por breakpoints. Isso não substitui avaliação em navegador ou com leitor de tela.
- Nenhum teste adicionado ou executado; nenhum harness histórico aberto. Sem revisão visual/interativa, screenshots ou GIF.
- Os valores do roteiro foram derivados por revisão das fórmulas; não representam testes executados.

Artefatos ficam locais, sem commit/push/merge/deploy. Servidor iniciado com `rtk npm run dev -- --port 5173 --strictPort`; `rtk proxy lsof -nP -iTCP:5173 -sTCP:LISTEN` confirmou Node PID 43083 escutando somente em `127.0.0.1:5173`. Isso confirma o servidor, sem exercitar a aplicação. A sessão/tela do Orca não foi ativada ou trocada.
