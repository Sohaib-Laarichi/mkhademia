'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

const defaultStats = {
  totalFreelancers: 500,
  totalProjects: 1200,
  averageRating: 4.8,
  totalUsers: 2500,
};

export function Stats() {
  const { data: stats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/freelancers/stats');
        return response.data;
      } catch (error) {
        return defaultStats;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const displayStats = stats || defaultStats;

  const statsData = [
    {
      id: 1,
      name: 'Freelancers actifs',
      value: `${displayStats.totalFreelancers}+`,
      description: 'Professionnels vérifiés et disponibles',
    },
    {
      id: 2,
      name: 'Projets réalisés',
      value: `${displayStats.totalProjects}+`,
      description: 'Missions accomplies avec succès',
    },
    {
      id: 3,
      name: 'Note moyenne',
      value: `${displayStats.averageRating}/5`,
      description: 'Satisfaction client garantie',
    },
    {
      id: 4,
      name: 'Entreprises clientes',
      value: `${displayStats.totalUsers}+`,
      description: 'Nous font confiance',
    },
  ];

  return (
    <div className="bg-brand-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mkhedmin.ma en chiffres
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-200">
              La confiance de milliers d'entreprises marocaines et de freelancers
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-brand-400/10 p-8 backdrop-blur-sm">
                <dt className="text-sm font-semibold leading-6 text-brand-200">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </dd>
                <dd className="mt-2 text-sm leading-6 text-brand-200">
                  {stat.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}