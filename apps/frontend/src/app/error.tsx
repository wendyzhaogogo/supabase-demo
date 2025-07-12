'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">出错了</h1>
          <p className="text-gray-600">
            应用程序遇到了一个错误，请稍后重试。
          </p>
        </div>
        
        <div className="mb-6">
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              错误详情
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={reset}
            className="w-full"
          >
            重试
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
} 