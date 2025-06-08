import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Login',
}

export default async function Page() {
  const supabase = createServerClient(cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard/recruteur')
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
