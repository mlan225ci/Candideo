import AuthButton from '@/components/AuthButton'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Login',
}

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 px-4">
      <AuthButton />
      <div className="w-full max-w-md mt-8">
        <LoginForm />
      </div>
    </div>
  )
}
