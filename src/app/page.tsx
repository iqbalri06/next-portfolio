import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16 sm:pt-20"> {/* Only keep padding-top for navbar clearance */}
        <Hero />
        <About id="about" />
        <Skills />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
      <Footer />
    </div>
  );
}
