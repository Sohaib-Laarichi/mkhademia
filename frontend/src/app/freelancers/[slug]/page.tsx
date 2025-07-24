import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FreelancerProfile from '@/components/freelancers/freelancer-profile';

// This would typically fetch data from the API
async function getFreelancer(slug: string) {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelancers/${slug}`);
    // if (!response.ok) return null;
    // return response.json();
    
    // Mock data for now
    return {
      id: '1',
      slug: slug,
      name: 'Ahmed Benali',
      title: 'Développeur Full-Stack Expert',
      category: 'development',
      experience: 'expert',
      location: {
        city: 'Casablanca',
        region: 'Casablanca-Settat'
      },
      rate: {
        type: 'hourly',
        amount: 350,
        currency: 'MAD'
      },
      rating: 4.9,
      totalReviews: 47,
      profileViews: 1250,
      responseTime: 2,
      availability: 'available',
      languages: ['ar', 'fr', 'en'],
      bio: 'Développeur Full-Stack passionné avec plus de 8 ans d\'expérience dans le développement d\'applications web modernes. Spécialisé en React, Node.js, et MongoDB.',
      services: [
        'Développement d\'applications web',
        'APIs REST et GraphQL',
        'E-commerce sur mesure',
        'Applications mobiles React Native',
        'Consultation technique'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js', 'Express.js'],
      portfolio: [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'Plateforme e-commerce complète avec paiement intégré',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
          technologies: ['React', 'Node.js', 'MongoDB'],
          url: 'https://example.com'
        },
        {
          id: '2',
          title: 'Mobile Banking App',
          description: 'Application bancaire mobile sécurisée',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500',
          technologies: ['React Native', 'Firebase', 'Redux'],
          url: 'https://example.com'
        }
      ],
      testimonials: [
        {
          id: '1',
          clientName: 'Sara Alami',
          clientCompany: 'TechStart Maroc',
          content: 'Ahmed a livré un travail exceptionnel. Très professionnel et à l\'écoute.',
          rating: 5,
          date: '2024-01-15'
        },
        {
          id: '2',
          clientName: 'Mohamed Tazi',
          clientCompany: 'Digital Agency',
          content: 'Excellent développeur, je recommande vivement ses services.',
          rating: 5,
          date: '2024-01-10'
        }
      ],
      contacts: {
        whatsapp: '+212661234567',
        email: 'ahmed.benali@email.com',
        linkedin: 'https://linkedin.com/in/ahmed-benali'
      },
      isVerified: true,
      isPremium: true,
      joinedDate: '2022-03-15'
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const freelancer = await getFreelancer(params.slug);
  
  if (!freelancer) {
    return {
      title: 'Freelancer non trouvé - Mkhedmin.ma',
    };
  }

  return {
    title: `${freelancer.name} - ${freelancer.title} | Mkhedmin.ma`,
    description: `${freelancer.bio.substring(0, 160)}...`,
    openGraph: {
      title: `${freelancer.name} - ${freelancer.title}`,
      description: freelancer.bio,
      type: 'profile',
    },
  };
}

export default async function FreelancerPage({ params }: { params: { slug: string } }) {
  const freelancer = await getFreelancer(params.slug);

  if (!freelancer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FreelancerProfile freelancer={freelancer} />
      </main>
      <Footer />
    </div>
  );
}