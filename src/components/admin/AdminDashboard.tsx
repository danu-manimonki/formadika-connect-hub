import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Users, Image, List, MessageSquare, ContactIcon, DollarSign } from "lucide-react";
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventsManager from "./EventsManager";
import ArticlesManager from "./ArticlesManager";
import UsersManager from "./UsersManager";
import GalleryManager from "./GalleryManager";
import MembersManager from "./MembersManager";
import ContactManager from "./ContactManager"; 
import DonationManager from "./DonationManager";
import ForumManager from "./ForumManager";
import CommitteeManager from "./CommitteeManager";

// Sample data for charts
const areaData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 30000 },
  { name: 'Mar', value: 25000 },
  { name: 'Apr', value: 20000 },
  { name: 'May', value: 32000 },
  { name: 'Jun', value: 35000 },
];

const barData = [
  { month: 'Jan', count: 4000 },
  { month: 'Feb', count: 5000 },
  { month: 'Mar', count: 6000 },
  { month: 'Apr', count: 7500 },
  { month: 'May', count: 9000 },
  { month: 'Jun', count: 12000 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 p-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+4 bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kegiatan</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+8 bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donasi</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 15.4M</div>
            <p className="text-xs text-muted-foreground">+2.4M bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Pertumbuhan Anggota</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Aktivitas Kegiatan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Pengurus</CardTitle>
            </CardHeader>
            <CardContent>
              Coming soon: Manajemen data pengurus
            </CardContent>
          </Card>
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
    </div>
  );
}
