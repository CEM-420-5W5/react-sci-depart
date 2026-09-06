"use client";
import { Button } from "@/components/ui/button";
import { SCIInput } from "@/components/sci-input";
import { login } from "@/lib/account-api";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SCIForm } from "@/components/sci-form";


export default function LoginPage() {
  useProtectedRoute();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { checkAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageDetails, setErrorMessageDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setErrorMessageDetails('');
    
    try {
      const result = await login({ userName, password });
      setErrorMessage('');
      setErrorMessageDetails('');
        
      // Attendre un peu pour que sessionStorage soit mis à jour
      setTimeout(() => {
        checkAuth();
      }, 100);
    } catch (error:any) {
      console.error('Error during login:', error);
      setErrorMessage(error.message || 'Une erreur est survenue lors de la connexion.');
      let errorDetails = error.response?.data?.error;
      if(errorDetails){
        if (typeof errorDetails === 'string') {
          setErrorMessageDetails(errorDetails);
        }
        else if(Array.isArray(errorDetails)){
          setErrorMessageDetails(errorDetails.map(e => e.description).join(' '));
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (  
    <SCIForm title="Connexion" onSubmit={handleLogin} errorMessage={errorMessage} errorMessageDetails={errorMessageDetails}>
      <SCIInput
        type="text"
        autoComplete="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Nom d'utilisateur"
        required
      />
      <SCIInput
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      
      <Button 
        type="submit"
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </Button>
      
    </SCIForm>   
  );
}