import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Se connecter - Mkhedmin.ma',
  description: 'Connectez-vous à votre compte Mkhedmin.ma',
};

export default function LoginPage() {
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
              Connectez-vous à votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{' '}
              <a
                href="/register"
                className="font-semibold text-brand-600 hover:text-brand-500"
              >
                créez un nouveau compte
              </a>
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}