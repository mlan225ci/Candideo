import Link from 'next/link'

export default function RecruteurDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord recruteur</h1>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard/recruteur/offres" className="text-blue-600 hover:underline">Gérer les offres</Link>
        <Link href="/dashboard/recruteur/shortlists" className="text-blue-600 hover:underline">Voir les shortlists</Link>
        <Link href="/dashboard/recruteur/abonnement" className="text-blue-600 hover:underline">Mon abonnement</Link>
        <Link href="/dashboard/recruteur/alertes" className="text-blue-600 hover:underline">Mes alertes</Link>
      </nav>
    </div>
  )
}
