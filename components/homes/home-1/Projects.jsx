"use client";
import Link from "next/link";
import AnimatedText from "@/components/common/AnimatedText";
import { useRef } from "react";

const bgClasses = ["", "bg-1", "bg-2", "bg-3", "bg-4"];

export default function Projects({ projects = [] }) {
  const parentRefs = useRef([]);
  const handleProjectHover = (index) => {
    parentRefs.current.forEach((el) => el && el.classList.remove("active"));
    if (parentRefs.current[index])
      parentRefs.current[index].classList.add("active");
  };

  return (
    <section
      id="projects"
      className="project-section fix section-padding  scrollSpySection"
    >
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            нашите проекти
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Нашите последни проекти" />
          </h2>
        </div>
      </div>
      <div className="container-fluid">
        <div className="project-wrapper">
          <div className="main-box">
            {projects.map((elm, i) => (
              <div
                onMouseOver={() => handleProjectHover(i)}
                ref={(el) => (parentRefs.current[i] = el)}
                key={elm.id || i}
                className={`box wow fadeInUp ${bgClasses[i % bgClasses.length]} ${
                  i === 2 ? "active" : ""
                }`}
                data-wow-delay={`${0.2 * ((i % 4) + 1)}s`}
              >
                <div className="project-content">
                  <h3>
                    <Link href={`/project-details/${elm.slug}`}>
                      {elm.title}
                    </Link>
                  </h3>
                  <Link href={`/project-details/${elm.slug}`} className="icon">
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
