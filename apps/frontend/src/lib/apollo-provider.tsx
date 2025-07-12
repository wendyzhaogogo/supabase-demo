'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo'

interface ApolloProviderWrapperProps {
  children: React.ReactNode
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
} 