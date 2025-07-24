import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { 
  CheckBadgeIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'À propos - Mkhedmin.ma',
  description: 'Découvrez l\'histoire de Mkhedmin.ma, la première plateforme marocaine pour connecter les entreprises avec les meilleurs freelancers digitaux.',
};

const values = [
  {
    name: 'Excellence',
    description: 'Nous nous engageons à maintenir les plus hauts standards de qualité pour tous nos freelancers et projets.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Communauté',
    description: 'Nous croyons en la force de la communauté marocaine et soutenons l\'écosystème digital local.',
    icon: UserGroupIcon,
  },
  {
    name: 'Innovation',
    description: 'Nous adoptons les dernières technologies pour offrir la meilleure expérience utilisateur.',
    icon: LightBulbIcon,
  },
  {
    name: 'Confiance',
    description: 'La transparence et la sécurité sont au cœur de toutes nos interactions.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Impact Local',
    description: 'Nous contribuons au développement de l\'économie numérique marocaine.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Passion',
    description: 'Nous sommes passionnés par la mise en relation des talents avec les opportunités.',
    icon: HeartIcon,
  },
];

const team = [
  {
    name: 'Youssef Alami',
    role: 'CEO & Co-fondateur',
    bio: 'Expert en développement d\'entreprise avec 10 ans d\'expérience dans le secteur tech.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Aicha Bennani',
    role: 'CTO & Co-fondatrice',
    bio: 'Ingénieure logiciel passionnée par l\'innovation et les technologies émergentes.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Omar Tazi',
    role: 'Directeur Commercial',
    bio: 'Spécialiste en développement commercial avec une expertise du marché marocain.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Fatima Zahra',
    role: 'Responsable Marketing',
    bio: 'Experte en marketing digital et communication, passionnée par les stratégies créatives.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
];

const stats = [
  { number: '5000+', label: 'Freelancers actifs' },
  { number: '2000+', label: 'Projets réalisés' },
  { number: '500+', label: 'Entreprises clientes' },
  { number: '4.8/5', label: 'Note moyenne' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                À propos de Mkhedmin.ma
              </h1>
              <p className="mt-4 text-xl text-brand-100 max-w-3xl mx-auto">
                La première plateforme marocaine dédiée à connecter les entreprises 
                avec les meilleurs freelancers digitaux du royaume.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Chez Mkhedmin.ma, nous croyons que le talent n&apos;a pas de frontières. 
                Notre mission est de démocratiser l&apos;accès aux opportunités digitales 
                au Maroc en créant un pont entre les entreprises qui ont besoin de 
                compétences spécialisées et les freelancers talentueux qui cherchent 
                à faire leurs preuves.
              </p>
              <p className="text-lg text-gray-700">
                Nous nous engageons à construire un écosystème digital inclusif où 
                chaque freelancer peut développer sa carrière et où chaque entreprise 
                peut trouver les ressources nécessaires pour réussir dans l&apos;économie numérique.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Notre équipe au travail"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-brand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Nos chiffres parlent d&apos;eux-mêmes
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ces valeurs guident chacune de nos décisions et façonnent l&apos;expérience 
              que nous offrons à notre communauté.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.name}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Notre Histoire
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Mkhedmin.ma est né d&apos;un constat simple : le Maroc regorge de talents 
                  digitaux exceptionnels, mais les opportunités de collaboration entre 
                  freelancers et entreprises restaient limitées par manque de plateformes 
                  adaptées au contexte local.
                </p>
                <p>
                  Fondée en 2022 par une équipe d&apos;entrepreneurs marocains passionnés 
                  par la technologie, notre plateforme a été conçue pour répondre aux 
                  besoins spécifiques du marché marocain : support multilingue (arabe, 
                  français, anglais), paiements locaux, et compréhension des nuances 
                  culturelles et business locales.
                </p>
                <p>
                  Aujourd&apos;hui, nous sommes fiers d&apos;être la référence pour les 
                  services freelance au Maroc, avec une communauté grandissante de 
                  professionnels talentueux et d&apos;entreprises satisfaites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à faire de Mkhedmin.ma 
              la meilleure plateforme freelance du Maroc.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                Que vous soyez freelancer ou entreprise, découvrez comment 
                Mkhedmin.ma peut vous aider à atteindre vos objectifs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 transition-colors"
                >
                  Créer un compte
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