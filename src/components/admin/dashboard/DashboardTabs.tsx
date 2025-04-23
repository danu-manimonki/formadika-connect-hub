
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users, Image, List, MessageSquare, ContactIcon, DollarSign } from "lucide-react";
import EventsManager from "../EventsManager";
import ArticlesManager from "../ArticlesManager";
import UsersManager from "../UsersManager";
import GalleryManager from "../GalleryManager";
import MembersManager from "../MembersManager";
import ContactManager from "../ContactManager";
import DonationManager from "../DonationManager";
import ForumManager from "../ForumManager";
import CommitteeManager from "../CommitteeManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="committee" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-9 mb-8">
        <TabsTrigger value="committee" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Pengurus</span>
        </TabsTrigger>
        <TabsTrigger value="events" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span className="hidden md:inline">Kegiatan</span>
        </TabsTrigger>
        <TabsTrigger value="gallery" className="flex items-center gap-1">
          <Image className="h-4 w-4" />
          <span className="hidden md:inline">Galeri</span>
        </TabsTrigger>
        <TabsTrigger value="members" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Anggota & Alumni</span>
        </TabsTrigger>
        <TabsTrigger value="memberlist" className="flex items-center gap-1">
          <List className="h-4 w-4" />
          <span className="hidden md:inline">Daftar Anggota</span>
        </TabsTrigger>
        <TabsTrigger value="articles" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Artikel</span>
        </TabsTrigger>
        <TabsTrigger value="forum" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden md:inline">Forum</span>
        </TabsTrigger>
        <TabsTrigger value="contact" className="flex items-center gap-1">
          <ContactIcon className="h-4 w-4" />
          <span className="hidden md:inline">Kontak</span>
        </TabsTrigger>
        <TabsTrigger value="donation" className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span className="hidden md:inline">Donasi</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="committee">
        <CommitteeManager />
      </TabsContent>
      <TabsContent value="events">
        <EventsManager />
      </TabsContent>
      <TabsContent value="gallery">
        <GalleryManager />
      </TabsContent>
      <TabsContent value="members">
        <MembersManager />
      </TabsContent>
      <TabsContent value="memberlist">
        <UsersManager />
      </TabsContent>
      <TabsContent value="articles">
        <ArticlesManager />
      </TabsContent>
      <TabsContent value="forum">
        <ForumManager />
      </TabsContent>
      <TabsContent value="contact">
        <ContactManager />
      </TabsContent>
      <TabsContent value="donation">
        <DonationManager />
      </TabsContent>
    </Tabs>
  );
}
