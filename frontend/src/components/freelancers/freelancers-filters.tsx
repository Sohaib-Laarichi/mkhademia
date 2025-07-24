'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { CATEGORIES, MOROCCAN_CITIES, MOROCCAN_REGIONS } from '@/types';

interface FilterSection {
  id: string;
  name: string;
  options: { value: string; label: string; }[];
}

const filterSections: FilterSection[] = [
  {
    id: 'category',
    name: 'Catégorie',
    options: CATEGORIES,
  },
  {
    id: 'city',
    name: 'Ville',
    options: MOROCCAN_CITIES,
  },
  {
    id: 'region',
    name: 'Région',
    options: MOROCCAN_REGIONS,
  },
  {
    id: 'experience',
    name: 'Expérience',
    options: [
      { value: 'junior', label: 'Junior (0-2 ans)' },
      { value: 'intermediate', label: 'Intermédiaire (2-5 ans)' },
      { value: 'senior', label: 'Senior (5+ ans)' },
      { value: 'expert', label: 'Expert (10+ ans)' },
    ],
  },
  {
    id: 'mode',
    name: 'Mode de travail',
    options: [
      { value: 'remote', label: 'À distance' },
      { value: 'onsite', label: 'Sur site' },
      { value: 'hybrid', label: 'Hybride' },
    ],
  },
  {
    id: 'availability',
    name: 'Disponibilité',
    options: [
      { value: 'available', label: 'Disponible maintenant' },
      { value: 'busy', label: 'Occupé' },
      { value: 'partial', label: 'Partiellement disponible' },
    ],
  },
];

const rateRanges = [
  { value: '0-500', label: 'Moins de 500 MAD/jour' },
  { value: '500-1000', label: '500 - 1000 MAD/jour' },
  { value: '1000-2000', label: '1000 - 2000 MAD/jour' },
  { value: '2000-5000', label: '2000 - 5000 MAD/jour' },
  { value: '5000+', label: 'Plus de 5000 MAD/jour' },
];

export function FreelancersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['category']);
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'q' && key !== 'page') {
        initialFilters[key] = value.split(',');
      }
    });
    setFilters(initialFilters);
  }, [searchParams]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = [];
    }

    if (checked) {
      newFilters[sectionId] = [...newFilters[sectionId], value];
    } else {
      newFilters[sectionId] = newFilters[sectionId].filter(v => v !== value);
    }

    if (newFilters[sectionId].length === 0) {
      delete newFilters[sectionId];
    }

    setFilters(newFilters);
    updateURL(newFilters);
  };

  const updateURL = (newFilters: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams);
    
    // Clear existing filter params
    filterSections.forEach(section => {
      params.delete(section.id);
    });
    params.delete('rate');

    // Add new filter params
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','));
      }
    });

    router.push(`/freelancers?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setFilters({});
    const params = new URLSearchParams(searchParams);
    filterSections.forEach(section => {
      params.delete(section.id);
    });
    params.delete('rate');
    router.push(`/freelancers?${params.toString()}`);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <FunnelIcon className="mr-2 h-4 w-4" />
            Filtres
          </span>
          {isOpen ? (
            <XMarkIcon className="h-4 w-4" />
          ) : (
            <FunnelIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Filters content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Filtres</h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                Effacer tout
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filterSections.map((section) => (
            <div key={section.id} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 text-sm font-medium text-gray-900"
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.name}</span>
                {openSections.includes(section.id) ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              
              {openSections.includes(section.id) && (
                <div className="mt-3 px-4 space-y-2">
                  {section.options.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                        checked={filters[section.id]?.includes(option.value) || false}
                        onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                      />
                      <span className="ml-3 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Rate filter */}
          <div className="py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 text-sm font-medium text-gray-900"
              onClick={() => toggleSection('rate')}
            >
              <span>Tarif journalier</span>
              {openSections.includes('rate') ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
            
            {openSections.includes('rate') && (
              <div className="mt-3 px-4 space-y-2">
                {rateRanges.map((range) => (
                  <label key={range.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                      checked={filters.rate?.includes(range.value) || false}
                      onChange={(e) => handleFilterChange('rate', range.value, e.target.checked)}
                    />
                    <span className="ml-3 text-sm text-gray-600">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}