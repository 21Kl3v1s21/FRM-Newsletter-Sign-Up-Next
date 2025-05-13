// types/newsletter.d.ts
export interface NewsletterFormProps {
  initialEmail?: string;
  onSuccess?: () => void;
}

export interface NewsletterResponse {
  success: boolean;
  message?: string;
}