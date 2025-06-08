interface SearchPageProps {
  searchParams: {
    keyword?: string
    domain?: string
    experience?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword = '', domain = '', experience = '' } = searchParams

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Résultats de recherche</h1>
      <p className="mb-2 text-sm text-gray-700">Mot clé: {keyword}</p>
      <p className="mb-2 text-sm text-gray-700">Domaine d’activité: {domain}</p>
      <p className="mb-4 text-sm text-gray-700">Années d’expérience: {experience}</p>
      <p>Afficher les profils ici...</p>
    </div>
  )
}
