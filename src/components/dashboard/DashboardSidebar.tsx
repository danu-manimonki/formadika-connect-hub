
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  User, 
  Users, 
  CalendarDays,
  BookOpenText, 
  Heart, 
  UserCog, 
  Image, 
  Mail, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  signOut: () => Promise<void>;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start text-left font-normal",
      active ? "bg-secondary" : "hover:bg-muted"
    )}
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </Button>
);

export default function DashboardSidebar({ 
  activeSection, 
  setActiveSection,
  signOut
}: DashboardSidebarProps) {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", value: "overview" },
    { icon: Users, label: "Pengurus", value: "committee" },
    { icon: CalendarDays, label: "Kegiatan", value: "events" },
    { icon: Image, label: "Galeri", value: "gallery" },
    { icon: User, label: "Anggota & Alumni", value: "members" },
    { icon: BookOpenText, label: "Artikel", value: "articles" },
    { icon: Mail, label: "Pesan", value: "messages" },
    { icon: Heart, label: "Donasi", value: "donations" },
    { icon: UserCog, label: "Profil Admin", value: "profile" },
  ];

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" alt="Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-sm font-medium">{user?.email}</p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.value}
            icon={item.icon}
            label={item.label}
            value={item.value}
            active={activeSection === item.value}
            onClick={() => setActiveSection(item.value)}
          />
        ))}
      </div>
      <div className="p-3 border-t">
        <Button variant="ghost" className="w-full justify-start text-left font-normal" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  );
}
