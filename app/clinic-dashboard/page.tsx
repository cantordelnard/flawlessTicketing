// app/clinic-dashboard/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function ClinicDashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [clinicId, setClinicId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  })

  // Fetch user's clinic ID
  useEffect(() => {
    const fetchClinicId = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Directly get clinic_id from users table
        const { data: userData } = await supabase
          .from('users')
          .select('clinic_id')
          .eq('id', user.id)
          .single()
        
        if (userData?.clinic_id) {
          setClinicId(userData.clinic_id)
        } else {
          console.error('No clinic_id found for user')
          toast.error('Your account is not associated with a clinic')
        }
      }
    }
    fetchClinicId()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Session expired. Please sign in again.')
        return router.push('/sign-in')
      }

      if (!clinicId) {
        toast.error('Your account is not associated with a clinic')
        return
      }

      const { error } = await supabase.from('tickets').insert({
        subject: formData.subject,
        description: formData.description,
        clinic_id: clinicId,
        status: 'Open',
        submitted_by: user.id,
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      toast.success('Ticket submitted successfully!')
      setFormData({ subject: '', description: '' })
    } catch (error) {
      toast.error('Failed to submit ticket')
      console.error('Submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Submit New Ticket</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject*</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          placeholder="Brief issue description"
          required
          minLength={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Detailed explanation"
          rows={5}
          required
          minLength={10}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : 'Submit Ticket'}
      </Button>
      </form>
    </div>
  )
}