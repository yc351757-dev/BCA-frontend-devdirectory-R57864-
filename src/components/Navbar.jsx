import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Code2, Moon, Sun, Plus, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return <header className="topbar"><Link className="brand" to="/"><span className="brand-mark"><Code2 size={21}/></span><span>Dev<span className="brand-accent">Directory</span><small>THE ENGINEERING NETWORK</small></span></Link>
    <nav className="nav-links"><NavLink to="/">Overview</NavLink><NavLink to="/users">Developers</NavLink>{user && <NavLink to="/add-post">Publish</NavLink>}{user?.role === 'admin' && <NavLink to="/admin"><ShieldCheck size={15}/> Admin</NavLink>}</nav>
    <div className="nav-actions"><button className="icon-button" aria-label="Toggle theme" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
      {user ? <><span className="user-pill"><span className="online-dot"/>{user.displayName}</span><button className="button button-ghost button-small" onClick={() => {logout();navigate('/');}}><LogOut size={15}/> Sign out</button></> : <Link className="button button-primary button-small" to="/login"><LogIn size={15}/> Sign in</Link>}
    </div>
  </header>;
}
