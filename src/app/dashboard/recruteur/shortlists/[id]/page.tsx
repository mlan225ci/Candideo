interface Params {
  params: { id: string }
}

export default function ShortlistDetails({ params }: Params) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Détail de la shortlist {params.id}</h1>
      <p>Contenu de la shortlist à venir.</p>
    </div>
  )
}
