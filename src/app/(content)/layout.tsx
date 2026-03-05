import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BackToTop     from "@/components/ui/BackToTop";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--navbar-h, 5rem)" }}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
