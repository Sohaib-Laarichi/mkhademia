import { 
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: '01',
    name: 'Décrivez votre projet',
    description: 'Expliquez votre besoin, votre budget et vos délais. Plus vous êtes précis, mieux nous pouvons vous aider.',
    icon: MagnifyingGlassIcon,
  },
  {
    id: '02',
    name: 'Recevez des propositions',
    description: 'Les freelancers intéressés vous contactent avec leurs propositions détaillées et leurs portfolios.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    id: '03',
    name: 'Choisissez votre freelancer',
    description: 'Comparez les profils, évaluez les propositions et sélectionnez le freelancer qui vous convient.',
    icon: HandRaisedIcon,
  },
  {
    id: '04',
    name: 'Lancez votre projet',
    description: 'Collaborez directement avec votre freelancer et suivez l\'avancement de votre projet en temps réel.',
    icon: CheckCircleIcon,
  },
];

export function HowItWorks() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-600">
            Comment ça marche
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trouvez votre freelancer en 4 étapes simples
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Notre processus simplifié vous permet de trouver et collaborer avec les meilleurs freelancers du Maroc.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-y-16 lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative">
                {/* Connector line */}
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 hidden h-0.5 w-full -translate-x-1/2 bg-gray-200 lg:block" />
                )}
                
                <div className="flex flex-col items-center text-center">
                  {/* Step number and icon */}
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4">
            <a
              href="/register"
              className="rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Commencer maintenant
            </a>
            <span className="text-gray-400">ou</span>
            <a
              href="/freelancers"
              className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Parcourir les freelancers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}