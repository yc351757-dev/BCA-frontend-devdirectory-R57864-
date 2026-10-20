import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Users, X } from 'lucide-react';
import { getDevelopers } from '../services/dataService';
import DeveloperCard from '../components/DeveloperCard';
import SkeletonLoader from '../components/SkeletonLoader';
import AlertBanner from '../components/AlertBanner';

export default function UserDirectory() {
  const [developers,setDevelopers]=useState([]);
  const [query,setQuery]=useState('');
  const [role,setRole]=useState('All roles');
  const [availability,setAvailability]=useState('All availability');
  const [sort,setSort]=useState('name');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  async function load(){setLoading(true);setError('');try{setDevelopers(await getDevelopers());}catch{setError('Could not load the directory. Check your connection and try again.');}finally{setLoading(false);}}
  useEffect(()=>{load();},[]);
  const roles=useMemo(()=>['All roles',...new Set(developers.map(d=>d.role))],[developers]);
  const filtered=useMemo(()=>developers.filter(d=>{
    const hay=[d.name,d.company?.name,d.email,d.role,...(d.skills||[])].join(' ').toLowerCase();
    return hay.includes(query.toLowerCase())&&(role==='All roles'||d.role===role)&&(availability==='All availability'||d.availability===availability);
  }).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):sort==='company'?(a.company?.name||'').localeCompare(b.company?.name||''):b.id-a.id),[developers,query,role,availability,sort]);
  return <main className="wrap page-content"><div className="page-intro"><div className="eyebrow">THE ENGINEERING NETWORK</div><h1>Developer <span>directory.</span></h1><p>Find the right people for your next idea. Search skills, teams, and technologies.</p></div>
    <div className="directory-toolbar"><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, company, skill..." aria-label="Search developers"/>{query&&<button className="icon-button" onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label><div className="select-wrap"><SlidersHorizontal size={16}/><select value={role} onChange={e=>setRole(e.target.value)} aria-label="Filter by role">{roles.map(r=><option key={r}>{r}</option>)}</select></div><select className="filter-select" value={availability} onChange={e=>setAvailability(e.target.value)} aria-label="Filter by availability"><option>All availability</option><option>Available</option><option>Open to offers</option></select><select className="filter-select" value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort developers"><option value="name">Sort: Name</option><option value="company">Sort: Company</option><option value="newest">Sort: ID</option></select></div>
    <div className="result-count"><span><b>{filtered.length}</b> developers found</span><span><i className="online-dot"/> Live directory demo</span></div>
    <AlertBanner message={error} onRetry={load} onDismiss={()=>setError('')}/>
    {loading?<SkeletonLoader/>:filtered.length?<div className="developer-grid">{filtered.map((d,i)=><DeveloperCard key={d.id} dev={d} index={i}/>)}</div>:<div className="empty-state"><Users size={28}/><h3>No developers found</h3><p>Try another search term or clear your filters.</p><button className="button button-secondary" onClick={()=>{setQuery('');setRole('All roles');setAvailability('All availability');}}>Clear filters</button></div>}
  </main>;
}
