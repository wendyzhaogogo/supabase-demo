'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Lead } from '@supabase-demo/shared'
import { ExternalLink, MessageSquare, Edit3 } from 'lucide-react'

interface LeadsTableProps {
  leads: Lead[]
  onGenerateMessage: (leadId: string) => void
  onUpdateStatus: (leadId: string, status: Lead['status']) => void
  isGenerating?: string | null
}

export function LeadsTable({ 
  leads, 
  onGenerateMessage, 
  onUpdateStatus, 
  isGenerating 
}: LeadsTableProps) {
  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'approved':
        return <Badge variant="success">Approved</Badge>
      case 'sent':
        return <Badge variant="default">Sent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No leads found. Create your first lead to get started!
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lead
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lead.role}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lead.company}</div>
                {lead.linkedin_url && (
                  <a
                    href={lead.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    LinkedIn
                  </a>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(lead.status)}
              </td>
              <td className="px-6 py-4">
                {lead.generated_message ? (
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {lead.generated_message}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No message</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(lead.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {!lead.generated_message && (
                    <Button
                      size="sm"
                      onClick={() => onGenerateMessage(lead.id)}
                      disabled={isGenerating === lead.id}
                      className="flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {isGenerating === lead.id ? 'Generating...' : 'Generate'}
                    </Button>
                  )}
                  
                  {lead.generated_message && lead.status === 'draft' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(lead.id, 'approved')}
                      className="flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  
                  {lead.status === 'approved' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onUpdateStatus(lead.id, 'sent')}
                      className="flex items-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Mark Sent
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 