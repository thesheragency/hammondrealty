import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ContactForm } from '@/components/forms/ContactForm';
import { useToast } from '@/hooks/use-toast';

const CONTACT_FORM_ID = 1;

export default function Contact() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Message Sent',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description: 'There was a problem sending your message. Please try again.',
      variant: 'destructive',
    });
  };

  return (
    <Layout>
      <SeoHead
        title="Contact Us"
        description="Get in touch with us. We'd love to hear from you."
        canonical="/contact"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <ContactForm 
            formId={CONTACT_FORM_ID}
            title="Get in Touch"
            description="Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible."
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </Layout>
  );
}
