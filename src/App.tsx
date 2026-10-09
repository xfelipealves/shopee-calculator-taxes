import { useState } from 'react';
import { calculate, currency, MAX_MONEY, parseDecimal, percent, priceForProfit, type PricingInput, type Result } from './calculator';

const demo = {
  cost: '32,00', packaging: '2,50', quantity: '1', price: '79,90', target: '25,00',
  commission: '12', transaction: '2', extra: '6', fixedFee: '4,00', feeCap: '100,00',
};
type Form = typeof demo;
type Mode = 'price' | 'profit';
interface Scenario { id: number; name: string; input: PricingInput; result: Result }

function Field({ id, label, value, unit = 'R$', hint, onChange }: {
  id: string; label: string; value: string; unit?: string; hint?: string; onChange: (value: string) => void;
}) {
  return <label className="field" htmlFor={id}>
    <span>{label}</span>
    <div className="input-wrap"><span aria-hidden="true">{unit}</span><input id={id} type="text" inputMode={unit === 'un.' ? 'numeric' : 'decimal'} value={value} onChange={event => onChange(event.target.value)} autoComplete="off" aria-describedby={hint ? `${id}-hint` : undefined} /></div>
    {hint && <small id={`${id}-hint`}>{hint}</small>}
  </label>;
}

