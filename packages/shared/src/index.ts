export interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedin_url?: string;
  generated_message?: string;
  status: 'draft' | 'approved' | 'sent';
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  name: string;
  role: string;
  company: string;
  linkedin_url?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface GenerateMessageRequest {
  name: string;
  role: string;
  company: string;
}

export interface GenerateMessageResponse {
  message: string;
} 