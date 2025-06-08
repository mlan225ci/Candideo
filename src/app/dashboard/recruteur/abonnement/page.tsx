'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

interface PlanInfo {
  name: string
  price: string
  features: string[]
  checkoutUrl: string
  key: string
}

const PLANS: PlanInfo[] = [
  {
    name: 'Basic',
    price: 'Gratuit',
    checkoutUrl: '#',
    key: 'basic',
    features: [
      '1 offre active',
      'Accès limité aux candidats',
      'Support par email',
    ],
  },
  {
    name: 'Standard',
    price: '29€ / mois',
    checkoutUrl: '#',
    key: 'standard',
    features: [
      '5 offres actives',
      'Accès complet aux candidats',
      'Support prioritaire',
    ],
  },
  {
    name: 'Premium',
    price: '59€ / mois',
    checkoutUrl: '#',
    key: 'premium',
    features: [
      'Offres illimitées',
      'Mises en avant personnalisées',
      'Support dédié',
    ],
  },
]

export default function Abonnement() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .single()
      if (data?.plan) setCurrentPlan(data.plan)
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">💳 Abonnement</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`space-y-4 rounded-md border p-4 ${
              currentPlan === plan.key ? 'border-green-600' : ''
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="font-bold">{plan.price}</p>
            </div>
            <ul className="list-inside list-disc space-y-1">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {currentPlan === plan.key ? (
              <span className="inline-block rounded-md bg-green-600 px-4 py-2 text-white">
                Plan actif
              </span>
            ) : (
              <a
                href={plan.checkoutUrl}
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Choisir
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
