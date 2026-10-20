import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Building2 } from 'lucide-react';
const colors = ['violet','blue','mint','orange','pink'];
export default function DeveloperCard({ dev, index = 0 }) {
  const initials = (dev.name || 'Dev').split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase();
  return <article className="developer-card">
    <div className="card-top"><div className={`avatar avatar-${colors[index % colors.length]}`}>{initials}</div><span className="availability"><i/> {dev.availability || 'Open to offers'}</span><Link className="round-arrow" to={`/users/${dev.id}`} aria-label={`View ${dev.name}`}><ArrowUpRight size={17}/></Link></div>
    <h3>{dev.name}</h3><p className="dev-role">{dev.role || 'Software Developer'}</p>
    <div className="dev-meta"><span><Building2 size={14}/>{dev.company?.name || 'Independent'}</span><span><MapPin size={14}/>{dev.address?.city || 'Remote'}</span></div>
    <div className="tag-row">{(dev.skills || ['Engineering','Open source']).slice(0,3).map(s=><span className="tag" key={s}>{s}</span>)}</div>
    <Link className="card-link" to={`/users/${dev.id}`}>View profile <ArrowUpRight size={15}/></Link>
  </article>;
}
