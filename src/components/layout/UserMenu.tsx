
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, UserPlus, Heart, UserCircle } from 'lucide-react';
import { RegularUser } from '@/types/database';

type UserMenuProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  regularUser: RegularUser | null;
  handleSignOut: () => void;
};

const UserMenu = ({ isLoggedIn, isAdmin, regularUser, handleSignOut }: UserMenuProps) => {
  return (
    <div className="ml-4 flex items-center gap-2">
      {isLoggedIn ? (
        <>
          {isAdmin ? (
            <Button 
              asChild 
              variant="default" 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/dashboard">Admin Dashboard</Link>
            </Button>
          ) : regularUser && (
            <Button 
              asChild 
              variant="default" 
              size="sm" 
              className="bg-formadika-teal hover:bg-formadika-teal/90 text-white"
            >
              <Link to="/user-dashboard">
                <UserCircle size={16} className="mr-1" /> 
                Dashboard
              </Link>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleSignOut}
          >
            <LogOut size={16} /> Keluar
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/login">
              <LogIn size={16} className="mr-1" /> Login
            </Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="flex items-center gap-1">
            <Link to="/register-user">
              <UserPlus size={16} className="mr-1" /> Daftar
            </Link>
          </Button>
        </>
      )}
      
      <Button asChild variant="default" size="sm" className="bg-formadika-gold hover:bg-formadika-gold/90 text-white">
        <Link to="/donate" className="flex items-center gap-1">
          <Heart size={16} className="mr-1" /> Donasi
        </Link>
      </Button>
    </div>
  );
};

export default UserMenu;
