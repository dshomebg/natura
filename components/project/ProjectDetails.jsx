import React from "react";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import RichText from "@/components/common/RichText";
import { mediaUrl, mediaAlt } from "@/lib/media";

const statusLabels = {
  completed: "Завършен",
  in_progress: "В процес",
  upcoming: "Предстоящ",
};

export default function ProjectDetails({ projectItem }) {
  const gallery = Array.isArray(projectItem.gallery) ? projectItem.gallery : [];
  const category =
    projectItem.category && typeof projectItem.category === "object"
      ? projectItem.category.name
      : null;
  const completed = projectItem.completedDate
    ? new Date(projectItem.completedDate).toLocaleDateString("bg-BG", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <section className="project-details-section fix section-padding">
      <div className="container">
        <div className="project-details-wrapper">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="project-details-items">
                <div className="details-image">
                  <Image
                    src={mediaUrl(projectItem.cover, "feature")}
                    width={1170}
                    height={556}
                    alt={mediaAlt(projectItem.cover, projectItem.title)}
                  />
                </div>
                <div className="project-details-content">
                  {category && <p className="mb-2">{category}</p>}
                  <h2 className="splt-txt wow">
                    <AnimatedText text={projectItem.title} />
                  </h2>

                  {projectItem.excerpt && (
                    <p className="mb-3 mt-3">{projectItem.excerpt}</p>
                  )}

                  <div className="project-infor-wrapper">
                    <div className="row g-4">
                      <div className="col-xl-7">
                        <RichText data={projectItem.description} />
                      </div>
                      <div className="col-xl-5">
                        <div className="project-nformation">
                          <h4>Информация за проекта</h4>
                          <ul>
                            {category && (
                              <li>
                                Категория:<span>{category}</span>
                              </li>
                            )}
                            {projectItem.location && (
                              <li>
                                Локация:<span>{projectItem.location}</span>
                              </li>
                            )}
                            {completed && (
                              <li>
                                Завършен:<span>{completed}</span>
                              </li>
                            )}
                            {projectItem.status && (
                              <li className="pb-0">
                                Статус:
                                <span>
                                  {statusLabels[projectItem.status] ||
                                    projectItem.status}
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {gallery.length > 0 && (
                    <>
                      <h3 className="mt-3 mb-3">Галерия</h3>
                      <div className="row g-4">
                        {gallery.map((image, index) => (
                          <div className="col-md-6" key={index}>
                            <div className="details-image">
                              <Image
                                src={mediaUrl(image, "feature")}
                                alt={mediaAlt(image, projectItem.title)}
                                width={570}
                                height={309}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
