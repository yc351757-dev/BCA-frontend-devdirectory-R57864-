import { AlertCircle, X, RotateCw } from 'lucide-react';
export default function AlertBanner({ message, onRetry, onDismiss }) {
  if (!message) return null;
  return <div className="alert-banner" role="alert"><AlertCircle size={18}/><span>{message}</span>{onRetry && <button className="alert-retry" onClick={onRetry}><RotateCw size={14}/> Retry</button>}{onDismiss && <button className="icon-button" onClick={onDismiss} aria-label="Dismiss"><X size={16}/></button>}</div>;
}
