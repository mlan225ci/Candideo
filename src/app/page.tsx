'use client';

import Image from 'next/image';

export default function HomePage() {
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            "Communication", "Gestion de projet", "Informatique", "Secrétaires", "Comptabilité",
            "Commercial", "Ingénierie", "Marketing & Vente", "RH", "Contrôle de gestion",
            "Expatriés", "QHSE", "Bâtiment", "Travaux publics", "Bilingues"
          ].map((cat) => (
            <div key={cat} className="bg-gray-100 text-center p-4 rounded-md shadow-sm text-sm">
              {cat}
              <p className="text-xs text-gray-500 mt-1">0 candidat</p>
            </div>
          ))}
        </div>
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
    </main>
  );
}
