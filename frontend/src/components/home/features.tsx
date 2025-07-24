import { 
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Freelancers vérifiés',
    description: 'Tous nos freelancers sont vérifiés avec leurs portfolios, références et compétences validées.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Réponse rapide',
    description: 'Recevez des propositions en moins de 24h. La plupart des freelancers répondent en quelques heures.',
    icon: ClockIcon,
  },
  {
    name: 'Tarifs transparents',
    description: 'Prix en dirhams marocains (MAD), tarifs négociables et paiement sécurisé.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Support local',
    description: 'Équipe support basée au Maroc, disponible en français, arabe et darija.',
    icon: UserGroupIcon,
  },
  {
    name: 'Communication directe',
    description: 'Échangez directement avec les freelancers via WhatsApp, email ou téléphone.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Qualité garantie',
    description: 'Système de notation et avis clients pour garantir la qualité des prestations.',
    icon: StarIcon,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-600">
            Pourquoi choisir Mkhedmin.ma
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            La plateforme de freelance pensée pour le Maroc
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nous comprenons les spécificités du marché marocain et nous adaptons notre plateforme 
            aux besoins des entreprises et freelancers locaux.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-brand-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trust badges */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">
              Ils nous font confiance
            </h3>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {/* Placeholder logos - replace with actual client logos */}
              <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Client 1</span>
              </div>
              <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Client 2</span>
              </div>
              <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Client 3</span>
              </div>
              <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Client 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}