export default function App() {
  const [form, setForm] = useState<Form>({ ...demo });
  const [mode, setMode] = useState<Mode>('price');
  const [capEnabled, setCapEnabled] = useState(true);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [name, setName] = useState('Cenário 1');
  const [notice, setNotice] = useState('');
  const update = (key: keyof Form, value: string) => { setForm(previous => ({ ...previous, [key]: value })); setNotice(''); };
  let result: Result | undefined;
  let input: PricingInput | undefined;
  let error = '';
  try {
    if (!/^\d+$/.test(form.quantity.trim())) throw new Error('Quantidade: use um inteiro entre 1 e 10.000.');
    input = {
      cost: parseDecimal(form.cost, 'Custo do produto', MAX_MONEY),
      packaging: parseDecimal(form.packaging, 'Embalagem', MAX_MONEY),
      quantity: Number(form.quantity),
      commission: parseDecimal(form.commission, 'Comissão', 10_000),
      transaction: parseDecimal(form.transaction, 'Transação', 10_000),
      extra: parseDecimal(form.extra, 'Adicional', 10_000),
      fixedFee: parseDecimal(form.fixedFee, 'Taxa fixa', MAX_MONEY),
      feeCap: capEnabled ? parseDecimal(form.feeCap, 'Teto de taxas', MAX_MONEY) : null,
    };
    result = mode === 'price' ? calculate(parseDecimal(form.price, 'Preço de venda', MAX_MONEY), input) : priceForProfit(parseDecimal(form.target, 'Lucro desejado', MAX_MONEY), input);
  } catch (caught) { error = caught instanceof Error ? caught.message : 'Revise os valores informados.'; }
  const field = (key: keyof Form, label: string, unit?: string, hint?: string) => <Field id={key} label={label} value={form[key]} unit={unit} hint={hint} onChange={value => update(key, value)} />;
  const save = () => {
    if (!result || !input || scenarios.length >= 4) return;
    const scenarioName = name.trim() || `Cenário ${scenarios.length + 1}`;
    setScenarios(previous => [...previous, { id: Date.now(), name: scenarioName, input: { ...input! }, result: { ...result! } }]);
    setName(`Cenário ${scenarios.length + 2}`);
    setNotice(`${scenarioName} salvo para comparação.`);
  };
  const reset = () => { setForm({ ...demo }); setMode('price'); setCapEnabled(true); setNotice('Dados fictícios carregados. Os cenários salvos foram mantidos.'); };

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="/" aria-label="Preço em perspectiva, início"><span className="brand-mark" aria-hidden="true">↗</span> preço em perspectiva</a><span className="local-badge"><i /> Demo local</span></header>
    <main>
      <div className="intro"><div><h1>Encontre o preço.<br />Entenda o que fica.</h1><p>Uma bancada para equilibrar custos, taxas e lucro.<br className="desktop-break" /> Simule uma venda e coloque suas alternativas lado a lado.</p></div><button className="quiet-button" onClick={reset}>Carregar exemplo fictício</button></div>
      <div className="demo-note"><span aria-hidden="true">ⓘ</span><p><strong>Preset demonstrativo.</strong> Percentuais e teto são hipóteses editáveis, inspiradas no código histórico. Não representam tarifas atuais da Shopee.</p></div>
      <div className="workspace">
        <section className="editor" aria-labelledby="simulation-title">
          <div className="section-heading"><h2 id="simulation-title">Sua simulação</h2><span>BRL / R$</span></div>
          <div className="mode-switch" role="group" aria-label="Modo de cálculo"><button aria-pressed={mode === 'price'} onClick={() => setMode('price')}>Tenho um preço</button><button aria-pressed={mode === 'profit'} onClick={() => setMode('profit')}>Quero um lucro</button></div>
          <div className="fields two-columns">
            {field('cost', 'Custo do produto', 'R$', 'Por unidade')}
            {field('packaging', 'Embalagem', 'R$', 'Por unidade')}
            {field('quantity', 'Quantidade', 'un.', 'Unidades iguais no lote')}
            {mode === 'price' ? field('price', 'Preço de venda', 'R$', 'Por unidade') : field('target', 'Lucro líquido desejado', 'R$', 'Total do lote, após custos e taxas')}
          </div>
          <div className="fee-heading"><h3>Taxas configuráveis</h3><span>Sobre a venda</span></div>
          <div className="fields three-columns">{field('commission', 'Comissão', '%')}{field('transaction', 'Transação', '%')}{field('extra', 'Adicional', '%')}</div>
          <div className="fields two-columns bottom-fields">{field('fixedFee', 'Taxa fixa', 'R$', 'Por unidade')}<div className="cap-control"><label className="checkbox"><input type="checkbox" checked={capEnabled} onChange={event => setCapEnabled(event.target.checked)} /> Limitar taxas por unidade</label>{capEnabled ? field('feeCap', 'Teto de taxas', 'R$') : <p className="muted">Sem teto nesta simulação.</p>}</div></div>
          <p className="input-help">Use vírgula ou ponto decimal, sem separador de milhares. Soma dos percentuais abaixo de 100%.</p>
        </section>
        <section className="result-panel" aria-labelledby="result-title">
          <div className="section-heading"><h2 id="result-title">O destino da venda</h2><span>Total do lote</span></div>
          {error ? <div className="error-box" role="alert"><h3>Revise a simulação</h3><p>{error}</p></div> : result && input && <>
            <div className="price-line"><span>{mode === 'profit' ? 'Preço mínimo por unidade' : 'Preço de venda por unidade'}</span><strong>{currency(result.unitPrice)}</strong></div>
            <div className={`profit-block ${result.profit < 0 ? 'negative' : ''}`}><span>{result.profit < 0 ? 'Prejuízo estimado' : 'Lucro líquido estimado'}</span><strong>{currency(result.profit)}</strong><p>{percent(result.margin)} de margem sobre a receita bruta</p></div>
            {result.profit >= 0 && <div className="allocation" aria-hidden="true"><span className="allocation-cost" style={{ width: `${(result.productCost + result.packagingCost) / result.gross * 100}%` }} /><span className="allocation-fee" style={{ width: `${result.fees / result.gross * 100}%` }} /><span className="allocation-profit" style={{ width: `${result.profit / result.gross * 100}%` }} /></div>}
            <dl className="breakdown">
              <div className="gross-row"><dt>Receita bruta <small>{input.quantity.toLocaleString('pt-BR')} un. × {currency(result.unitPrice)}</small></dt><dd>{currency(result.gross)}</dd></div>
              <div><dt><i className="dot fees-dot" /> Taxas percentuais <small>{percent((input.commission + input.transaction + input.extra) / 100)} combinados</small></dt><dd>− {currency(result.percentageFees)}</dd></div>
              <div><dt>Taxas fixas</dt><dd>− {currency(result.fixedFees)}</dd></div>
              {result.capDiscount > 0 && <div><dt>Redução pelo teto</dt><dd>+ {currency(result.capDiscount)}</dd></div>}
              <div className="subtotal"><dt>Total de taxas</dt><dd>{currency(result.fees)}</dd></div>
              <div className="net-row"><dt>Receita líquida <small>Após taxas, antes dos custos</small></dt><dd>{currency(result.netRevenue)}</dd></div>
              <div><dt><i className="dot cost-dot" /> Custo dos produtos</dt><dd>− {currency(result.productCost)}</dd></div>
              <div><dt>Embalagens</dt><dd>− {currency(result.packagingCost)}</dd></div>
              <div className="final-row"><dt>Lucro líquido estimado</dt><dd>{currency(result.profit)}</dd></div>
            </dl>
            <p className="result-footnote">{mode === 'profit' ? 'O preço arredondado em centavos pode superar a meta. ' : ''}Lucro considera somente os custos informados. Frete pago pelo vendedor, tributos e despesas operacionais não estão incluídos.</p>
          </>}
        </section>
      </div>
      <section className="comparison" aria-labelledby="comparison-title">
        <div className="comparison-heading"><div><h2 id="comparison-title">Compare antes de decidir</h2><p>Salve até 4 alternativas. Depois, mude os valores para explorar outra venda.</p></div><span>{scenarios.length}/4 cenários</span></div>
        <div className="save-row"><label htmlFor="scenario-name">Nome do cenário<input id="scenario-name" value={name} maxLength={40} onChange={event => setName(event.target.value)} /></label><button className="primary-button" disabled={!result || scenarios.length >= 4} onClick={save}>Salvar cenário</button></div>
        <p className="status-message" role="status">{notice || (scenarios.length === 4 ? 'Limite atingido. Remova um cenário para salvar outro.' : 'Cenários ficam nesta sessão e são apagados ao recarregar a página.')}</p>
        {scenarios.length ? <div className="table-scroll"><table><caption className="sr-only">Comparação dos cenários salvos; valores totais do lote, exceto preço por unidade</caption><thead><tr><th scope="col">Cenário</th><th scope="col">Qtd.</th><th scope="col">Preço / un.</th><th scope="col">Custos</th><th scope="col">Taxas</th><th scope="col">Receita líquida</th><th scope="col">Lucro</th><th scope="col">Margem</th><th scope="col"><span className="sr-only">Ações</span></th></tr></thead><tbody>{scenarios.map(scenario => <tr key={scenario.id}><th scope="row">{scenario.name}<small>{percent((scenario.input.commission + scenario.input.transaction + scenario.input.extra) / 100)} + {currency(scenario.input.fixedFee)}/un.; teto {scenario.input.feeCap === null ? 'desligado' : currency(scenario.input.feeCap)}</small></th><td>{scenario.input.quantity}</td><td>{currency(scenario.result.unitPrice)}</td><td>{currency(scenario.result.productCost + scenario.result.packagingCost)}</td><td>{currency(scenario.result.fees)}</td><td>{currency(scenario.result.netRevenue)}</td><td className={scenario.result.profit < 0 ? 'loss-text' : 'profit-text'}>{currency(scenario.result.profit)}</td><td>{percent(scenario.result.margin)}</td><td><button className="remove-button" aria-label={`Remover ${scenario.name}`} onClick={() => { setScenarios(previous => previous.filter(item => item.id !== scenario.id)); setNotice(`${scenario.name} removido.`); }}>×</button></td></tr>)}</tbody></table></div> : <div className="empty-state"><span aria-hidden="true">▤</span><p>Seu primeiro cenário começa com a simulação acima.<br /><small>Experimente “Preço atual” e “Meta de lucro”.</small></p></div>}
      </section>
    </main>
    <footer><span>Preço em perspectiva <span className="footer-separator">/</span> Projeto de portfólio</span><span>Dados fictícios. Nenhuma conexão com marketplaces.</span></footer>
  </div>;
}
