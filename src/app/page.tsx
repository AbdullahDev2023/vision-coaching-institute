import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import Faculty from "@/components/sections/Faculty";
import Results from "@/components/sections/Results";
import CtaBanner from "@/components/sections/CtaBanner";
import FeeCard from "@/components/sections/FeeCard";
import FaqSection from "@/components/sections/FaqSection";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BackToTop from "@/components/ui/BackToTop";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
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
        {/* Gallery: client-side only, lazy JS bundle, zero video payload on load */}
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
