import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import HeaderTop1 from "@/components/headers/HeaderTop1";
import About from "@/components/homes/home-1/About";
import Apartments from "@/components/homes/home-1/Apartments";
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
import {
  getHomePage,
  getProjects,
  getServices,
  getTeam,
  getPosts,
  getAvailableApartments,
} from "@/lib/data";

export const metadata = {
  title: "NATURA — строителство, ремонти и архитектура",
  description:
    "NATURA е строителна компания с фокус върху качество, устойчивост и модерна архитектура.",
};

export default async function Home1() {
  const [homePage, projects, services, team, posts, apartments] =
    await Promise.all([
      getHomePage(),
      getProjects(),
      getServices(),
      getTeam(),
      getPosts(4),
      getAvailableApartments(3),
    ]);

  // Section visibility from the admin (HomePage global). Sections not listed
  // in the config default to visible.
  const sectionMap = Object.fromEntries(
    (homePage?.sections || []).map((s) => [s.type, s.enabled !== false])
  );
  const show = (type) => sectionMap[type] !== false;

  return (
    <>
      <HeaderTop1 />
      <Header1 />
      <Hero hero={homePage} />
      {show("about") && <About />}
      {show("services") && <Services services={services} />}
      <Cta />
      <Skills />
      {show("testimonials") && <Testimonials />}
      {show("projects") && <Projects projects={projects} />}
      {show("apartments") && <Apartments apartments={apartments} />}
      <Faq />
      {show("team") && <Team team={team} />}
      {show("contact") && <Contact />}
      {show("blog") && <Blogs posts={posts} />}
      <div className="brand-section fix section-padding">
        <Brands />
      </div>
      <Footer1 />
    </>
  );
}
