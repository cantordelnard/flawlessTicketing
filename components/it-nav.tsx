// components/it-nav.tsx
import Link from 'next/link'
import { signOutAction } from '@/app/actions'

export function ITNav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-6">
          <Link href="/it-dashboard" className="text-lg font-medium text-primary">
            IT Dashboard
          </Link>
          <Link href="/it-dashboard/tickets" className="text-lg font-medium text-gray-600 hover:text-gray-900">
            Tickets
          </Link>
        </div>
      </div>
    </nav>
  )
}