'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { 
  StarIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';
import { apiClient } from '@/lib/api';
import { FreelancerProfile } from '@/types';
import { formatMAD, getInitials } from '@/lib/utils';

const sortOptions = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'rating', label: 'Mieux notés' },
  { value: 'recent', label: 'Plus récents' },
  { value: 'views', label: 'Plus vus' },
  { value: 'rate_asc', label: 'Prix croissant' },
  { value: 'rate_desc', label: 'Prix décroissant' },
];

export function FreelancersList() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Build search filters from URL params
  const buildFilters = () => {
    const filters: any = {
      page: currentPage,
      limit: 12,
      sort: sortBy,
    };

    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'sort') {
        filters[key] = value;
      }
    });

    return filters;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['freelancers', buildFilters()],
    queryFn: async () => {
      const params = new URLSearchParams();
      const filters = buildFilters();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, String(value));
      });

      const response = await apiClient.get(`/freelancers?${params.toString()}`);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Erreur de chargement</h3>
        <p className="mt-1 text-sm text-gray-500">
          Une erreur s'est produite lors du chargement des freelancers.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const freelancers = data?.freelancers || [];
  const pagination = data?.pagination || {};
  const totalPages = Math.ceil((pagination.total || 0) / (pagination.limit || 12));

  if (freelancers.length === 0) {
    return (
      <div className="text-center py-12">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun freelancer trouvé</h3>
        <p className="mt-1 text-sm text-gray-500">
          Essayez de modifier vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{pagination.total || 0}</span> freelancer{(pagination.total || 0) > 1 ? 's' : ''} trouvé{(pagination.total || 0) > 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Freelancers grid */}
      <div className="space-y-6">
        {freelancers.map((freelancer: FreelancerProfile) => (
          <FreelancerCard key={freelancer._id} freelancer={freelancer} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de{' '}
                <span className="font-medium">{(currentPage - 1) * (pagination.limit || 12) + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(currentPage * (pagination.limit || 12), pagination.total || 0)}
                </span>{' '}
                sur <span className="font-medium">{pagination.total || 0}</span> résultats
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Précédent</span>
                  <ChevronDownIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                
                {/* Page numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        pageNum === currentPage
                          ? 'z-10 bg-brand-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Suivant</span>
                  <ChevronDownIcon className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FreelancerCard({ freelancer }: { freelancer: FreelancerProfile }) {
  const averageRating = freelancer.averageRating || 0;
  const totalTestimonials = freelancer.totalTestimonials || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {getInitials(freelancer.user?.name || 'Freelancer')}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link
                  href={`/freelancers/${freelancer.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-brand-600"
                >
                  {freelancer.user?.name}
                </Link>
                <p className="text-sm text-brand-600 font-medium mt-1">
                  {freelancer.category}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIconSolid
                        key={rating}
                        className={`${
                          averageRating > rating ? 'text-yellow-400' : 'text-gray-200'
                        } h-4 w-4 flex-shrink-0`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({totalTestimonials} avis)
                  </span>
                </div>

                {/* Location and experience */}
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {freelancer.location?.city}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {freelancer.experience}
                  </div>
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {freelancer.stats?.profileViews || 0} vues
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {freelancer.bio}
                </p>

                {/* Skills */}
                {freelancer.services && freelancer.services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {freelancer.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800"
                      >
                        {service}
                      </span>
                    ))}
                    {freelancer.services.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{freelancer.services.length - 3} autres
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Rate and CTA */}
              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  {freelancer.rate?.hourly && (
                    <div className="text-lg font-semibold text-gray-900">
                      {formatMAD(freelancer.rate.hourly)}/h
                    </div>
                  )}
                  {freelancer.rate?.daily && (
                    <div className="text-sm text-gray-600">
                      {formatMAD(freelancer.rate.daily)}/jour
                    </div>
                  )}
                  {freelancer.rate?.negotiable && (
                    <div className="text-sm text-gray-600">
                      Négociable
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/freelancers/${freelancer.slug}`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    Voir le profil
                  </Link>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}