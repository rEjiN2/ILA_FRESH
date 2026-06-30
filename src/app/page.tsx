import CountdownTimer from "@/components/CountdownTimer";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShaderBackground from "@/components/ShaderBackground";

export default function ComingSoonPage() {
  return (
    <>
      {/* Fullscreen animated background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>

      {/* Page shell */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        <main className="flex-grow flex items-center justify-center px-8 pt-20">
          <div className="max-w-2xl w-full text-center">
            {/* Headline */}
            <div
              className="animate-hero opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <h1 className="text-headline-display text-primary leading-none mb-6">
                A Modern Spice Legacy
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-12">
                Curating nature&apos;s finest cardamom and botanical blends.
                Arriving Early 2026.
              </p>
            </div>

            {/* Countdown */}
            <div
              className="animate-hero opacity-0 mb-16"
              style={{ animationDelay: "0.4s" }}
            >
              <CountdownTimer />
            </div>

            {/* Email signup */}
            <div
              className="animate-hero opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              <EmailSignup />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
