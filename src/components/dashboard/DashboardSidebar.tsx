
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  PanelLeft,
  User, 
  Users, 
  CalendarDays,
  BookOpenText, 
  Heart, 
  UserCog, 
  Image, 
  Mail, 
  LayoutDashboard
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start text-left font-normal",
      active ? "bg-secondary" : "hover:bg-muted",
      collapsed ? "px-3" : "px-4"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    {!collapsed && <span className="ml-3">{label}</span>}
  </Button>
);

export default function DashboardSidebar({ 
  activeSection, 
  setActiveSection,
  collapsed,
  onToggle
}: DashboardSidebarProps) {
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
    <div className={cn(
      "border-r bg-card flex flex-col h-full transition-all duration-300",
      collapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <img 
            src="/lovable-uploads/fe16e809-d382-4b1a-9388-b91ae309c98a.png" 
            alt="Formadika Logo" 
            className="h-8"
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("ml-auto", collapsed && "rotate-180")}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
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
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
}
