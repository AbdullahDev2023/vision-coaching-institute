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
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BackToTop from "@/components/ui/BackToTop";
import MobileBookingBar from "@/components/ui/MobileBookingBar";

export default function Home() {
  return (
    <>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-primary focus:font-bold focus:text-sm">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* 1. Hero — what is this + one CTA */}
        <section id="home"          aria-label="Hero"><Hero /></section>
        {/* 2. Results — immediate proof it works */}
        <section id="results"       aria-label="Results &amp; Toppers"><Results /></section>
        {/* 3. Courses — is it right for my child? */}
        <section id="courses"       aria-label="Our Courses"><Courses /></section>
        {/* 4. Fees — can I afford it? */}
        <section id="fees"          aria-label="Fee Structure"><FeeCard /></section>
        {/* 5. Faculty — who teaches? */}
        <section id="faculty"       aria-label="Our Faculty"><Faculty /></section>
        {/* 6. Testimonials — what do other parents say? */}
        <section id="testimonials"  aria-label="Student Testimonials"><Testimonials /></section>
        {/* 7. CTA — mid-page conversion nudge */}
        <section id="cta"           aria-label="Call to Action"><CtaBanner /></section>
        {/* 8. About — background story, curiosity not critical */}
        <section id="about"         aria-label="About Vision Coaching"><About /></section>
        {/* 9. FAQ — last objections */}
        <section id="faq"           aria-label="Frequently Asked Questions"><FaqSection /></section>
        {/* 10. Gallery — see the place */}
        <section id="gallery"       aria-label="Gallery"><Gallery /></section>
        {/* 11. Contact — book now */}
        <section id="contact"       aria-label="Contact Us"><Contact /></section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <MobileBookingBar />
    </>
  );
}
