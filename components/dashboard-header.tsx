// components/dashboard-header.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export async function DashboardHeader() {
  const supabase = createClient()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/sign-in')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/clinic-dashboard" className="text-xl font-bold text-primary">
          Clinic Dashboard
        </Link>
        <form action={signOut}>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Sign Out
          </button>
        </form>
      </div>
    </header>
  )
}