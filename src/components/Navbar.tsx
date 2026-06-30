import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex justify-between items-center max-w-[1280px] mx-auto px-8 h-20">
        {/* Brand */}
        <div className="cursor-pointer transition-transform active:scale-95 select-none">
          <Image
            src="/logo.png"
            alt="ILAFRESH"
            height={96}
            width={320}
            className="h-28 w-auto object-contain mix-blend-multiply"
            priority
          />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300">
            Our Story
          </a>
          <a href="#" className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300">
            Products
          </a>
          <a href="#" className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300">
            Sustainability
          </a>
        </div>

        {/* Icon actions */}
        <div className="flex items-center gap-6 text-on-surface-variant">
          <button
            className="cursor-pointer transition-transform active:scale-95 hover:text-primary"
            aria-label="Change language"
          >
            <span className="material-symbols-outlined">language</span>
          </button>
          <button
            className="cursor-pointer transition-transform active:scale-95 hover:text-primary"
            aria-label="Share page"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
