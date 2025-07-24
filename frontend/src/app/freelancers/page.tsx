import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FreelancersList } from '@/components/freelancers/freelancers-list';
import { FreelancersFilters } from '@/components/freelancers/freelancers-filters';

export const metadata = {
  title: 'Freelancers Marocains - Mkhedmin.ma',
  description: 'Découvrez notre sélection de freelancers marocains vérifiés. Développeurs, designers, marketeurs et plus encore.',
};

export default function FreelancersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Header section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Freelancers Marocains
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre communauté de freelancers vérifiés, prêts à donner vie à vos projets digitaux.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <FreelancersFilters />
            </div>

            {/* Freelancers list */}
            <div className="mt-8 lg:mt-0 lg:col-span-3">
              <FreelancersList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}