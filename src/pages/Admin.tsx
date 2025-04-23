
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simply redirect to dashboard
    navigate('/dashboard');
  }, [navigate]);

  return null; // This page will just redirect
}
