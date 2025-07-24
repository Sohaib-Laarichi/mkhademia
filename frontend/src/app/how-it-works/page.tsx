import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { 
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  CheckCircleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Comment ça marche - Mkhedmin.ma',
  description: 'Découvrez comment utiliser Mkhedmin.ma pour trouver des freelancers ou proposer vos services.',
};

const clientSteps = [
  {
    name: 'Décrivez votre projet',
    description: 'Détaillez vos besoins, votre budget et vos délais en quelques minutes.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Recevez des propositions',
    description: 'Les freelancers qualifiés vous contactent avec leurs propositions personnalisées.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Choisissez votre freelancer',
    description: 'Comparez les profils, consultez les avis et sélectionnez le candidat idéal.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Lancez votre projet',
    description: 'Collaborez directement avec votre freelancer et suivez l\'avancement.',
    icon: CheckCircleIcon,
  },
];

const freelancerSteps = [
  {
    name: 'Créez votre profil',
    description: 'Présentez vos compétences, votre portfolio et vos tarifs en détail.',
    icon: UserPlusIcon,
  },
  {
    name: 'Recherchez des projets',
    description: 'Parcourez les offres qui correspondent à vos compétences et intérêts.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Proposez vos services',
    description: 'Répondez aux demandes avec des propositions personnalisées et convaincantes.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Réalisez et facturez',
    description: 'Livrez votre travail de qualité et recevez vos paiements sécurisés.',
    icon: CurrencyDollarIcon,
  },
];

const features = [
  {
    name: 'Vérification des profils',
    description: 'Tous nos freelancers sont vérifiés pour garantir leur expertise et leur sérieux.',
    icon: CheckCircleIcon,
  },
  {
    name: 'Communication intégrée',
    description: 'Échangez directement via WhatsApp, email ou téléphone depuis la plateforme.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Système de notation',
    description: 'Consultez les avis clients pour choisir le freelancer qui vous convient.',
    icon: StarIcon,
  },
  {
    name: 'Support local',
    description: 'Notre équipe marocaine vous accompagne dans vos projets en français et arabe.',
    icon: HandRaisedIcon,
  },
];

const faqs = [
  {
    question: 'Comment puis-je être sûr de la qualité des freelancers ?',
    answer: 'Tous nos freelancers passent par un processus de vérification. Vous pouvez consulter leurs portfolios, leurs avis clients et leurs certifications avant de faire votre choix.',
  },
  {
    question: 'Combien coûte l\'utilisation de la plateforme ?',
    answer: 'L\'inscription et la recherche de freelancers sont entièrement gratuites. Nous ne prenons aucune commission sur les projets.',
  },
  {
    question: 'Comment se déroulent les paiements ?',
    answer: 'Les paiements se font directement entre vous et le freelancer. Nous recommandons d\'utiliser des méthodes sécurisées et de définir des jalons de paiement.',
  },
  {
    question: 'Que faire en cas de problème avec un freelancer ?',
    answer: 'Notre équipe support est disponible pour vous aider à résoudre tout conflit. Nous proposons également un système de médiation.',
  },
  {
    question: 'Puis-je travailler avec des freelancers de toutes les villes du Maroc ?',
    answer: 'Absolument ! Notre plateforme connecte des freelancers de tout le Maroc. Beaucoup travaillent à distance, mais vous pouvez aussi filtrer par localisation.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Comment ça marche ?
              </h1>
              <p className="mt-4 text-xl text-brand-100 max-w-3xl mx-auto">
                Découvrez comment Mkhedmin.ma simplifie la collaboration entre 
                entreprises et freelancers au Maroc.
              </p>
            </div>
          </div>
        </div>

        {/* Client Process */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pour les entreprises
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez le freelancer idéal pour votre projet en 4 étapes simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientSteps.map((step, index) => (
              <div key={step.name} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < clientSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="h-0.5 bg-gray-200 -translate-x-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Publier un projet
            </a>
          </div>
        </div>

        {/* Freelancer Process */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pour les freelancers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Développez votre activité freelance et trouvez de nouveaux clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {freelancerSteps.map((step, index) => (
                <div key={step.name} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg">
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {step.name}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < freelancerSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <div className="h-0.5 bg-gray-200 -translate-x-1/2"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                Créer mon profil freelancer
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Mkhedmin.ma ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les avantages qui font de notre plateforme la référence au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-gray-600">
                Trouvez rapidement les réponses à vos questions.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Vous avez d&apos;autres questions ?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers d&apos;utilisateurs qui font confiance à Mkhedmin.ma 
                pour leurs projets digitaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  Créer un compte gratuit
                </a>
                <a
                  href="/freelancers"
                  className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-brand-700 transition-colors"
                >
                  Explorer les freelancers
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}