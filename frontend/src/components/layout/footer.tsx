import Link from 'next/link';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Freelancers', href: '/freelancers' },
    { name: 'Comment ça marche', href: '/how-it-works' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  freelancers: [
    { name: 'Développeurs', href: '/freelancers?category=development' },
    { name: 'Designers', href: '/freelancers?category=design' },
    { name: 'Marketing', href: '/freelancers?category=marketing' },
    { name: 'Rédaction', href: '/freelancers?category=writing' },
    { name: 'Business', href: '/freelancers?category=business' },
  ],
  support: [
    { name: 'Centre d\'aide', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Conditions d\'utilisation', href: '/terms' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Signaler un problème', href: '/report' },
  ],
  cities: [
    { name: 'Casablanca', href: '/freelancers?city=casablanca' },
    { name: 'Rabat', href: '/freelancers?city=rabat' },
    { name: 'Marrakech', href: '/freelancers?city=marrakech' },
    { name: 'Fès', href: '/freelancers?city=fes' },
    { name: 'Tanger', href: '/freelancers?city=tanger' },
  ],
};

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.017 0C8.396 0 8.025.01 6.78.048 5.537.085 4.72.167 3.996.33 3.25.5 2.62.743 1.99 1.373 1.36 2.003 1.117 2.633.947 3.38.784 4.103.702 4.92.665 6.163.627 7.408.617 7.779.617 11.4c0 3.621.01 3.992.048 5.237.037 1.243.119 2.06.282 2.784.17.747.413 1.377 1.043 2.007.63.63 1.26.873 2.007 1.043.724.163 1.541.245 2.784.282 1.245.038 1.616.048 5.237.048 3.621 0 3.992-.01 5.237-.048 1.243-.037 2.06-.119 2.784-.282.747-.17 1.377-.413 2.007-1.043.63-.63.873-1.26 1.043-2.007.163-.724.245-1.541.282-2.784.038-1.245.048-1.616.048-5.237 0-3.621-.01-3.992-.048-5.237-.037-1.243-.119-2.06-.282-2.784-.17-.747-.413-1.377-1.043-2.007-.63-.63-1.26-.873-2.007-1.043-.724-.163-1.541-.245-2.784-.282C15.992.01 15.621 0 12.017 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mkhedmin.ma</span>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              La première plateforme marocaine pour connecter les entreprises avec les meilleurs freelancers digitaux du Maroc.
            </p>
            
            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span>Casablanca, Maroc</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span>contact@mkhedmin.ma</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span>+212 5XX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <span>www.mkhedmin.ma</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-6">
              {social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Catégories</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.freelancers.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Villes</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.cities.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              Abonnez-vous à notre newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Les dernières nouvelles, articles et ressources, envoyés dans votre boîte de réception chaque semaine.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Adresse email
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
              placeholder="Entrez votre email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                S'abonner
              </button>
            </div>
          </form>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="/terms" className="text-xs leading-5 text-gray-500 hover:text-gray-900">
              Conditions d'utilisation
            </Link>
            <Link href="/privacy" className="text-xs leading-5 text-gray-500 hover:text-gray-900">
              Confidentialité
            </Link>
            <Link href="/cookies" className="text-xs leading-5 text-gray-500 hover:text-gray-900">
              Cookies
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; 2024 Mkhedmin.ma. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}