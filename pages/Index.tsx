
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Admin Setup</h1>
        <p>Create your admin account to get started</p>
        <Button onClick={() => navigate('/auth')}>
          Create Admin Account
        </Button>
      </div>
    </div>
  );
}
