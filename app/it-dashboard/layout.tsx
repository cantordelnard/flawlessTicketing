// app/it-dashboard/layout.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOutAction } from '@/app/actions'
import { ITNav } from '@/components/it-nav'

export default async function ITLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Verify IT role
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'IT') {
      return redirect('/sign-in?error=IT access required')
    }
  } else {
    return redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ITNav />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}