import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
export default function NotFound(){return <main className="wrap page-content not-found"><SearchX size={38}/><div className="eyebrow">404 · PAGE NOT FOUND</div><h1>Looks like this path <span>doesn’t exist.</span></h1><p>The page may have moved, or the URL might be incorrect.</p><Link className="button button-primary" to="/"><ArrowLeft size={16}/> Back to home</Link></main>;}
