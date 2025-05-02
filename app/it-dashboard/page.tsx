// app/it-dashboard/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ITDashboard() {
  const supabase = createClient()
  const [ticketStats, setTicketStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0
  })

  useEffect(() => {
    const fetchTicketStats = async () => {
      const { count: open } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' })
        .eq('status', 'Open')

      const { count: inProgress } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' })
        .eq('status', 'In Progress')

      const { count: resolved } = await supabase
        .from('tickets')
        .select('*', { count: 'exact' })
        .eq('status', 'Resolved')

      setTicketStats({
        open: open || 0,
        inProgress: inProgress || 0,
        resolved: resolved || 0
      })
    }

    fetchTicketStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">IT Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{ticketStats.open}</div>
            <Button asChild className="mt-4">
              <Link href="/it-dashboard/tickets?status=Open">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{ticketStats.inProgress}</div>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/it-dashboard/tickets?status=In Progress">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{ticketStats.resolved}</div>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/it-dashboard/tickets?status=Resolved">View All</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}