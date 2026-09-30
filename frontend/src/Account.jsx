import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const money = cents => new Intl.NumberFormat('en-SZ', { style: 'currency', currency: 'SZL' }).format(cents / 100)

export default function Account() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState([])
  const [goal, setGoal] = useState('1500')
  const [savedGoal, setSavedGoal] = useState(150000)
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [loadedUser, setLoadedUser] = useState(null)
  const userId = session?.user.id
  const loaded = Boolean(userId && loadedUser === userId)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      setSession(data.session)
      setReady(true)
      if (error) setMessage(error.message)
    }).catch(() => { if (active) { setReady(true); setMessage('Unable to connect. Please try again.') } })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => {
      if (active) { setSession(next); setReady(true); setMessage('') }
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  useEffect(() => {
    let active = true
    if (!userId) return () => { active = false }
    Promise.all([
      supabase.from('demo_contributions').select('id,amount_cents,created_at').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('savings_goals').select('target_cents').eq('user_id', userId).maybeSingle(),
    ]).then(([activity, target]) => {
      if (!active) return
      if (activity.error || target.error) { setMessage((activity.error || target.error).message); return }
      setEntries(activity.data)
      const cents = target.data?.target_cents || 150000
      setGoal(String(cents / 100))
      setSavedGoal(cents)
      setLoadedUser(userId)
    }).catch(() => { if (active) setMessage('Unable to load your account. Please reload to retry.') })
    return () => { active = false }
  }, [userId])

  async function authenticate(event) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const result = signup
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
      if (result.error) throw result.error
      setPassword('')
      if (signup && !result.data.session) setMessage('Check your email to confirm your account, then sign in. Email delivery may be restricted during testing.')
    } catch (error) { setMessage(error.message || 'Unable to sign in. Please try again.') }
    finally { setBusy(false) }
  }

  async function signOut() {
    setBusy(true)
    try { const { error } = await supabase.auth.signOut(); if (error) throw error }
    catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }

  async function save(event, kind) {
    event.preventDefault()
    const value = Number(kind === 'contribution' ? amount : goal)
    const cents = Math.round(value * 100)
    const maximum = kind === 'contribution' ? 10000000 : 100000000
    if (!Number.isFinite(value) || cents < 1 || cents > maximum) { setMessage('Enter a positive amount within the displayed limit.'); return }
    setBusy(true)
    setMessage('')
    try {
      if (kind === 'contribution') {
        const { data, error } = await supabase.from('demo_contributions').insert({ user_id: userId, amount_cents: cents }).select('id,amount_cents,created_at').single()
        if (error) throw error
        setEntries(previous => [data, ...previous])
        setAmount('')
        setMessage('Demo contribution saved. No money was moved.')
      } else {
        const { error } = await supabase.from('savings_goals').upsert({ user_id: userId, target_cents: cents }, { onConflict: 'user_id' })
        if (error) throw error
        setSavedGoal(cents)
        setMessage('Your goal is saved.')
      }
    } catch (error) { setMessage(error.message || 'Unable to save. Please try again.') }
    finally { setBusy(false) }
  }

  if (!ready) return <main className="wrap page"><p role="status">Connecting to your account…</p></main>
  if (!session) return <main className="wrap page"><span className="eyebrow">YOUR SIKHWAMA ACCOUNT</span><h1>{signup ? 'Create your account.' : 'Welcome back.'}</h1><p className="lead">Save your health savings goal and simulated contributions between visits.</p><section className="panel account-form"><form onSubmit={authenticate}><label>Email<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label><label>Password<input type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={8} required value={password} onChange={event => setPassword(event.target.value)} /></label><button className="button primary" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}</button></form><button className="text-button" disabled={busy} onClick={() => { setSignup(!signup); setMessage(''); setPassword('') }}>{signup ? 'Already registered? Sign in' : 'New here? Create an account'}</button>{message && <p role="status">{message}</p>}</section></main>
  const balance = entries.reduce((total, entry) => total + entry.amount_cents, 0)
  return <main className="wrap page dashboard"><div className="dash-heading"><div><span className="eyebrow">YOUR ACCOUNT</span><h1>Your health savings.</h1><p>{session.user.email}</p></div><button className="reset" onClick={signOut} disabled={busy}>Sign out</button></div><div className="notice">Saved demo records only. No real money or insurance cover.</div>{message && <p role="status">{message}</p>}{!loaded ? <p role="status">Loading your saved records…</p> : <><div className="dash-grid"><section className="balance-box"><div>SAVED DEMO BALANCE</div><strong>{money(balance)}</strong><p>{Math.min(100, Math.round(balance / savedGoal * 100))}% of your {money(savedGoal)} goal</p></section><section className="panel account-form"><h2>Your savings goal</h2><form onSubmit={event => save(event, 'goal')}><label>Goal in Emalangeni (up to E 1,000,000)<input type="number" min=".01" max="1000000" step=".01" value={goal} onChange={event => setGoal(event.target.value)} required /></label><button className="button primary" disabled={busy}>Save goal</button></form></section></div><div className="dash-grid lower"><section className="panel"><h2>Saved activity</h2>{entries.length === 0 && <p>Your first demo contribution will appear here.</p>}{entries.map(entry => <div className="entry" key={entry.id}><span><strong>Demo contribution</strong><small>{new Date(entry.created_at).toLocaleDateString()}</small></span><b>+ {money(entry.amount_cents)}</b></div>)}</section><section className="panel account-form"><h2>Add a demo contribution</h2><p>This records a simulated amount. It does not charge you.</p><form onSubmit={event => save(event, 'contribution')}><label>Amount in Emalangeni (up to E 100,000)<input type="number" min=".01" max="100000" step=".01" value={amount} onChange={event => setAmount(event.target.value)} required /></label><button className="button primary" disabled={busy}>Save demo contribution</button></form></section></div></>}</main>
}
