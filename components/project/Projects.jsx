import { projects } from "@/data/projects";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Projects() {
  return (
    <section className="project-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={project.delay}
            >
              <div className="project-card-items">
                <div className="project-image">
                  {project.images.map((image, index) => (
                    <Image
                      key={index}
                      width={370}
                      height={331}
                      src={image}
                      alt="img"
                    />
                  ))}
                </div>
                <div className="project-content">
                  <h3>
                    <Link href={`/project-details/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p>{project.description}</p>
                </div>
                <div className="shape-img">
                  <Image
                    src="/assets/img/project/shape.png"
                    width={57}
                    height={54}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
