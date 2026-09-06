"use client";
import { Button } from "@/components/ui/button";
import { SCIInput } from "@/components/sci-input";
import { register } from "@/lib/account-api";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SCIForm } from "@/components/sci-form";


export default function RegisterPage() {
  useProtectedRoute();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { checkAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageDetails, setErrorMessageDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setErrorMessageDetails('');
    
    try {
      await register({ userName, email, password, passwordConfirm });
      setErrorMessage('');
      setErrorMessageDetails('');
      
      // Attendre un peu pour que sessionStorage soit mis à jour
      setTimeout(() => {
        checkAuth();
      }, 100);
    } catch (error:any) {
      console.error('Error during register:', error);
      setErrorMessage(error.message || 'Une erreur est survenue lors de l\'inscription.');
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
    <SCIForm title="Inscription" onSubmit={handleRegister} errorMessage={errorMessage} errorMessageDetails={errorMessageDetails}>
      <SCIInput
        type="text"
        autoComplete="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Nom d'utilisateur"
      />
      <SCIInput
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <SCIInput
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <SCIInput
        type="password"
        autoComplete="new-password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirmer le mot de passe"
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
        {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
      </Button>
    </SCIForm>
    );
}