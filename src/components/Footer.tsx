export default function Footer() {
  return (
    <footer className="bg-gray-100 px-6 py-10 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-3">Candidéo</h3>
          <p>Recherchez et trouvez les bons profils facilement grâce à nos préqualifications RH sur mesure.</p>
          <p className="mt-4 font-semibold">📞 +225 07 13 48 08 48</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">Accès rapide</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">À propos</a></li>
            <li><a href="#">Contactez-nous</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Candidats</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Tableau de bord</a></li>
            <li><a href="#">Offres d’emploi</a></li>
            <li><a href="#">Mon abonnement</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Entreprises</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Poster une offre</a></li>
            <li><a href="#">Liste de candidats</a></li>
            <li><a href="#">Shortlists</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        ©2025 Candidéo. Tous droits réservés.
      </div>
    </footer>
  );
}
