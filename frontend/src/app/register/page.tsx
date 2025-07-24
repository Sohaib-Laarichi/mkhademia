import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata = {
  title: 'S\'inscrire - Mkhedmin.ma',
  description: 'Créez votre compte Mkhedmin.ma et commencez à travailler avec les meilleurs freelancers du Maroc',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Créez votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{' '}
              <a
                href="/login"
                className="font-semibold text-brand-600 hover:text-brand-500"
              >
                connectez-vous à votre compte existant
              </a>
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}