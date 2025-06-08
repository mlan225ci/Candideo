'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/utils/supabase';

type Candidat = {
  id: string;
  nom: string;
  prenom: string;
  ville: string;
  titre_professionnel: string;
};

export default function ListeCandidats() {
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchCandidats() {
      const { data, error } = await supabase
        .from('candidats')
        .select('id, nom, prenom, ville, titre_professionnel');

      if (error) console.error('Erreur chargement candidats', error);
      else setCandidats(data);
    }

    fetchCandidats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📁 Candidats préqualifiés</h1>
      {candidats.length === 0 ? (
        <p>Aucun candidat disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidats.map((candidat) => (
            <div key={candidat.id} className="border rounded-md p-4 shadow-sm">
              <h2 className="text-xl font-semibold">
                {candidat.prenom} {candidat.nom}
              </h2>
              <p className="text-gray-600">{candidat.titre_professionnel}</p>
              <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
              <a
                href={`/dashboard/recruteur/candidats/${candidat.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Voir la fiche →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
