
import React from 'react';
import { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { askHelpAI } from '../services/aiService';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([{role:'assistant', text:'Hi! I’m DevDirectory Assist. Ask me how to find developers, publish a project, or improve a developer profile.'}]);
  async function send(e) {
    e.preventDefault(); if (!input.trim() || busy) return;
    const prompt = input.trim(); setInput(''); setMessages(m=>[...m,{role:'user',text:prompt}]); setBusy(true);
    try { const answer = await askHelpAI(prompt); setMessages(m=>[...m,{role:'assistant',text:answer}]); }
    catch { setMessages(m=>[...m,{role:'assistant',text:'I could not reach the configured AI service. You can still browse developers or publish a post. In production, connect a secure backend AI endpoint.'}]); }
    finally { setBusy(false); }
  }
  return <>
    {open && <section className="ai-panel" aria-label="AI help assistant"><div className="ai-panel-head"><div className="ai-icon"><Bot size={20}/></div><div><b>DevDirectory Assist</b><small><i className="online-dot"/> AI help · Demo mode</small></div><button className="icon-button" onClick={()=>setOpen(false)} aria-label="Close assistant"><X size={18}/></button></div>
      <div className="ai-messages">{messages.map((m,i)=><div className={`chat-message ${m.role}`} key={i}>{m.role==='assistant'&&<Sparkles size={14}/>}<span>{m.text}</span></div>)}{busy&&<div className="typing">Thinking<span>...</span></div>}</div>
      <form className="ai-input" onSubmit={send}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything..." aria-label="Ask the assistant"/><button className="button button-primary" disabled={busy||!input.trim()} aria-label="Send message"><Send size={16}/></button></form>
      <div className="ai-footnote">Demo responses; connect a backend for live AI.</div></section>}
    <button className="assistant-launcher" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close AI assistant':'Open AI assistant'}>{open?<X size={22}/>:<><MessageCircle size={20}/><span>Ask AI</span></>}</button>
  </>;
}
