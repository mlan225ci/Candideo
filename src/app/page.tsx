'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function HomePage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');

      if (error) {
        console.error('Erreur chargement categories', error);
      } else {
        setCategories(data ?? []);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-green-50 py-16 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trouvez le bon profil <br />
            <span className="text-green-600">Accélérez votre recrutement</span>
          </h1>
          <p className="text-gray-700 mb-6">
            Parcourez plus de 3000 profils qui ont déjà subi un entretien préliminaire avec nos experts RH.
            Des profils qui correspondent à vos exigences en termes de compétences, d’expérience et de motivation.
            Gagnez un temps précieux et recrutez en toute confiance grâce à une présélection rigoureuse.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <select className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto">
              <option>Domaine d’activité</option>
              <option>Développement</option>
              <option>Marketing</option>
              <option>Comptabilité</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto">
              <option>Années d’expérience</option>
              <option>1 an</option>
              <option>2 à 5 ans</option>
              <option>5+ ans</option>
            </select>
            <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition">
              Trouver des profils
            </button>
          </div>
        </div>

        <div>
          <Image src="/illustrations/recruteur.png" alt="recruteur" width={400} height={400} />
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="py-14 px-6">
        <h2 className="text-2xl font-bold mb-6">Parcourir les profils par catégories</h2>
        <p className="text-gray-600 mb-6">Trouvez les meilleurs profils rapidement</p>
        {categories.length === 0 ? (
          <p>zero resultat.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-gray-100 text-center p-4 rounded-md shadow-sm text-sm">
                {cat.name}
                <p className="text-xs text-gray-500 mt-1">0 candidat</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="bg-gray-900 text-white py-12 px-6 grid grid-cols-2 md:grid-cols-4 text-center gap-4">
        <div>
          <h3 className="text-3xl font-bold">1.4M+</h3>
          <p className="text-sm">Candidats</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">150+</h3>
          <p className="text-sm">Catégories de profils</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">156K+</h3>
          <p className="text-sm">Entreprises</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">812+</h3>
          <p className="text-sm">Offres d’emploi</p>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-10">Pourquoi choisir Candidéo ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-md shadow-sm">
            <h3 className="font-semibold mb-2">Gain de temps</h3>
            <p className="text-gray-600">Nos experts s’occupent de la présélection pour vous.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-md shadow-sm">
            <h3 className="font-semibold mb-2">Profils vérifiés</h3>
            <p className="text-gray-600">Chaque candidat est évalué avant d’être proposé.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-md shadow-sm">
            <h3 className="font-semibold mb-2">Accompagnement</h3>
            <p className="text-gray-600">Un suivi personnalisé tout au long de votre recrutement.</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-6 bg-green-50">
        <h2 className="text-2xl font-bold text-center mb-10">Ils nous font confiance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Marie', text: 'Grâce à Candidéo, nous avons recruté un développeur en une semaine !' },
            { name: 'Jean', text: 'Les profils sont vraiment qualifiés, un gain de temps incroyable.' },
            { name: 'Fatou', text: 'Un service client réactif et professionnel, je recommande.' },
          ].map((t) => (
            <div key={t.name} className="bg-white p-6 rounded-md shadow">
              <p className="italic mb-2">"{t.text}"</p>
              <p className="font-semibold text-green-700">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 text-center bg-green-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Prêt à trouver le profil idéal ?</h2>
        <p className="mb-8">Créez votre compte entreprise et publiez votre annonce.</p>
        <a
          href="/rendez-vous"
          className="bg-white text-green-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Commencer
        </a>
      </section>
    </main>
  );
}
