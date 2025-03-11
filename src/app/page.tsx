import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import DockNavigation from "@/components/DockNavigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24 sm:pt-28 pb-24">
        <Hero />
        <About id="about" />
        <Skills />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
      <Footer />
      <DockNavigation />
    </div>
  );
}
