'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckBadgeIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { formatMAD, formatRelativeTime, generateWhatsAppLink } from '@/lib/utils';
import type { FreelancerProfile as FreelancerProfileType } from '@/types';

interface FreelancerProfileProps {
  freelancer: FreelancerProfileType;
}

export default function FreelancerProfile({ freelancer }: FreelancerProfileProps) {
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);

  const nextPortfolioItem = () => {
    setActivePortfolioIndex((prev) => 
      prev === freelancer.portfolio.length - 1 ? 0 : prev + 1
    );
  };

  const prevPortfolioItem = () => {
    setActivePortfolioIndex((prev) => 
      prev === 0 ? freelancer.portfolio.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      available: { text: 'Disponible', color: 'bg-green-100 text-green-800' },
      busy: { text: 'Occupé', color: 'bg-yellow-100 text-yellow-800' },
      unavailable: { text: 'Indisponible', color: 'bg-red-100 text-red-800' }
    };
    
    const badge = badges[availability as keyof typeof badges] || badges.available;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const whatsappLink = generateWhatsAppLink(
    freelancer.contacts.whatsapp,
    `Bonjour ${freelancer.name}, je suis intéressé par vos services.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              Accueil
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <Link href="/freelancers" className="ml-4 text-gray-400 hover:text-gray-500">
                Freelancers
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <span className="ml-4 text-gray-500">{freelancer.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.name)}&size=80&background=6366f1&color=ffffff`}
                    alt={freelancer.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  {freelancer.isVerified && (
                    <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                    {freelancer.isPremium && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{freelancer.title}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {freelancer.location.city}, {freelancer.location.region}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Répond en {freelancer.responseTime}h
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {freelancer.profileViews} vues
                    </div>
                  </div>
                </div>
              </div>
              {getAvailabilityBadge(freelancer.availability)}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {renderStars(freelancer.rating)}
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {freelancer.rating}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({freelancer.totalReviews} avis)
              </span>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos</h2>
            <p className="text-gray-700 leading-relaxed">{freelancer.bio}</p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services proposés</h2>
            <ul className="space-y-2">
              {freelancer.services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          {freelancer.portfolio.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={freelancer.portfolio[activePortfolioIndex].image}
                    alt={freelancer.portfolio[activePortfolioIndex].title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                {freelancer.portfolio.length > 1 && (
                  <>
                    <button
                      onClick={prevPortfolioItem}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={nextPortfolioItem}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    >
                      <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </>
                )}
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {freelancer.portfolio[activePortfolioIndex].title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {freelancer.portfolio[activePortfolioIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {freelancer.portfolio[activePortfolioIndex].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Navigation Dots */}
                {freelancer.portfolio.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {freelancer.portfolio.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePortfolioIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === activePortfolioIndex ? 'bg-brand-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {freelancer.testimonials.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Témoignages clients</h2>
              <div className="space-y-6">
                {freelancer.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border-l-4 border-brand-500 pl-4">
                    <div className="flex items-center mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 mb-2">"{testimonial.content}"</p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{testimonial.clientName}</span>
                      {testimonial.clientCompany && (
                        <span> - {testimonial.clientCompany}</span>
                      )}
                      <span className="ml-2">
                        {formatRelativeTime(new Date(testimonial.date))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900">
                {freelancer.rate.type === 'hourly' && (
                  <>
                    {formatMAD(freelancer.rate.amount)}
                    <span className="text-lg font-normal text-gray-500">/heure</span>
                  </>
                )}
                {freelancer.rate.type === 'daily' && (
                  <>
                    {formatMAD(freelancer.rate.amount)}
                    <span className="text-lg font-normal text-gray-500">/jour</span>
                  </>
                )}
                {freelancer.rate.type === 'project' && (
                  <>
                    {formatMAD(freelancer.rate.amount)}
                    <span className="text-lg font-normal text-gray-500">/projet</span>
                  </>
                )}
                {freelancer.rate.type === 'negotiable' && (
                  <span className="text-lg font-normal text-gray-500">À négocier</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Contacter sur WhatsApp
              </a>

              <a
                href={`mailto:${freelancer.contacts.email}`}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Envoyer un email
              </a>

              {freelancer.contacts.linkedin && (
                <a
                  href={freelancer.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  Voir le profil LinkedIn
                </a>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 space-y-2">
                <div className="flex justify-between">
                  <span>Membre depuis</span>
                  <span>{formatRelativeTime(new Date(freelancer.joinedDate))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Langues</span>
                  <span>
                    {freelancer.languages.map(lang => {
                      const langMap: { [key: string]: string } = {
                        'ar': 'العربية',
                        'fr': 'Français',
                        'en': 'English'
                      };
                      return langMap[lang] || lang;
                    }).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Temps de réponse</span>
                  <span>~{freelancer.responseTime}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Freelancers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Freelancers similaires
            </h3>
            <div className="space-y-4">
              {/* Mock similar freelancers */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=Freelancer${i}&size=40&background=6366f1&color=ffffff`}
                    alt={`Freelancer ${i}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Freelancer {i}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {freelancer.category}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <StarIconSolid className="h-3 w-3 text-yellow-400 mr-1" />
                    4.{8 + i}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/freelancers"
              className="block text-center text-brand-600 hover:text-brand-700 text-sm font-medium mt-4"
            >
              Voir plus de freelancers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}