'use client'

import { useState, useEffect } from 'react'
import { Lead, LeadFormData } from '@supabase-demo/shared'
import { LeadForm } from '@/components/forms/lead-form'
import { LeadsTable } from '@/components/tables/leads-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { apiService } from '@/lib/api'

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatingLeadId, setGeneratingLeadId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // API service for AI message generation

  // Fetch leads from Supabase on component mount
  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Failed to fetch leads:', error)
        setLeads([])
      } else {
        setLeads(data || [])
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      setLeads([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateLead = async (formData: LeadFormData) => {
    setIsSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          linkedin_url: formData.linkedin_url || null,
          status: 'draft' as const,
          generated_message: null,
        }])
        .select()
        .single()

      if (error) {
        console.error('Failed to create lead:', error)
        alert('Failed to create lead. Please try again.')
      } else {
        setLeads(prev => [data, ...prev])
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error creating lead:', error)
      alert('Error creating lead. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateMessage = async (leadId: string) => {
    const lead = leads.find(l => l.id === leadId)
    if (!lead) return

    setGeneratingLeadId(leadId)
    try {
      // Use REST API to generate message
      const result = await apiService.generateMessage({
        name: lead.name,
        role: lead.role,
        company: lead.company,
      })

      if (result.success && result.data.message) {
        // Update the lead with the generated message in Supabase
        const { data, error } = await supabase
          .from('leads')
                  .update({
          generated_message: result.data.message,
          updated_at: new Date().toISOString(),
        })
          .eq('id', lead.id)
          .select()
          .single()

        if (error) {
          console.error('Failed to update lead with generated message:', error)
          alert('Generated message but failed to save. Please try again.')
        } else {
          // Update local state
          setLeads(prev => prev.map(l => 
            l.id === lead.id ? data : l
          ))
        }
      }
    } catch (error) {
      console.error('Error generating message:', error)
      alert('Failed to generate message. Please try again.')
    } finally {
      setGeneratingLeadId(null)
    }
  }

  const handleUpdateStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId)
        .select()
        .single()

      if (error) {
        console.error('Failed to update status:', error)
        alert('Failed to update status. Please try again.')
      } else {
        setLeads(prev => prev.map(lead => 
          lead.id === leadId ? data : lead
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error updating status. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Lead Builder</h1>
          <p className="mt-2 text-gray-600">
            Generate personalized LinkedIn outreach messages for your leads
          </p>
        </div>

        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <LeadForm 
              onSubmit={handleCreateLead} 
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            Loading leads...
          </div>
        ) : (
          <LeadsTable
            leads={leads}
            onGenerateMessage={handleGenerateMessage}
            onUpdateStatus={handleUpdateStatus}
            isGenerating={generatingLeadId}
          />
        )}
      </div>
    </div>
  )
} 