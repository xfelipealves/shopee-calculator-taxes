# Preço em perspectiva

Simulador local de precificação em React + TypeScript. Informe preço por unidade ou lucro líquido desejado para o lote, configure custos/taxas e compare até quatro cenários. Interface em português, valores em reais e dados fictícios.

**Preset demonstrativo, sem tarifas atuais verificadas da Shopee.** Não há conexão com marketplaces, contas ou serviços externos. O exemplo usa hipóteses históricas editáveis; não é uma cotação de plataforma.

## Executar neste checkout

Requer Node.js 20.19+ ou 22.12+ e npm compatível. Use a versão LTS disponível que satisfaça esses requisitos.

```bash
rtk npm ci
rtk npm run dev
```

Abra o endereço local informado pelo Vite (normalmente http://127.0.0.1:5173/). O servidor escuta somente no loopback. Ctrl+C encerra o processo. Nenhuma tela do Orca precisa ser ativada pelo worker.

```bash
rtk npm run typecheck
rtk npm run build
rtk npm run preview
```

O build gera `dist/`; preview serve esse build localmente, geralmente em http://127.0.0.1:4173/. Não é deploy. Este checkout usa o prefixo RTK conforme as instruções da sessão. Nenhum comando de teste foi adicionado.

## Como usar e demonstrar

- **Tenho um preço:** preço, custo e embalagem são por unidade; quantidade multiplica receita, custos e taxas.
- **Quero um lucro:** a meta é o lucro total do lote, após taxas e custos. O motor encontra o menor preço unitário em centavos que atinge a meta; o arredondamento pode ultrapassá-la.
- Configure comissão, transação e adicional percentuais; taxa fixa por unidade; teto opcional sobre o conjunto das taxas por unidade.
- Salve uma alternativa, mude os valores e salve outra. Os snapshots não mudam ao editar o formulário. Até quatro cenários; remoção disponível. Recarregar a página apaga os cenários.
- “Carregar exemplo fictício” restaura os inputs, modo e teto, mantendo a comparação.

Exemplo fictício inicial: produto R$ 32,00 + embalagem R$ 2,50, uma unidade vendida a R$ 79,90, percentuais de 12% + 2% + 6%, taxa fixa de R$ 4,00 e teto de R$ 100,00. Taxas: R$ 19,98; receita líquida: R$ 59,92; lucro: R$ 25,42. A R$ 69,90, lucro: R$ 17,42. Para meta de lucro R$ 25,00 com uma unidade, preço: R$ 79,37. Roteiro completo em [docs/PORTFOLIO-PLAN.md](docs/PORTFOLIO-PLAN.md).

## Modelo financeiro

```text
receita bruta = preço unitário × quantidade
taxa percentual unitária = arredondar(preço em centavos × soma das taxas / 10.000)
taxas unitárias = mínimo(taxa percentual + fixa, teto), quando habilitado
receita líquida = receita bruta − taxas totais
lucro líquido estimado = receita líquida − custos dos produtos − embalagens
margem = lucro / receita bruta × 100
```

O motor usa centavos inteiros e pontos-base (100 pontos-base = 1%). Arredonda a soma percentual uma vez por unidade e depois multiplica pela quantidade. A redução pelo teto aparece separadamente, permitindo reconciliar o detalhamento. Receita líquida é o valor após taxas **antes dos custos**, não lucro.

Entradas aceitam vírgula ou ponto, até duas casas decimais, sem separador de milhares. Custos podem ser zero; preço mínimo R$ 0,01. Limites: R$ 1 milhão por campo monetário, quantidade inteira de 1 a 10.000, soma percentual menor que 100%. Meta de lucro é não negativa e total do lote. Entradas vazias/inválidas mostram erro e impedem salvar cenário. Prejuízo é exibido quando preço não cobre taxas e custos.

## Histórico preservado

A calculadora original está em [legacy.html](legacy.html), com aviso visível. `script.js` e `style.css` permanecem intactos. No servidor de desenvolvimento, visite /legacy.html. A página histórica depende de ícones do CDN; o novo simulador não depende de fontes ou ícones externos. O build Vite contém apenas a aplicação nova; o legado é arquivo de referência do checkout, não um produto publicado.

Comportamentos úteis mantidos na versão nova: cálculo direto e inverso, atualização imediata, BRL, decomposição e limite opcional de taxas. Mudanças intencionais:

- Quantidade agora representa unidades idênticas: multiplica também receita e percentuais. No legado, apenas taxa fixa e teto eram multiplicados.
- Custo do produto e embalagem entram no lucro. A antiga “margem de lucro” media valor após taxas sobre preço, sem custos.
- A inversão da nova interface busca lucro após custos, em vez de somente receita líquida; usa busca binária em centavos em vez de até cinco iterações.
- As hipóteses de metade do preço abaixo de R$ 8 e taxa CPF de R$ 5 ficam documentadas e preservadas somente no legado. No novo simulador, a taxa fixa é sempre o parâmetro editado.
- O adicional histórico opcional de campanha (2%) pode ser simulado editando “Adicional”; não existe alegação de elegibilidade ou regra atual.
- O legado exibia taxas individuais antes do teto sem reconciliar o detalhamento; a nova tela mostra a redução do teto.

`test.html` é o harness histórico, sem manutenção nesta tarefa. Ele depende de elementos de formulário ausentes e não deve ser considerado suíte confiável. Nenhum teste foi adicionado ou executado.

## Estrutura

```text
src/calculator.ts        Motor puro, parsing, limites e formatação
src/App.tsx             Interface, inputs e snapshots de cenários
src/styles.css          Acabamento e responsividade
src/main.tsx            Entrada React
index.html              Entrada Vite
package.json            Dependências e comandos locais
package-lock.json       Versões resolvidas
tsconfig.json           TypeScript estrito
docs/PORTFOLIO-PLAN.md   Objetivo, etapas, critérios, demo e verificações
legacy.html             Interface histórica com aviso
script.js / style.css   Código original preservado
test.html               Harness histórico não executado
```

## Verificações e limites

Revisão estática pelo agente principal e worker headless, checks de sintaxe/typecheck/build e whitespace. Resultados e limitações estão no plano de portfólio. Build não comprova interação, layout, navegação por teclado ou precisão das regras de uma plataforma real; revisão visual/interativa fica pendente. Esta tarefa expressamente exclui criação e execução de testes.

Frete efetivamente pago pelo vendedor, tributos, publicidade, devoluções e despesas operacionais não são descontados. O resultado é estimativa dos parâmetros informados. Plataformas podem arredondar individualmente taxas ou usar outra base. Sem persistência, exportação, backend ou taxas oficiais atuais.

Publicação pública, GIF e eventual integração ficam planejados para revisão posterior. Nenhum push, merge ou deploy foi autorizado nesta entrega. Nenhuma alteração de perfil GitHub ou Obsidian.

## Licença

O repositório não contém LICENSE. Não presuma licença MIT ou permissão de redistribuição.
