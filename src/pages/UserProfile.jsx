import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Building2, Globe2, Mail, MapPin } from 'lucide-react';
import { getDeveloper, getPostsByUser } from '../services/dataService';
import AlertBanner from '../components/AlertBanner';
export default function UserProfile(){
  const {id}=useParams();const [dev,setDev]=useState(null);const [posts,setPosts]=useState([]);const [error,setError]=useState('');const [loading,setLoading]=useState(true);
  async function load(){setLoading(true);setError('');try{const [d,p]=await Promise.all([getDeveloper(id),getPostsByUser(id)]);setDev(d);setPosts(p);}catch{setError('Could not load this profile. The developer may not exist or the network may be unavailable.');}finally{setLoading(false);}}
  useEffect(()=>{load();},[id]);
  if(loading)return <main className="wrap page-content"><div className="loading-panel">Loading developer profile…</div></main>;
  if(error||!dev)return <main className="wrap page-content"><AlertBanner message={error||'Developer not found.'} onRetry={load}/><Link className="text-link" to="/users"><ArrowLeft size={16}/> Back to directory</Link></main>;
  const initials=dev.name.split(' ').map(s=>s[0]).slice(0,2).join('');
  return <main className="wrap page-content"><Link className="text-link back-link" to="/users"><ArrowLeft size={16}/> Back to directory</Link><section className="profile-hero"><div className="avatar avatar-violet profile-avatar">{initials}</div><div className="profile-main"><div className="eyebrow">DEVELOPER PROFILE</div><h1>{dev.name}</h1><p>{dev.company?.name||'Independent Developer'} · Software Developer</p><div className="profile-contact"><span><Mail size={15}/>{dev.email}</span><span><MapPin size={15}/>{dev.address?.city}</span><span><Globe2 size={15}/>{dev.website}</span></div></div><Link to="/add-post" className="button button-primary">Publish a post <ArrowUpRight size={16}/></Link></section>
    <div className="profile-columns"><section className="panel"><div className="panel-title"><h2>About</h2><Building2 size={18}/></div><p className="body-copy">{dev.name} is part of the DevDirectory network. Connect to explore their work, exchange ideas, and collaborate on projects.</p><h3>Contact details</h3><p className="body-copy">{dev.address?.street}, {dev.address?.city}</p><p className="body-copy">{dev.company?.catchPhrase||'Building useful things with technology.'}</p></section><section className="panel"><div className="panel-title"><h2>Published articles</h2><span className="count-badge">{posts.length}</span></div>{posts.length?posts.slice(0,6).map(p=><article className="post-item" key={p.id}><div><h3>{p.title}</h3><p>{p.body}</p></div><ArrowUpRight size={16}/></article>):<p className="body-copy">No articles have been published yet.</p>}</section></div>
  </main>;
}
