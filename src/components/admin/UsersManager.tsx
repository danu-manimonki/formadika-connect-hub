import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, PencilIcon, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    role: 'member'
  });
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching users...");
      const { data: authUsers, error: authError } = await supabase
        .from('profiles')
        .select('id, created_at');
      
      if (authError) {
        console.error("Error fetching profiles:", authError);
        throw authError;
      }

      console.log("Fetched profiles:", authUsers);

      // Get roles for each user
      const usersWithRoles = await Promise.all(
        authUsers.map(async (user) => {
          // Check if user has admin role using our RPC function
          const { data: isAdmin, error: roleError } = await supabase
            .rpc('has_role', { user_id: user.id, role: 'admin' });

          if (roleError) {
            console.error(`Error checking role for user ${user.id}:`, roleError);
          }

          // Get user email from auth.users via admin API 
          // (in a real app, this would be a server API call)
          let email = "Loading...";
          try {
            const { data: userData } = await supabase.auth.admin.getUserById(user.id);
            email = userData?.user?.email || "Unknown Email";
          } catch (error) {
            console.error(`Error getting user email for ${user.id}:`, error);
          }

          return {
            id: user.id,
            email: email,
            role: isAdmin ? 'admin' : 'member',
            created_at: user.created_at
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      // Add user - in a real application, this would likely involve
      // an admin-only API endpoint or edge function
      toast({
        title: "Feature Not Implemented",
        description: "Adding users directly is not implemented in this demo",
        variant: "default"
      });
      
      setIsAddDialogOpen(false);
      setFormData({ email: '', role: 'member' });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add user",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete user - in a real application, this would likely involve
      // an admin-only API endpoint or edge function
      toast({
        title: "Feature Not Implemented",
        description: "Deleting users is not implemented in this demo",
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    
    try {
      console.log(`Updating role for user ${selectedUser.id} to ${formData.role}`);

      // Delete existing roles first
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', selectedUser.id);
        
      if (deleteError) {
        console.error("Error deleting existing roles:", deleteError);
        throw deleteError;
      }

      // Insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: selectedUser.id, role: formData.role });
        
      if (insertError) {
        console.error("Error inserting new role:", insertError);
        throw insertError;
      }

      toast({
        title: "Success",
        description: `User role updated to ${formData.role}`,
      });

      setIsEditDialogOpen(false);
      fetchUsers(); // Refresh list
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      role: user.role
    });
    setIsEditDialogOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Management</CardTitle>
        <CardDescription>View and manage user accounts and roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3"
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <UserPlus size={16} />
            <span>Add User</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClick(user)}
                            disabled={currentUser?.id === user.id} // Prevent editing self
                            title={currentUser?.id === user.id ? "Cannot edit yourself" : "Edit user"}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={currentUser?.id === user.id} // Prevent deleting self
                            title={currentUser?.id === user.id ? "Cannot delete yourself" : "Delete user"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      {searchTerm ? "No users matching your search" : "No users found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and assign a role.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={formData.role}
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user role or information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={formData.email}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select 
                value={formData.role}
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
