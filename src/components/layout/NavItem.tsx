
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavItemProps = { 
  to: string; 
  label: string; 
  children?: React.ReactNode;
  dropdown?: boolean;
};

const NavItem = ({ to, label, children, dropdown = false }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (dropdown && children) {
    return (
      <div className="relative">
        <button
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-foreground/80 hover:text-formadika-teal transition-colors",
            isOpen && "text-formadika-teal"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label} <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className="px-3 py-2 text-foreground/80 hover:text-formadika-teal transition-colors"
    >
      {label}
    </Link>
  );
};

export default NavItem;
