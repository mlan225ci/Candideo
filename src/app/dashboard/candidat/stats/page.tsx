'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

export default function StatsPage() {
  const [stats, setStats] = useState<any | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchStats() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('stats').select('*').eq('user_id', user.id).single()
      setStats(data)
    }
    fetchStats()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mes stats</h1>
      {stats ? <pre>{JSON.stringify(stats, null, 2)}</pre> : <p>Chargement...</p>}
    </div>
  )
}
