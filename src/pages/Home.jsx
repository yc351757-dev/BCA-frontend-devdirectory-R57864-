import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Code2, Users, FileText, Sparkles, Search, ShieldCheck, Zap, Globe2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDevelopers } from '../services/dataService';
import DeveloperCard from '../components/DeveloperCard';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const [developers,setDevelopers]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{getDevelopers().then(setDevelopers).catch(()=>setDevelopers([])).finally(()=>setLoading(false));},[]);
  return <main>
    <section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> BUILT FOR PEOPLE WHO BUILD <span className="eyebrow-badge">BETA 1.0</span></div>
      <h1>Find your people.<br/><span>Build what’s next.</span></h1>
      <p className="hero-subtitle">A home for developers, makers, and engineering teams to discover talent, share what they’re building, and grow together.</p>
      <div className="hero-actions"><Link className="button button-primary button-large" to="/users">Explore developers <ArrowRight size={17}/></Link><Link className="button button-secondary button-large" to="/add-post">Share your work <ArrowUpRight size={17}/></Link></div>
      <div className="social-proof"><div className="mini-avatars"><i>AL</i><i>MK</i><i>JR</i><i>+</i></div><span><b>Great work starts with great people.</b><small>Discover your next collaborator.</small></span></div>
    </div><div className="hero-art" aria-label="Developer network illustration"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core-logo"><Code2 size={44}/><span>DD</span></div><div className="orbit-node node-a"><span>JS</span></div><div className="orbit-node node-b"><span>AI</span></div><div className="orbit-node node-c"><span>UI</span></div><div className="orbit-node node-d"><span>DB</span></div><div className="orbit-label label-a">Open source</div><div className="orbit-label label-b">Engineering</div><div className="orbit-label label-c">Community</div></div>
    </section>
    <section className="stats-strip wrap"><div><Users/><b>10+</b><span>Developers to discover</span></div><div><FileText/><b>100+</b><span>Ideas to explore</span></div><div><Globe2/><b>One network</b><span>Built for collaboration</span></div><div><Zap/><b>AI-ready</b><span>Smarter publishing tools</span></div></section>
    <section className="section wrap"><div className="section-heading"><div><div className="eyebrow">THE COMMUNITY</div><h2>People to build with.</h2><p>Meet engineers across disciplines, technologies, and ideas.</p></div><Link className="text-link" to="/users">View all developers <ArrowRight size={16}/></Link></div>
      {loading?<SkeletonLoader count={3}/>:<div className="developer-grid">{developers.slice(0,3).map((d,i)=><DeveloperCard key={d.id} dev={d} index={i}/>)}</div>}
    </section>
    <section className="feature-band wrap"><div className="feature-copy"><div className="eyebrow">YOUR NEXT IDEA STARTS HERE</div><h2>Less searching.<br/><span>More building.</span></h2><p>Find a collaborator, publish a project write-up, and let AI help you turn rough notes into a clear story.</p><Link to="/signup" className="button button-primary">Join the network <ArrowRight size={16}/></Link></div><div className="feature-list"><div><span className="feature-icon"><Search/></span><span><b>Discover with context</b><small>Search by name, company, and technology.</small></span><ArrowUpRight/></div><div><span className="feature-icon"><Sparkles/></span><span><b>Write with AI assistance</b><small>Turn your project notes into a polished description.</small></span><ArrowUpRight/></div><div><span className="feature-icon"><ShieldCheck/></span><span><b>Manage with confidence</b><small>Role-aware demo workspace for content editors.</small></span><ArrowUpRight/></div></div></section>
    <footer className="footer wrap"><Link className="brand" to="/"><span className="brand-mark"><Code2 size={19}/></span><span>Dev<span className="brand-accent">Directory</span></span></Link><span>Made for the builders of tomorrow.</span><span>© 2026 DevDirectory · Demo platform</span></footer>
  </main>;
}
