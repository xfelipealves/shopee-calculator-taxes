// Calculadora de Taxas Shopee
class ShopeeCalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.setInitialState();
    }

    initializeElements() {
        // Elementos do formulário
        this.form = document.getElementById('calculatorForm');
        this.productValueInput = document.getElementById('productValue');
        this.netValueInput = document.getElementById('netValue');
        this.freeShippingCheckbox = document.getElementById('freeShipping');
        this.highVolumeSellerCheckbox = document.getElementById('highVolumeSeller');
        this.highlightCampaignCheckbox = document.getElementById('highlightCampaign');
        this.quantityInput = document.getElementById('quantity');

        // Botões de modo
        this.productValueModeBtn = document.getElementById('mode-product-value');
        this.netValueModeBtn = document.getElementById('mode-net-value');

        // Divs de modo
        this.productValueMode = document.getElementById('product-value-mode');
        this.netValueMode = document.getElementById('net-value-mode');

        // Elementos de resultado
        this.resultsSection = document.getElementById('results');
        this.resultProductValue = document.getElementById('resultProductValue');
        this.resultStandardCommission = document.getElementById('resultStandardCommission');
        this.resultTransactionFee = document.getElementById('resultTransactionFee');
        this.resultShippingFee = document.getElementById('resultShippingFee');
        this.resultItemFee = document.getElementById('resultItemFee');
        this.resultCampaignFee = document.getElementById('resultCampaignFee');
        this.resultTotalFees = document.getElementById('resultTotalFees');
        this.resultNetValue = document.getElementById('resultNetValue');
        this.profitMargin = document.getElementById('profitMargin');
        this.totalTaxPercentage = document.getElementById('totalTaxPercentage');

        // Cards condicionais
        this.resultShippingCard = document.getElementById('resultShippingCard');
        this.resultCampaignCard = document.getElementById('resultCampaignCard');

        this.currentMode = 'product-value';
    }

    bindEvents() {
        // Event listeners para mudança de modo
        this.productValueModeBtn.addEventListener('click', () => this.switchMode('product-value'));
        this.netValueModeBtn.addEventListener('click', () => this.switchMode('net-value'));

        // Event listener para o formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });

        // Event listeners para mudanças em tempo real
        this.freeShippingCheckbox.addEventListener('change', () => this.calculate());
        this.highVolumeSellerCheckbox.addEventListener('change', () => this.calculate());
        this.highlightCampaignCheckbox.addEventListener('change', () => this.calculate());
        this.quantityInput.addEventListener('input', () => this.calculate());

        // Event listeners para inputs de valor
        this.productValueInput.addEventListener('input', () => {
            if (this.currentMode === 'product-value') {
                this.calculate();
            }
        });

        this.netValueInput.addEventListener('input', () => {
            if (this.currentMode === 'net-value') {
                this.calculate();
            }
        });
    }

    setInitialState() {
        this.switchMode('product-value');
    }

    switchMode(mode) {
        this.currentMode = mode;

        // Atualizar botões
        this.productValueModeBtn.classList.toggle('active', mode === 'product-value');
        this.netValueModeBtn.classList.toggle('active', mode === 'net-value');

        // Atualizar visibilidade dos inputs
        this.productValueMode.classList.toggle('hidden', mode !== 'product-value');
        this.netValueMode.classList.toggle('hidden', mode !== 'net-value');

        // Limpar inputs
        if (mode === 'product-value') {
            this.netValueInput.value = '';
        } else {
            this.productValueInput.value = '';
        }

        // Recalcular se houver dados
        this.calculate();
    }

    calculate() {
        try {
            const formData = this.getFormData();
            
            if (!this.validateInput(formData)) {
                return;
            }

            let result;
            if (this.currentMode === 'product-value') {
                result = this.calculateFromProductValue(formData);
            } else {
                result = this.calculateFromNetValue(formData);
            }

            this.displayResults(result);
        } catch (error) {
            console.error('Erro no cálculo:', error);
            this.showError('Erro no cálculo. Verifique os valores inseridos.');
        }
    }

    getFormData() {
        return {
            productValue: parseFloat(this.productValueInput.value) || 0,
            netValue: parseFloat(this.netValueInput.value) || 0,
            freeShipping: this.freeShippingCheckbox.checked,
            highVolumeSeller: this.highVolumeSellerCheckbox.checked,
            highlightCampaign: this.highlightCampaignCheckbox.checked,
            quantity: parseInt(this.quantityInput.value) || 1
        };
    }

    validateInput(data) {
        if (this.currentMode === 'product-value' && data.productValue <= 0) {
            this.showError('Por favor, insira um valor do produto válido.');
            return false;
        }

        if (this.currentMode === 'net-value' && data.netValue <= 0) {
            this.showError('Por favor, insira um valor líquido válido.');
            return false;
        }

        if (data.quantity <= 0) {
            this.showError('A quantidade deve ser maior que zero.');
            return false;
        }

        return true;
    }

    calculateFromProductValue(data) {
        const productValue = data.productValue;
        const fees = this.calculateFees(productValue, data);
        
        return {
            productValue: productValue,
            fees: fees,
            netValue: productValue - fees.total,
            profitMargin: ((productValue - fees.total) / productValue) * 100,
            totalTaxPercentage: (fees.total / productValue) * 100
        };
    }

    calculateFromNetValue(data) {
        const desiredNetValue = data.netValue;
        const fees = this.calculateFees(0, data); // Calcular taxas base
        
        // Calcular valor do produto necessário para obter o valor líquido desejado
        // netValue = productValue - totalFees
        // productValue = netValue + totalFees
        // Mas as taxas dependem do productValue, então precisamos iterar
        
        let productValue = this.estimateProductValue(desiredNetValue, data);
        
        // Refinar o cálculo com algumas iterações
        for (let i = 0; i < 5; i++) {
            const currentFees = this.calculateFees(productValue, data);
            const calculatedNetValue = productValue - currentFees.total;
            const difference = Math.abs(calculatedNetValue - desiredNetValue);
            
            if (difference < 0.01) break; // Precisão de 1 centavo
            
            // Ajustar o valor do produto
            productValue = desiredNetValue + currentFees.total;
        }

        const finalFees = this.calculateFees(productValue, data);
        
        return {
            productValue: productValue,
            fees: finalFees,
            netValue: productValue - finalFees.total,
            profitMargin: ((productValue - finalFees.total) / productValue) * 100,
            totalTaxPercentage: (finalFees.total / productValue) * 100
        };
    }

    estimateProductValue(desiredNetValue, data) {
        // Estimativa inicial baseada nas taxas percentuais
        let totalPercentage = 12 + 2; // Comissão padrão + Taxa de transação
        
        if (data.freeShipping) {
            totalPercentage += 6;
        }
        
        if (data.highlightCampaign) {
            totalPercentage += 2;
        }

        // Adicionar taxa fixa estimada
        const itemFee = this.calculateItemFee(desiredNetValue, data.highVolumeSeller);
        const estimatedFixedFees = itemFee * data.quantity;

        // Calcular valor estimado
        const estimatedProductValue = (desiredNetValue + estimatedFixedFees) / (1 - totalPercentage / 100);
        
        return Math.max(estimatedProductValue, desiredNetValue + estimatedFixedFees);
    }

    calculateFees(productValue, data) {
        const standardCommission = productValue * 0.12; // 12%
        const transactionFee = productValue * 0.02; // 2%
        const shippingFee = data.freeShipping ? productValue * 0.06 : 0; // 6%
        const campaignFee = data.highlightCampaign ? productValue * 0.02 : 0; // 2%
        const itemFee = this.calculateItemFee(productValue, data.highVolumeSeller) * data.quantity;

        const total = standardCommission + transactionFee + shippingFee + campaignFee + itemFee;
        
        // Aplicar limite de R$ 100,00 por item
        const limitedTotal = Math.min(total, 100 * data.quantity);

        return {
            standardCommission: standardCommission,
            transactionFee: transactionFee,
            shippingFee: shippingFee,
            campaignFee: campaignFee,
            itemFee: itemFee,
            total: limitedTotal,
            limited: total > 100 * data.quantity
        };
    }

    calculateItemFee(productValue, highVolumeSeller) {
        if (productValue < 8) {
            // Para produtos abaixo de R$ 8,00, a taxa é metade do valor do produto
            return productValue / 2;
        } else {
            // Taxa normal
            return highVolumeSeller ? 5.00 : 4.00;
        }
    }

    displayResults(result) {
        // Atualizar valores principais
        this.resultProductValue.textContent = this.formatCurrency(result.productValue);
        this.resultStandardCommission.textContent = this.formatCurrency(result.fees.standardCommission);
        this.resultTransactionFee.textContent = this.formatCurrency(result.fees.transactionFee);
        this.resultShippingFee.textContent = this.formatCurrency(result.fees.shippingFee);
        this.resultItemFee.textContent = this.formatCurrency(result.fees.itemFee);
        this.resultCampaignFee.textContent = this.formatCurrency(result.fees.campaignFee);
        this.resultTotalFees.textContent = this.formatCurrency(result.fees.total);
        this.resultNetValue.textContent = this.formatCurrency(result.netValue);

        // Atualizar percentuais
        this.profitMargin.textContent = `${result.profitMargin.toFixed(1)}%`;
        this.totalTaxPercentage.textContent = `${result.totalTaxPercentage.toFixed(1)}%`;

        // Mostrar/ocultar cards condicionais
        this.resultShippingCard.style.display = result.fees.shippingFee > 0 ? 'block' : 'none';
        this.resultCampaignCard.style.display = result.fees.campaignFee > 0 ? 'block' : 'none';

        // Mostrar seção de resultados
        this.resultsSection.style.display = 'block';

        // Scroll suave para os resultados
        this.resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });

        // Adicionar classe de destaque se houver limitação
        if (result.fees.limited) {
            this.resultTotalFees.parentElement.classList.add('highlight');
        } else {
            this.resultTotalFees.parentElement.classList.remove('highlight');
        }
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    showError(message) {
        // Criar ou atualizar elemento de erro
        let errorElement = document.getElementById('error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error-message';
            errorElement.style.cssText = `
                background: #f8d7da;
                color: #721c24;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                border: 1px solid #f5c6cb;
                text-align: center;
                font-weight: 500;
            `;
            this.form.insertBefore(errorElement, this.form.firstChild);
        }
        
        errorElement.textContent = message;
        
        // Remover erro após 5 segundos
        setTimeout(() => {
            if (errorElement && errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 5000);
    }
}

// Inicializar a calculadora quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ShopeeCalculator();
});

