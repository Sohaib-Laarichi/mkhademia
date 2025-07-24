import Link from 'next/link';
import { 
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  PencilIcon,
  ChartBarIcon,
  CameraIcon,
  LanguageIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    name: 'Développement',
    description: 'Sites web, applications mobiles, e-commerce',
    icon: CodeBracketIcon,
    href: '/freelancers?category=development',
    count: '150+ freelancers',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Design',
    description: 'UI/UX, logos, identité visuelle, print',
    icon: PaintBrushIcon,
    href: '/freelancers?category=design',
    count: '120+ freelancers',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Marketing Digital',
    description: 'SEO, publicité, réseaux sociaux, email',
    icon: MegaphoneIcon,
    href: '/freelancers?category=marketing',
    count: '90+ freelancers',
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Rédaction',
    description: 'Articles, copywriting, traduction',
    icon: PencilIcon,
    href: '/freelancers?category=writing',
    count: '80+ freelancers',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Business',
    description: 'Consulting, gestion de projet, analyse',
    icon: ChartBarIcon,
    href: '/freelancers?category=business',
    count: '60+ freelancers',
    gradient: 'from-red-500 to-red-600',
  },
  {
    name: 'Photo & Vidéo',
    description: 'Photographie, montage, animation',
    icon: CameraIcon,
    href: '/freelancers?category=media',
    count: '70+ freelancers',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Traduction',
    description: 'Français, arabe, anglais, darija',
    icon: LanguageIcon,
    href: '/freelancers?category=translation',
    count: '40+ freelancers',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Autres',
    description: 'Support, formation, services divers',
    icon: CogIcon,
    href: '/freelancers?category=other',
    count: '30+ freelancers',
    gradient: 'from-gray-500 to-gray-600',
  },
];

export function Categories() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-600">
            Explorez par catégorie
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trouvez le bon expert pour votre projet
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Parcourez nos catégories de freelancers spécialisés dans différents domaines du digital.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-white px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-t ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              {/* Icon */}
              <div className="absolute top-8 left-8">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white shadow-lg`}>
                  <category.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-600">
                <div className="mr-8">{category.count}</div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-brand-600 transition-colors">
                <span className="absolute inset-0" />
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <Link
            href="/freelancers"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Voir tous les freelancers
          </Link>
        </div>
      </div>
    </div>
  );
}