export interface GenerateMessageInput {
  name: string;
  role: string;
  company: string;
}

export interface GenerateMessageResponse {
  success: boolean;
  data: {
    message: string;
    success: boolean;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // 在生产环境中使用部署的serverless API，在开发环境中使用本地API
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://ai-serverless.vercel.app' 
        : 'http://localhost:3001');
  }

  async generateMessage(input: GenerateMessageInput): Promise<GenerateMessageResponse> {
    const response = await fetch(`${this.baseUrl}/api/generate-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mock-data': 'true',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate message: ${response.statusText}`);
    }

    return response.json();
  }

  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/api/health`);

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService(); 