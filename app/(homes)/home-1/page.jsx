import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import HeaderTop1 from "@/components/headers/HeaderTop1";
import About from "@/components/homes/home-1/About";
import Blogs from "@/components/homes/home-1/Blogs";

import Contact from "@/components/homes/home-1/Contact";
import Cta from "@/components/homes/home-1/Cta";
import Faq from "@/components/homes/home-1/Faq";
import Hero from "@/components/homes/home-1/Hero";
import Projects from "@/components/homes/home-1/Projects";
import Services from "@/components/homes/home-1/Services";
import Skills from "@/components/homes/home-1/Skills";
import Team from "@/components/homes/home-1/Team";
import Testimonials from "@/components/homes/home-1/Testimonials";
export const metadata = {
  title: "Home 1 || Xbuild - Constriction nextjs Template",
  description: "Xbuild - Constriction nextjs Template",
};
export default function Home1() {
  return (
    <>
      <HeaderTop1 />
      <Header1 />
      <Hero />
      <About />
      <Services />
      <Cta />
      <Skills />
      <Testimonials />
      <Projects />
      <Faq />
      <Team />
      <Contact />
      <Blogs />
      <div className="brand-section fix section-padding">
        <Brands />
      </div>
      <Footer1 />
    </>
  );
}