// Função utilitária para testar a calculadora
function testCalculator() {
    const calculator = new ShopeeCalculator();
    
    console.log('Testando calculadora...');
    
    // Teste 1: Produto de R$ 100 com frete grátis
    console.log('Teste 1: Produto R$ 100,00 com frete grátis');
    const test1 = calculator.calculateFromProductValue({
        productValue: 100,
        freeShipping: true,
        highVolumeSeller: false,
        highlightCampaign: false,
        quantity: 1
    });
    console.log('Resultado:', test1);
    
    // Teste 2: Produto de R$ 50 sem frete grátis
    console.log('Teste 2: Produto R$ 50,00 sem frete grátis');
    const test2 = calculator.calculateFromProductValue({
        productValue: 50,
        freeShipping: false,
        highVolumeSeller: false,
        highlightCampaign: false,
        quantity: 1
    });
    console.log('Resultado:', test2);
    
    // Teste 3: Produto abaixo de R$ 8,00
    console.log('Teste 3: Produto R$ 5,00 (abaixo de R$ 8,00)');
    const test3 = calculator.calculateFromProductValue({
        productValue: 5,
        freeShipping: false,
        highVolumeSeller: false,
        highlightCampaign: false,
        quantity: 1
    });
    console.log('Resultado:', test3);
}

// Exportar para uso global (opcional)
window.ShopeeCalculator = ShopeeCalculator;
window.testCalculator = testCalculator;
