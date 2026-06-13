import { getProjects } from "@/lib/data";
import { mediaUrl, mediaAlt } from "@/lib/media";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section className="project-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.2 * ((index % 3) + 1)}s`}
            >
              <div className="project-card-items">
                <div className="project-image">
                  <Image
                    width={370}
                    height={331}
                    src={mediaUrl(project.cover, "card")}
                    alt={mediaAlt(project.cover, project.title)}
                  />
                </div>
                <div className="project-content">
                  <h3>
                    <Link href={`/project-details/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p>{project.excerpt}</p>
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
