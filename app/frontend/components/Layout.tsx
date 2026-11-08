import { usePage } from "@inertiajs/react";

import type { User } from "@/serializers";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  currentUser: User;
  children: React.ReactNode;
}

export default function Layout({ currentUser, children }: LayoutProps) {
  const { flash } = usePage().props;

  return (
    <div className="bg-fundo text-tinta-800 relative flex min-h-screen flex-col overflow-hidden font-mono">
      <Header currentUser={currentUser} />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 print:w-full print:!px-2">
          {flash.alert && (
            <div
              className="border-error-600 text-error-600 relative mb-4 border border-l-[6px] bg-white px-4 py-3"
              role="alert"
            >
              <span className="block sm:inline">{flash.alert}</span>
            </div>
          )}
          {flash.notice && (
            <div
              className="border-marca-verde text-tinta-500 relative mb-4 border border-l-[6px] px-4 py-3"
              role="alert"
            >
              <span className="block sm:inline">{flash.notice}</span>
            </div>
          )}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
