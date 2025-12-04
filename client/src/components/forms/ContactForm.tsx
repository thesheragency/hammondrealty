import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required').max(5000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  formId?: number | string;
  title?: string;
  description?: string;
  className?: string;
  fieldMapping?: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  };
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function ContactForm({ 
  formId = 1, 
  title = 'Contact Us',
  description = 'Fill out the form below and we\'ll get back to you as soon as possible.',
  className,
  fieldMapping = {
    name: 'input_1',
    email: 'input_2',
    subject: 'input_3',
    message: 'input_4',
  },
  onSuccess,
  onError,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const formData: Record<string, string> = {
        [fieldMapping.name]: values.name,
        [fieldMapping.email]: values.email,
        [fieldMapping.message]: values.message,
      };
      
      if (fieldMapping.subject && values.subject) {
        formData[fieldMapping.subject] = values.subject;
      }

      const response = await apiRequest('POST', `/api/gravity-forms/${formId}/submit`, formData);
      return response.json();
    },
    onSuccess: (result) => {
      if (result.is_valid) {
        setSubmitted(true);
        const message = result.confirmation_message?.replace(/<[^>]*>/g, '') || 'Thank you for your message! We\'ll be in touch soon.';
        setConfirmationMessage(message);
        form.reset();
        onSuccess?.();
      } else if (result.validation_messages) {
        Object.entries(result.validation_messages).forEach(([fieldId, message]) => {
          const fieldName = Object.entries(fieldMapping).find(([_, inputId]) => inputId === `input_${fieldId}`)?.[0];
          if (fieldName) {
            form.setError(fieldName as keyof ContactFormValues, { message: message as string });
          }
        });
      }
    },
    onError: (error: Error) => {
      console.error('Form submission error:', error);
      onError?.(error);
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    submitMutation.mutate(values);
  };

  if (submitted && confirmationMessage) {
    return (
      <Card className={className}>
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg">{confirmationMessage}</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSubmitted(false);
                setConfirmationMessage(null);
              }}
              data-testid="button-submit-another"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle data-testid="text-form-title">{title}</CardTitle>
        <CardDescription data-testid="text-form-description">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="[email protected]" 
                      {...field} 
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="What's this about?" 
                      {...field} 
                      data-testid="input-subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your message..." 
                      rows={5}
                      {...field} 
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={submitMutation.isPending}
              className="w-full sm:w-auto"
              data-testid="button-submit-form"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>

            {submitMutation.isError && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>There was an error sending your message. Please try again.</span>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
