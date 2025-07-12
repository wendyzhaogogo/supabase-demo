'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type LeadFormData } from '@supabase-demo/shared'

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void
  isSubmitting?: boolean
}

export function LeadForm({ onSubmit, isSubmitting = false }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    role: '',
    company: '',
    linkedin_url: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1"
          placeholder="Enter lead's name"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role *
        </label>
        <Input
          id="role"
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          required
          className="mt-1"
          placeholder="e.g., Marketing Manager"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company *
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          required
          className="mt-1"
          placeholder="Enter company name"
        />
      </div>

      <div>
        <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">
          LinkedIn URL (optional)
        </label>
        <Input
          id="linkedin_url"
          name="linkedin_url"
          type="url"
          value={formData.linkedin_url}
          onChange={handleChange}
          className="mt-1"
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating Lead...' : 'Create Lead'}
      </Button>
    </form>
  )
} 