import { Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { User } from "@/serializers";

import { Logo } from "./Logo";

interface HeaderProps {
  currentUser: User;
}

export function Header({ currentUser }: HeaderProps) {
  const { url } = usePage();
  const { primary_cfp } = usePage().props;

  const cfp_closed = primary_cfp?.is_closed ?? true;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="tema-tinta bg-fundo border-traco sticky top-0 z-10 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <div className="flex items-center">
            {url === "/" ? (
              <Logo />
            ) : (
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-85"
                prefetch
              >
                <Logo />
              </Link>
            )}
          </div>

          {currentUser && (
            <div className="sm:hidden print:hidden">
              <button
                onClick={toggleMenu}
                className="text-texto-apoio hover:text-texto focus-visible:outline-marca-azul inline-flex items-center justify-center p-2 focus:outline-none focus-visible:outline-2"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          )}

          {currentUser && (
            <nav className="hidden items-center justify-end gap-6 sm:flex print:hidden">
              {!cfp_closed && (
                <Link
                  href="/proposals/new"
                  className={`text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                    url === "/proposals/new"
                      ? "text-marca-azul"
                      : "text-texto-apoio hover:text-texto"
                  }`}
                >
                  Submit proposal
                </Link>
              )}

              <Link
                href="/proposals"
                className={`text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                  url === "/proposals"
                    ? "text-marca-azul"
                    : "text-texto-apoio hover:text-texto"
                }`}
              >
                My proposals
              </Link>
              {currentUser.is_reviewer && (
                <Link
                  href="/evaluations"
                  className="btn border-marca-azul text-marca-azul hover:bg-marca-azul hover:text-tinta-900 px-3 py-1.5 text-xs"
                  title="Review"
                >
                  Review
                </Link>
              )}
              <Link
                href="/auth/sign_out"
                method="delete"
                onClick={() => router.clearHistory()}
                as="button"
                className="text-texto-apoio hover:text-texto cursor-pointer text-xs font-semibold tracking-[0.08em] uppercase transition-colors"
                title="Sign out"
              >
                Sign out
              </Link>
            </nav>
          )}
        </div>
        {currentUser && (
          <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="border-traco space-y-1 border-t px-2 pt-2 pb-3">
              <Link
                href="/"
                className="text-texto-apoio hover:text-texto block w-full px-3 py-2 text-left text-xs font-semibold tracking-[0.08em] uppercase"
              >
                Home
              </Link>
              {!cfp_closed && (
                <Link
                  href="/proposals/new"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="text-texto-apoio hover:text-texto block w-full px-3 py-2 text-left text-xs font-semibold tracking-[0.08em] uppercase"
                >
                  Submit Proposal
                </Link>
              )}
              {currentUser.is_reviewer && (
                <Link
                  href="/evaluations"
                  className="btn border-marca-azul text-marca-azul hover:bg-marca-azul hover:text-tinta-900 px-3 py-1.5 text-xs"
                  title="Review"
                >
                  Review
                </Link>
              )}
              <Link
                href="/proposals"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="text-texto-apoio hover:text-texto block w-full px-3 py-2 text-left text-xs font-semibold tracking-[0.08em] uppercase"
              >
                My Proposals
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
