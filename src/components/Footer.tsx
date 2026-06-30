export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-8 py-8 gap-4">
        <p className="text-label-caps text-on-surface">
          © {new Date().getFullYear()} ILAFRESH. All rights reserved.
        </p>
        <nav className="flex gap-8" aria-label="Footer">
          <a href="#" className="text-label-caps text-on-secondary-fixed-variant hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-label-caps text-on-secondary-fixed-variant hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-label-caps text-on-secondary-fixed-variant hover:text-primary transition-colors">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
