
import { Link } from 'react-router-dom';

type DropdownItemProps = { 
  to: string; 
  label: string; 
  icon?: React.ReactNode;
};

const DropdownItem = ({ to, label, icon }: DropdownItemProps) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-formadika-50 hover:text-formadika-teal transition-colors"
  >
    {icon} {label}
  </Link>
);

export default DropdownItem;
