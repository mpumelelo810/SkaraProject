import { useState } from 'react'
import './App.css'
import Account from './Account'

const money = value => new Intl.NumberFormat('en-SZ', { style: 'currency', currency: 'SZL' }).format(Number(value) || 0)
const seed = [
  { id: 1, label: 'Monthly contribution', date: '12 Sep 2026', amount: 150 },
  { id: 2, label: 'Health savings top-up', date: '04 Sep 2026', amount: 80 },
  { id: 3, label: 'Starting balance', date: '01 Sep 2026', amount: 250 },
]

function Brand() {
  return <span className="brand"><span className="brand-mark">✦</span><span>Sikhwama<small>HEALTH INSURANCE</small></span></span>
}
function Notice() {
  return <div className="notice"><span className="notice-dot" /> Concept demo: balances and contributions are simulated. No real money or insurance cover.</div>
}
function Header({ page, go }) {
  const [open, setOpen] = useState(false)
  const nav = target => { go(target); setOpen(false) }
  return <header className="header"><div className="wrap header-inner">
    <button className="brand-button" onClick={() => nav('home')} aria-label="Sikhwama home"><Brand /></button>
    <button className="menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? '✕' : '☰'}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      <button className={page === 'home' ? 'active' : ''} onClick={() => nav('home')}>Home</button>
      <button className={page === 'how' ? 'active' : ''} onClick={() => nav('how')}>How it works</button>
      <button className={page === 'about' ? 'active' : ''} onClick={() => nav('about')}>About the project</button>
      <button className="nav-cta" onClick={() => nav('demo')}>Explore demo <span>↗</span></button>
      <button className={page === 'account' ? 'active' : ''} onClick={() => nav('account')}>My account</button>
    </nav>
  </div></header>
}
function Home({ go }) {
  return <>
    <section className="hero"><div className="wrap hero-grid"><div className="hero-copy">
      <span className="eyebrow">A HEALTHIER WAY TO PREPARE</span>
      <h1>Small steps today.<br /><em>More peace of mind</em><br />tomorrow.</h1>
      <p>Healthcare costs do not always arrive when you expect them. Sikhwama explores a simple way to build a dedicated health balance, one contribution at a time.</p>
      <div className="actions"><button className="button primary" onClick={() => go('demo')}>Explore the demo <span>→</span></button><button className="text-button" onClick={() => go('how')}>See how it works ↗</button></div>
      <div className="hero-foot"><span>✳</span> Designed around everyday life in Eswatini</div>
    </div><div className="hero-art" aria-label="Illustration of a growing health balance"><div className="orbit one" /><div className="orbit two" /><div className="sun">✦</div>
      <div className="sample-card"><div className="sample-top"><span>✦</span> YOUR HEALTH BALANCE <b>•••</b></div><strong>E 480<span>.00</span></strong><small>Building a little at a time</small><div className="card-flower">✳</div></div>
      <div className="float-card"><span>♡</span><div><strong>+ E 30.00</strong><small>A little more set aside</small></div></div><small className="art-caption">Illustration, not a live account</small>
    </div></div></section>
    <section className="section"><div className="wrap"><div className="section-heading"><span className="eyebrow">THE IDEA</span><h2>Care starts before<br />you need it.</h2><p>A dedicated place to prepare for healthcare expenses, with a clear view of every contribution.</p></div>
      <div className="features">
        <article><span className="feature-icon">◇</span><small>01</small><h3>Save in small amounts</h3><p>The original concept proposes setting aside at least 6% from eligible transactions. The method still needs a payment partner.</p></article>
        <article><span className="feature-icon">↗</span><small>02</small><h3>See your progress</h3><p>Follow a savings goal, balance and complete transaction history in one clear view.</p></article>
        <article><span className="feature-icon">♡</span><small>03</small><h3>Plan for care</h3><p>The long-term vision is to request payments to approved healthcare providers from available savings.</p></article>
      </div>
    </div></section>
    <section className="story-band"><div className="wrap story-grid"><div><span className="eyebrow">BUILT FOR REAL LIFE</span><h2>What if preparing for healthcare felt possible every day?</h2></div><div><p>Sikhwama began as a University of Eswatini project. We are rebuilding the prototype around trustworthy accounts and transparent savings before connecting real payments.</p><button className="button light" onClick={() => go('about')}>Read our story <span>→</span></button></div></div></section>
    <section className="closing"><div className="wrap closing-inner"><div><span className="eyebrow">TRY THE CONCEPT</span><h2>See how small contributions add up.</h2><p>Explore a simulated dashboard. No sign-up or payment details needed.</p></div><button className="button primary" onClick={() => go('demo')}>Open demo dashboard <span>→</span></button></div></section>
  </>
}
function How() {
  const [amount, setAmount] = useState('100')
  const [frequency, setFrequency] = useState('20')
  const [rate, setRate] = useState(6)
  const monthly = Math.max(0, Number(amount) || 0) * Math.max(0, Number(frequency) || 0) * rate / 100
  return <main className="wrap page"><span className="eyebrow">THE SIKHWAMA CONCEPT</span><h1>Make room for health<br /><em>in your everyday plans.</em></h1><p className="lead">The original idea: set aside a portion of eligible transactions in a dedicated health account. These calculations illustrate the concept; they do not move money.</p>
    <div className="steps">{[
      ['01','Choose a goal','Decide what you want to prepare for and how much to put aside.'],
      ['02','Contribute gradually','The academic proposal suggested a minimum of 6% from eligible transactions.'],
      ['03','Track every step','See contributions and the balance in a transparent history.'],
      ['04','Use funds for care','A future flow could support payment requests to approved providers.'],
    ].map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <div className="calculator"><div><span className="eyebrow">EXPLORE THE NUMBERS</span><h2>What could small amounts become?</h2><p>Change the values to see possible contributions over time. This is a planning example, not an insurance quote or a promise of returns.</p></div><div className="calc-form">
      <label>Typical transaction amount (E)<input type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} /></label>
      <label>Transactions per month<input type="number" min="0" value={frequency} onChange={e=>setFrequency(e.target.value)} /></label>
      <label>Contribution rate <strong>{rate}%</strong><input type="range" min="6" max="25" value={rate} onChange={e=>setRate(Number(e.target.value))} /></label>
      <div className="calc-results"><div><small>Per transaction</small><strong>{money((Number(amount)||0)*rate/100)}</strong></div><div><small>After 12 months</small><strong>{money(monthly*12)}</strong></div></div>
    </div></div>
  </main>
}
function About() {
  return <main className="wrap page"><span className="eyebrow">ABOUT THE PROJECT</span><h1>A student idea with<br /><em>a practical purpose.</em></h1><p className="lead">Sikhwama started as a CSC499 project at the University of Eswatini by Mpumelelo Mancoba Dlamini and Mfanwekhaya Jeffrey Dube. It explored health savings and an academic prediction experiment using synthetic data.</p>
    <div className="about-grid"><div className="quote"><span>“</span><p>Prepare a little at a time, and know where you stand.</p><small>The idea behind Sikhwama</small></div><div><h2>Where the project stands</h2><p>The Django repository is an early prototype with public pages, account forms and data models. It does not process payments, provide insurance cover or pay clinics. The regression experiment is not connected to the running application.</p><p>The next step is to repair the foundation, build secure accounts and create a traceable contribution history with simulated money. Real financial integration requires suitable partners and further testing.</p><a href="https://github.com/mpumelelo810/SkaraProject" target="_blank" rel="noreferrer">View the GitHub repository ↗</a></div></div><Notice />
  </main>
}
function Demo() {
  const [entries, setEntries] = useState(seed)
  const [amount, setAmount] = useState('')
  const [goalInput, setGoalInput] = useState('1500')
  const [goal, setGoal] = useState(1500)
  const [message, setMessage] = useState('')
  const balance = entries.reduce((sum, entry) => sum + entry.amount, 0)
  const add = event => { event.preventDefault(); const value = Number(amount); if (!Number.isFinite(value) || value < .01 || value > 100000) { setMessage('Enter an amount between E 0.01 and E 100,000.'); return } setEntries([{ id: Date.now(), label: 'Demo contribution', date: new Intl.DateTimeFormat('en-SZ',{day:'2-digit',month:'short',year:'numeric'}).format(new Date()), amount: Math.round(value*100)/100 },...entries]); setAmount(''); setMessage('Added to this demo only. No money was moved.') }
  const updateGoal = event => { event.preventDefault(); const value=Number(goalInput); if (!Number.isFinite(value)||value<1||value>1000000) { setMessage('Enter a goal between E 1 and E 1,000,000.'); return } setGoal(value); setMessage('Demo goal updated.') }
  const reset = () => { setEntries(seed); setGoal(1500); setGoalInput('1500'); setAmount(''); setMessage('Demo values reset.') }
  return <main className="wrap page dashboard"><span className="eyebrow">INTERACTIVE PREVIEW</span><div className="dash-heading"><div><h1>Your health savings,<br /><em>at a glance.</em></h1><p className="lead">Explore how a clear balance and contribution history could work.</p></div><button className="reset" onClick={reset}>Reset demo</button></div><Notice />
    <div className="dash-grid"><section className="balance-box"><div>DEMO BALANCE <span>✦</span></div><strong>{money(balance)}</strong><p>A simulated balance for exploring the interface.</p><span className="watermark">✳</span></section><section className="panel"><h2>♡ &nbsp; Your savings goal</h2><div className="goal-value"><strong>{money(balance)}</strong> <span>of {money(goal)}</span></div><div className="progress"><div style={{width: Math.min(100,balance/goal*100)+'%'}} /></div><small>{Math.min(100,Math.round(balance/goal*100))}% of your demo goal reached</small><form className="goal-form" onSubmit={updateGoal}><label htmlFor="goal">Change goal (E)</label><div><input id="goal" type="number" min="1" value={goalInput} onChange={e=>setGoalInput(e.target.value)} /><button>Update</button></div></form></section></div>
    <div className="dash-grid lower"><section className="panel"><div className="panel-head"><h2>Activity</h2><small>{entries.length} entries</small></div>{entries.map(item=><div className="entry" key={item.id}><span className="entry-icon">+</span><span><strong>{item.label}</strong><small>{item.date}</small></span><b>+ {money(item.amount)}</b></div>)}</section><section className="panel add-panel"><span className="feature-icon">+</span><h2>Try a contribution</h2><p>Add a simulated amount to see the balance and goal progress update.</p><form onSubmit={add}><label htmlFor="amount">Amount in Emalangeni</label><div className="money-input"><span>E</span><input id="amount" type="number" min=".01" max="100000" step=".01" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} /></div><button className="button primary">Add demo contribution <span>→</span></button></form>{message && <p className="status" role="status">{message}</p>}</section></div>
  </main>
}
function App() {
  const [page, setPage] = useState('home')
  const go = target => { setPage(target); window.scrollTo({top:0,behavior:'smooth'}) }
  return <><Header page={page} go={go}/>{page==='home'?<Home go={go}/>:page==='how'?<How/>:page==='about'?<About/>:page==='account'?<Account/>:<Demo/>}<footer className="footer"><div className="wrap footer-main"><div><Brand/><p>A health finance concept built around small steps and clearer choices.</p></div><div><button onClick={()=>go('how')}>How it works</button><button onClick={()=>go('about')}>About the project</button><button onClick={()=>go('demo')}>Explore demo</button></div></div><div className="wrap footer-bottom"><span>© 2026 Sikhwama. Concept prototype.</span><span>Made with purpose in Eswatini.</span></div></footer></>
}
export default App
