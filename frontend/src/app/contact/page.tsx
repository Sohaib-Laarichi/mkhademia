import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContactForm from '@/components/contact/contact-form';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Contact - Mkhedmin.ma',
  description: 'Contactez-nous pour toute question ou demande d\'information sur Mkhedmin.ma',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Contactez-nous
              </h1>
              <p className="mt-4 text-xl text-brand-100 max-w-2xl mx-auto">
                Une question ? Un problème ? Notre équipe est là pour vous aider.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Informations de contact
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600 mt-1">
                      123 Boulevard Mohammed V<br />
                      Casablanca, Maroc<br />
                      20000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:contact@mkhedmin.ma" className="hover:text-brand-600">
                        contact@mkhedmin.ma
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:support@mkhedmin.ma" className="hover:text-brand-600">
                        support@mkhedmin.ma
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+212522123456" className="hover:text-brand-600">
                        +212 5 22 12 34 56
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+212661234567" className="hover:text-brand-600">
                        +212 6 61 23 45 67 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Horaires d&apos;ouverture</h3>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>Lundi - Vendredi: 9h00 - 18h00</p>
                      <p>Samedi: 9h00 - 13h00</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-12 p-6 bg-brand-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Questions fréquentes
                </h3>
                <p className="text-gray-600 mb-4">
                  Consultez notre FAQ pour trouver des réponses rapides aux questions les plus courantes.
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
                >
                  Voir la FAQ →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Notre localisation
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                {/* Placeholder for map - in production, you'd use Google Maps or similar */}
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Carte interactive</p>
                    <p className="text-sm text-gray-400 mt-2">
                      123 Boulevard Mohammed V, Casablanca
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d&apos;aide immédiate ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe de support est disponible pour vous aider avec toute question 
              concernant votre compte, les paiements, ou l&apos;utilisation de la plateforme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/212661234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Support WhatsApp
              </a>
              <a
                href="/help"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Centre d&apos;aide
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}