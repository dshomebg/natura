import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import About from "@/components/homes/home-2/About";
import Achievements from "@/components/homes/home-2/Achievements";
import Blogs from "@/components/homes/home-2/Blogs";
import Cta from "@/components/homes/home-2/Cta";
import Hero from "@/components/homes/home-2/Hero";
import Pricing from "@/components/homes/home-2/Pricing";
import Projects from "@/components/homes/home-2/Projects";
import Team from "@/components/homes/home-2/Team";
import Testimonials from "@/components/homes/home-2/Testimonials";
import React from "react";
import Image from "next/image";
import Services from "@/components/homes/home-2/Services";
export const metadata = {
  title: "Home 2 || Xbuild - Constriction nextjs Template",
  description: "Xbuild - Constriction nextjs Template",
};
export default function page() {
  return (
    <>
      <Header2 />
      <Hero />
      <About />
      <Services />
      <div className="brand-section fix section-padding">
        <Brands />
      </div>
      <Projects />
      <Team />
      <section
        className="pricing-section fix section-padding bg-cover"
        style={{ backgroundImage: 'url("/assets/img/pricing-bg.jpg")' }}
      >
        <div className="pricing-arrow-shape float-bob-y">
          <Image
            src="/assets/img/pricing-arrow-shape.png"
            width={329}
            height={494}
            alt="img"
          />
        </div>
        <div className="pricing-circle-shape float-bob-x">
          <Image
            src="/assets/img/pricing-circle-shape.png"
            width={616}
            height={538}
            alt="img"
          />
        </div>
        <Pricing />
      </section>
      <Cta />
      <Achievements />
      <Testimonials />
      <Blogs />
      <Footer1 />
    </>
  );
}
