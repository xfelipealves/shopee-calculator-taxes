# Calculadora de Taxas Shopee

Uma calculadora completa para calcular comissões e taxas da Shopee, permitindo aos vendedores entenderem exatamente quanto receberão líquido e qual valor devem anunciar para atingir um valor líquido desejado.

## 🚀 Funcionalidades

### Modos de Cálculo
- **Modo Valor do Produto**: Insira o valor do produto e veja quanto receberá líquido
- **Modo Valor Líquido Desejado**: Insira quanto quer receber e veja qual valor anunciar

### Taxas Implementadas
- ✅ **Comissão Padrão**: 12% sobre o valor do produto
- ✅ **Taxa de Transação**: 2% sobre o valor do produto
- ✅ **Taxa de Transporte**: 6% sobre o valor do produto (Programa de Frete Grátis)
- ✅ **Taxa por Item Vendido**: R$ 4,00 ou R$ 5,00 (vendedores CPF com +450 pedidos)
- ✅ **Campanhas de Destaque**: +2% sobre o valor do produto
- ✅ **Limite de Comissão**: Máximo R$ 100,00 por item
- ✅ **Produtos abaixo de R$ 8,00**: Taxa por item = metade do valor do produto

### Interface
- 🎨 Design moderno e responsivo
- 📱 Compatível com dispositivos móveis
- 🔄 Cálculos em tempo real
- 📊 Visualização detalhada das taxas
- ⚠️ Alertas e validações

## 🛠️ Como Usar

### 1. Modo Valor do Produto
1. Selecione "Valor do Produto"
2. Insira o valor que pretende anunciar
3. Configure as opções (Frete Grátis, Campanhas, etc.)
4. Veja o valor líquido que receberá

### 2. Modo Valor Líquido Desejado
1. Selecione "Valor Líquido Desejado"
2. Insira quanto quer receber líquido
3. Configure as opções
4. Veja qual valor deve anunciar

### 3. Configurações Disponíveis
- **Programa de Frete Grátis**: Adiciona 6% de taxa de transporte
- **Vendedor CPF com +450 pedidos**: Taxa por item de R$ 5,00 (ao invés de R$ 4,00)
- **Campanha de Destaque**: Adiciona 2% de taxa extra
- **Quantidade**: Para calcular múltiplos itens

## 📋 Exemplos de Cálculo

### Exemplo 1: Produto R$ 100,00 com Frete Grátis
- **Valor do Produto**: R$ 100,00
- **Comissão Padrão (12%)**: R$ 12,00
- **Taxa de Transação (2%)**: R$ 2,00
- **Taxa de Transporte (6%)**: R$ 6,00
- **Taxa por Item**: R$ 4,00
- **Total de Comissões**: R$ 24,00
- **Valor Líquido**: R$ 76,00

### Exemplo 2: Produto R$ 50,00 sem Frete Grátis
- **Valor do Produto**: R$ 50,00
- **Comissão Padrão (12%)**: R$ 6,00
- **Taxa de Transação (2%)**: R$ 1,00
- **Taxa por Item**: R$ 4,00
- **Total de Comissões**: R$ 11,00
- **Valor Líquido**: R$ 39,00

### Exemplo 3: Produto R$ 5,00 (abaixo de R$ 8,00)
- **Valor do Produto**: R$ 5,00
- **Comissão Padrão (12%)**: R$ 0,60
- **Taxa de Transação (2%)**: R$ 0,10
- **Taxa por Item (metade do valor)**: R$ 2,50
- **Total de Comissões**: R$ 3,20
- **Valor Líquido**: R$ 1,80

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com Flexbox e Grid
- **JavaScript ES6+**: Lógica de cálculo e interatividade
- **Font Awesome**: Ícones
- **Design Responsivo**: Compatível com todos os dispositivos

## 📱 Responsividade

A calculadora é totalmente responsiva e funciona perfeitamente em:
- 💻 Desktops e laptops
- 📱 Smartphones
- 📟 Tablets

## 🚀 Como Executar

1. Clone ou baixe os arquivos
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Comece a calcular!

## 📊 Recursos Avançados

### Cálculo Iterativo
Para o modo "Valor Líquido Desejado", a calculadora usa um algoritmo iterativo para encontrar o valor exato a ser anunciado, considerando que as taxas dependem do valor do produto.

### Validações
- ✅ Valores numéricos válidos
- ✅ Quantidade positiva
- ✅ Mensagens de erro claras
- ✅ Prevenção de valores inválidos

### Performance
- ⚡ Cálculos em tempo real
- 🔄 Atualizações automáticas
- 💾 Sem necessidade de servidor

## 🎯 Casos de Uso

1. **Vendedores iniciantes**: Entender quanto receberão de cada venda
2. **Vendedores experientes**: Otimizar preços para margens específicas
3. **Análise de campanhas**: Calcular impacto de campanhas promocionais
4. **Planejamento financeiro**: Prever receitas líquidas

## 📈 Próximas Funcionalidades

- [ ] Histórico de cálculos
- [ ] Exportação de relatórios
- [ ] Comparação de cenários
- [ ] Integração com APIs da Shopee
- [ ] Calculadora para outros marketplaces

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novas funcionalidades
- Melhorar a documentação

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para a comunidade de vendedores da Shopee**
