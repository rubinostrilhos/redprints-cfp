export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tema-tinta bg-fundo text-texto-apoio border-traco w-full border-t py-8">
      <div className="container mx-auto flex flex-col justify-between gap-4 px-4 text-sm sm:px-6 md:flex-row lg:px-8">
        <p>&copy; {currentYear} Tropical on Rails</p>
        <a
          href="https://tropicalonrails.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-texto transition-colors"
        >
          tropicalonrails.com
        </a>
      </div>
    </footer>
  );
}
