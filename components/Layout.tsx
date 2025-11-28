
import React from 'react';
import { Briefcase, BookOpen, User, PlusCircle, Home, LogOut, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Logo: React.FC<{ size?: number; className?: string; variant?: 'brand' | 'white' }> = ({ size = 40, className = '', variant = 'brand' }) => {
  const isWhite = variant === 'white';
  const grayFill = isWhite ? '#FFFFFF' : '#6b737e';
  const grayStroke = isWhite ? '#FFFFFF' : '#6c757e';
  const greenFill = isWhite ? '#FFFFFF' : '#2fb670';
  const greenStroke = isWhite ? '#FFFFFF' : '#2fb670';
  const textFill = isWhite ? '#FFFFFF' : '#2f2f2f';

  return (
    <svg 
      height={size} 
      viewBox="0 0 1659 605" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ height: size, width: 'auto' }}
      fillRule="evenodd" 
      clipRule="evenodd" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeMiterlimit="1.5"
    >
      <g id="Camada1">
        <g>
          <path d="M17.777,594.223l117.333,0.667l0,-423.333l192.667,180l309.333,-294.667l0,-42.667l-116.667,0l-193,193.333l-191.667,-193.333l-118,0l0,580Z" style={{fill:grayFill, stroke:grayStroke, strokeWidth:'1px'}}/>
          <path d="M520.277,594.889l-0.5,-206.714l117.333,-111.5l0,318.214l-116.833,0Z" style={{fill:grayFill, stroke:grayStroke, strokeWidth:'1px'}}/>
          <path d="M327.444,397.694l-157.167,-150l-0.5,126l157.667,150.5l534.833,-509.971l-94.037,0c-30.015,3.273 -50.581,12.846 -64.596,26.786l-376.201,356.685Z" style={{fill:greenFill, stroke:greenStroke, strokeWidth:'1px'}}/>
        </g>
        <g transform="matrix(8.082154,0,0,8.082154,-8407.109997,-2676.128872)">
          <text x="1151.944px" y="365.277px" style={{fontFamily:"'Haettenschweiler', sans-serif", fontSize:'46.275px', fill: textFill}}>Marca</text>
          <text x="1151.944px" y="404.286px" style={{fontFamily:"'Haettenschweiler', sans-serif", fontSize:'46.275px', fill: textFill}}>em dia</text>
        </g>
      </g>
    </svg>
  );
};

export const HeaderIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 872 605" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ height: size, width: 'auto' }}
      fillRule="evenodd" 
      clipRule="evenodd" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeMiterlimit="1.5"
    >
      <g id="Camada1">
        <g>
          <path d="M17.777,594.223l117.333,0.667l0,-423.333l192.667,180l309.333,-294.667l0,-42.667l-116.667,0l-193,193.333l-191.667,-193.333l-118,0l0,580Z" style={{fill:'#6b737e', stroke:'#6c757e', strokeWidth:'1px'}}/>
          <path d="M520.277,594.889l-0.5,-206.714l117.333,-111.5l0,318.214l-116.833,0Z" style={{fill:'#6b737e', stroke:'#6c757e', strokeWidth:'1px'}}/>
          <path d="M327.444,397.694l-157.167,-150l-0.5,126l157.667,150.5l534.833,-509.971l-94.037,0c-30.015,3.273 -50.581,12.846 -64.596,26.786l-376.201,356.685Z" style={{fill:'#2fb670', stroke:'#2fb670', strokeWidth:'1px'}}/>
        </g>
      </g>
    </svg>
  );
};

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex justify-center transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen shadow-xl relative flex flex-col transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, onLogout }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'processes', icon: Briefcase, label: 'Marcas' },
    { id: 'add', icon: PlusCircle, label: 'Novo', highlight: true },
    { id: 'education', icon: BookOpen, label: 'Aprender' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 px-4 shadow-lg z-50 transition-colors duration-300">
      <div className="flex justify-between items-end pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'
              } ${item.highlight ? '-mt-6' : ''}`}
            >
              <div
                className={`p-1 rounded-full ${
                  item.highlight
                    ? 'bg-brand-600 dark:bg-brand-500 text-white p-3 shadow-lg shadow-brand-500/40 mb-1'
                    : ''
                }`}
              >
                <Icon size={item.highlight ? 28 : 24} strokeWidth={item.highlight ? 2 : 2} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const Header: React.FC<{ 
  title: string; 
  showLogout?: boolean; 
  onLogout?: () => void;
  onChatClick?: () => void;
  unreadCount?: number;
}> = ({ title, showLogout, onLogout, onChatClick, unreadCount = 0 }) => (
  <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40 transition-colors duration-300">
    <div className="flex items-center gap-3">
      <Logo size={40} />
      {title !== 'Marca em Dia' && (
         <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight border-l border-gray-200 dark:border-slate-700 pl-3 ml-1">{title}</h1>
      )}
    </div>
    <div className="flex items-center gap-2">
      {onChatClick && (
        <button onClick={onChatClick} className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full dark:text-slate-400 dark:hover:bg-slate-800 transition-colors mr-1">
          <MessageSquare size={24} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
              {unreadCount}
            </span>
          )}
        </button>
      )}
      {showLogout && onLogout && (
        <button onClick={onLogout} className="text-gray-400 hover:text-red-500 ml-2">
          <LogOut size={20} />
        </button>
      )}
    </div>
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm p-4 transition-colors duration-300 ${className} ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}>
    {children}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', fullWidth = false, disabled, loading, className = '' }) => {
  const baseClasses = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex justify-center items-center gap-2";
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white active:bg-brand-800 disabled:bg-brand-300 dark:bg-brand-600 dark:hover:bg-brand-500",
    outline: "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 disabled:border-gray-300 disabled:text-gray-300 dark:border-brand-500 dark:text-brand-400 dark:hover:bg-slate-800 dark:disabled:border-slate-700 dark:disabled:text-slate-600",
    ghost: "text-brand-600 hover:bg-brand-50 disabled:text-gray-300 dark:text-brand-400 dark:hover:bg-slate-800 dark:disabled:text-slate-600"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
      ) : children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }> = ({ label, error, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-white mb-1 dark:text-slate-300">{label}</label>
    <input
      className={`w-full px-4 py-3 rounded-lg border ${
        error 
          ? 'border-red-500 bg-red-50 text-slate-900 dark:bg-red-900/20 dark:text-red-100' 
          : 'border-slate-600 bg-slate-700 text-white focus:border-brand-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-brand-400'
      } outline-none transition-colors placeholder-slate-400 ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);
