"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/utils/supabase";

export default function LoginForm() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const missingEnv =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (missingEnv) {
      setError('Configuration API manquante');
      return;
    }
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.push('/dashboard/recruteur');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-4">
        {isSignUp ? "Créer un compte" : "Se connecter"}
      </h1>
      {missingEnv && (
        <p className="text-red-600 mb-4 text-sm">
          Variables d'environnement Supabase manquantes.
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-md p-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition"
        >
          {isSignUp ? "Créer le compte" : "Se connecter"}
        </button>
      </form>
      <p className="text-sm mt-4">
        {isSignUp ? (
          <>
            Déjà inscrit ?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="text-green-600 hover:underline"
            >
              Se connecter
            </button>
          </>
        ) : (
          <>
            Pas encore de compte ?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="text-green-600 hover:underline"
            >
              S'inscrire
            </button>
          </>
        )}
      </p>
    </div>
  );
}
