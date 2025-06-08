
 'use client'
 
 import { useEffect, useState } from 'react'
 import Link from 'next/link'
 import { createBrowserClient } from '@/utils/supabase'
+import CandidateFilters, { Filters } from '@/components/CandidateFilters'
 
 interface Candidat {
   id: string
   nom: string
   prenom: string
   ville: string
   genre?: string | null
   age?: number | null
   titre_professionnel: string
+  pretention_salariale?: number | null
+  tags?: string[] | null
+  ecole_excellence?: boolean | null
+  diplome?: string | null
+  annees_experience?: number | null
+  bilingue?: boolean | null
+  a_etudie_etranger?: boolean | null
 }
 
 export default function CandidatsPage() {
   const supabase = createBrowserClient()
   const [candidats, setCandidats] = useState<Candidat[]>([])
-  const [keyword, setKeyword] = useState('')
-  const [ville, setVille] = useState('')
-  const [genre, setGenre] = useState('')
-  const [age, setAge] = useState('')
+  const [loading, setLoading] = useState(false)
+  const [filters, setFilters] = useState<Filters | null>(null)
 
-  const fetchCandidats = async () => {
+  const fetchCandidats = async (f: Filters | null = filters) => {
+    setLoading(true)
     let query = supabase
       .from('candidats')
-      .select('id, nom, prenom, ville, genre, age, titre_professionnel')
-
-    if (keyword) {
-      query = query.or(
-        `nom.ilike.%${keyword}%,prenom.ilike.%${keyword}%,titre_professionnel.ilike.%${keyword}%`,
+      .select(
+        'id, nom, prenom, ville, genre, age, titre_professionnel, pretention_salariale, tags, ecole_excellence, diplome, annees_experience, bilingue, a_etudie_etranger',
       )
+
+    if (f) {
+      const {
+        keyword,
+        ville,
+        categorie,
+        ecole_excellence,
+        genre,
+        age,
+        diplome,
+        annees_experience,
+        bilingue,
+        a_etudie_etranger,
+      } = f
+      if (keyword)
+        query = query.or(
+          `nom.ilike.%${keyword}%,prenom.ilike.%${keyword}%,titre_professionnel.ilike.%${keyword}%`,
+        )
+      if (ville) query = query.eq('ville', ville)
+      if (categorie) query = query.eq('categorie', categorie)
+      if (ecole_excellence) query = query.eq('ecole_excellence', true)
+      if (genre) query = query.eq('genre', genre)
+      if (age) query = query.eq('age', Number(age))
+      if (diplome) query = query.eq('diplome', diplome)
+      if (annees_experience)
+        query = query.eq('annees_experience', Number(annees_experience))
+      if (bilingue) query = query.eq('bilingue', true)
+      if (a_etudie_etranger) query = query.eq('a_etudie_etranger', true)
     }
-    if (ville) query = query.eq('ville', ville)
-    if (genre) query = query.eq('genre', genre)
-    if (age) query = query.eq('age', Number(age))
 
     const { data, error } = await query
-    if (error) console.error('Erreur chargement candidats', error)
-    else setCandidats(data || [])
+    if (!error) setCandidats(data || [])
+    else console.error('Erreur chargement candidats', error)
+    setLoading(false)
   }
 
   useEffect(() => {
     fetchCandidats()
     // eslint-disable-next-line react-hooks/exhaustive-deps
-  }, [keyword, ville, genre, age])
+  }, [])
 
   return (
-    <div className="p-6">
-      <h1 className="mb-4 text-2xl font-bold">Tous les candidats</h1>
-      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
-        <input
-          type="text"
-          placeholder="Mot-clé"
-          value={keyword}
-          onChange={(e) => setKeyword(e.target.value)}
-          className="rounded border px-3 py-2"
-        />
-        <input
-          type="text"
-          placeholder="Ville"
-          value={ville}
-          onChange={(e) => setVille(e.target.value)}
-          className="rounded border px-3 py-2"
-        />
-        <select
-          value={genre}
-          onChange={(e) => setGenre(e.target.value)}
-          className="rounded border px-3 py-2"
-        >
-          <option value="">Genre</option>
-          <option value="M">Homme</option>
-          <option value="F">Femme</option>
-        </select>
-        <input
-          type="number"
-          placeholder="Âge"
-          value={age}
-          onChange={(e) => setAge(e.target.value)}
-          className="rounded border px-3 py-2"
+    <div className="p-6 md:flex md:gap-6">
+      <aside className="mb-6 md:mb-0 md:w-1/4">
+        <CandidateFilters
+          onSearch={(f) => {
+            setFilters(f)
+            fetchCandidats(f)
+          }}
         />
-      </div>
-      {candidats.length === 0 ? (
-        <p>Aucun candidat trouvé.</p>
-      ) : (
-        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
-          {candidats.map((candidat) => (
-            <div
-              key={candidat.id}
-              className="rounded-md border bg-white p-4 shadow-sm"
-            >
-              <h2 className="text-xl font-semibold">
-                {candidat.prenom} {candidat.nom}
-              </h2>
-              <p className="text-gray-600">{candidat.titre_professionnel}</p>
-              <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
-              <Link
-                href={`/candidats/${candidat.id}`}
-                className="mt-2 inline-block text-blue-600 hover:underline"
+      </aside>
+      <section className="md:flex-1">
+        {loading ? (
+          <div className="flex justify-center py-10">
+            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
+          </div>
+        ) : candidats.length === 0 ? (
+          <p>Aucun candidat trouvé</p>
+        ) : (
+          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
+            {candidats.map((candidat) => (
+              <div
+                key={candidat.id}
+                className="rounded-md border bg-white p-4 shadow-sm"
               >
-                Voir la fiche →
-              </Link>
-            </div>
-          ))}
-        </div>
-      )}
+                <h2 className="text-xl font-semibold">
+                  {candidat.prenom} {candidat.nom}
+                </h2>
+                <p className="text-gray-600">{candidat.titre_professionnel}</p>
+                <p className="text-sm text-gray-500">📍 {candidat.ville}</p>
+                {candidat.tags && (
+                  <p className="mt-1 text-sm text-gray-500">
+                    {candidat.tags.join(', ')}
+                  </p>
+                )}
+                {typeof candidat.pretention_salariale === 'number' && (
+                  <p className="mt-1 text-sm text-gray-700">
+                    💰 {candidat.pretention_salariale} F CFA
+                  </p>
+                )}
+                {candidat.ecole_excellence && (
+                  <span className="mt-1 inline-block rounded bg-green-600 px-2 py-0.5 text-xs text-white">
+                    École d’excellence
+                  </span>
+                )}
+                <Link
+                  href={`/candidats/${candidat.id}`}
+                  className="mt-2 inline-block text-blue-600 hover:underline"
+                >
+                  Voir le candidat →
+                </Link>
+              </div>
+            ))}
+          </div>
+        )}
+      </section>
     </div>
   )
 }
