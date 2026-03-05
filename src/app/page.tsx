import dynamic from "next/dynamic";
import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";
import Hero          from "@/components/sections/Hero";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BackToTop     from "@/components/ui/BackToTop";
import MobileBookingBar from "@/components/ui/MobileBookingBar";

// Above-fold sections — loaded eagerly
import Results  from "@/components/sections/Results";
import Courses  from "@/components/sections/Courses";

// Below-fold sections — lazy loaded (reduces initial JS bundle)
const FeeCard      = dynamic(() => import("@/components/sections/FeeCard"));
const Faculty      = dynamic(() => import("@/components/sections/Faculty"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CtaBanner    = dynamic(() => import("@/components/sections/CtaBanner"));
const About        = dynamic(() => import("@/components/sections/About"));
const FaqSection   = dynamic(() => import("@/components/sections/FaqSection"));
const Contact      = dynamic(() => import("@/components/sections/Contact"));

// GalleryLoader is a "use client" wrapper that does dynamic(ssr:false) — required
// because next/dynamic with ssr:false cannot be used directly in a Server Component.
import GalleryLoader from "@/components/sections/GalleryLoader";

export default function Home() {
  return (
    <>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-primary focus:font-bold focus:text-sm">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <section id="home"         aria-label="Hero"><Hero /></section>
        <section id="results"      aria-label="Results &amp; Toppers"><Results /></section>
        <section id="courses"      aria-label="Our Courses"><Courses /></section>
        <section id="fees"         aria-label="Fee Structure"><FeeCard /></section>
        <section id="faculty"      aria-label="Our Faculty"><Faculty /></section>
        <section id="testimonials" aria-label="Student Testimonials"><Testimonials /></section>
        <section id="cta"          aria-label="Call to Action"><CtaBanner /></section>
        <section id="about"        aria-label="About Vision Coaching"><About /></section>
        <section id="faq"          aria-label="Frequently Asked Questions"><FaqSection /></section>
        <section id="gallery"      aria-label="Gallery"><GalleryLoader /></section>
        <section id="contact"      aria-label="Contact Us"><Contact /></section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <MobileBookingBar />
    </>
  );
}
