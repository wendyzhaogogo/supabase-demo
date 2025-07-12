import { Metadata } from 'next'
import { LeadsPage } from '@/components/pages/LeadsPage'

export const metadata: Metadata = {
  title: 'AI Lead Builder - Dashboard',
  description: 'Manage your leads and generate AI-powered LinkedIn outreach messages',
  keywords: ['leads', 'CRM', 'AI', 'LinkedIn', 'outreach', 'sales'],
}

// This page will be statically generated at build time but hydrate on client
export default function HomePage() {
  return <LeadsPage />
}
