
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManager from "./EventsManager";
import ArticlesManager from "./ArticlesManager";
import UsersManager from "./UsersManager";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="events">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <EventsManager />
        </TabsContent>
        <TabsContent value="articles">
          <ArticlesManager />
        </TabsContent>
        <TabsContent value="users">
          <UsersManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
