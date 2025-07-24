import { StarIcon } from '@heroicons/react/20/solid';

const testimonials = [
  {
    id: 1,
    body: "Mkhedmin.ma m'a permis de trouver un développeur React exceptionnel pour mon e-commerce. Le projet a été livré dans les délais et la qualité était au rendez-vous. Je recommande vivement !",
    author: {
      name: 'Fatima Zahra El Mansouri',
      handle: 'fzelmansouri',
      imageUrl: '/images/testimonials/fatima.jpg',
      company: 'Directrice Marketing, TechCorp Maroc',
    },
    rating: 5,
  },
  {
    id: 2,
    body: "En tant que startup, nous avions besoin d'un designer UI/UX qui comprenne le marché marocain. Grâce à Mkhedmin.ma, nous avons trouvé le freelancer parfait qui a créé une identité visuelle magnifique.",
    author: {
      name: 'Ahmed Benali',
      handle: 'abenali',
      imageUrl: '/images/testimonials/ahmed.jpg',
      company: 'CEO, InnovaTech',
    },
    rating: 5,
  },
  {
    id: 3,
    body: "La plateforme est très intuitive et les freelancers sont vraiment qualifiés. J'ai trouvé un expert SEO qui a doublé le trafic de mon site en 3 mois. Service client excellent aussi !",
    author: {
      name: 'Laila Amrani',
      handle: 'lamrani',
      imageUrl: '/images/testimonials/laila.jpg',
      company: 'Fondatrice, E-boutique Marrakech',
    },
    rating: 5,
  },
];

const featuredTestimonial = {
  body: "Mkhedmin.ma a révolutionné notre façon de travailler avec les freelancers. La qualité des profils, la facilité de communication et le support en français font toute la différence. C'est devenu notre plateforme de référence pour tous nos projets digitaux.",
  author: {
    name: 'Youssef Alami',
    handle: 'yalami',
    imageUrl: '/images/testimonials/youssef.jpg',
    company: 'Directeur Digital, Groupe Atlantique',
  },
  rating: 5,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Testimonials() {
  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-brand-400 to-accent-400"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-accent-400 to-brand-400 xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-brand-600">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ils ont réussi leurs projets avec Mkhedmin.ma
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
              <p>{`"${featuredTestimonial.body}"`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={featuredTestimonial.author.imageUrl}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredTestimonial.author.name)}&background=3b82f6&color=fff`;
                }}
              />
              <div className="flex-auto">
                <div className="font-semibold">{featuredTestimonial.author.name}</div>
                <div className="text-gray-600">{featuredTestimonial.author.company}</div>
              </div>
              <div className="flex items-center gap-x-1">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      featuredTestimonial.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </figcaption>
          </figure>
          {testimonials.map((testimonial) => (
            <figure key={testimonial.id} className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <blockquote className="p-6 text-gray-900">
                <p>{`"${testimonial.body}"`}</p>
              </blockquote>
              <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                <img
                  className="h-10 w-10 flex-none rounded-full bg-gray-50"
                  src={testimonial.author.imageUrl}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author.name)}&background=3b82f6&color=fff`;
                  }}
                />
                <div className="flex-auto">
                  <div className="font-semibold">{testimonial.author.name}</div>
                  <div className="text-gray-600">{testimonial.author.company}</div>
                </div>
                <div className="flex items-center gap-x-1">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        testimonial.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'h-4 w-4 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}