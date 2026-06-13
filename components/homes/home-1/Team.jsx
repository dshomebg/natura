import React from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import { mediaUrl, mediaAlt } from "@/lib/media";
import { socialIcon } from "@/lib/socials";

export default function Team({ team = [] }) {
  return (
    <section
      id="team"
      className="team-section fix section-padding bg-cover  scrollSpySection"
      style={{ backgroundImage: 'url("/assets/img/team/bg-shape.png")' }}
    >
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            нашият екип
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Нашият експертен екип" />
          </h2>
        </div>
        <div className="row">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.2 * ((idx % 4) + 1)}s`}
            >
              <div className={`team-card-items ${idx === 1 ? "active" : ""}`}>
                <div className="team-image">
                  <Image
                    src={mediaUrl(member.photo, "card")}
                    width={238}
                    height={294}
                    alt={mediaAlt(member.photo, member.name)}
                  />
                  {Array.isArray(member.socials) &&
                    member.socials.length > 0 && (
                      <div className="social-icon d-flex align-items-center">
                        {member.socials.map((link, index) => (
                          <a key={index} href={link.url || "#"}>
                            <i
                              className={
                                socialIcon[link.platform] || "fa-solid fa-link"
                              }
                            />
                          </a>
                        ))}
                      </div>
                    )}
                </div>
                <div className="team-content">
                  {member.position && <span>{member.position}</span>}
                  <h3>
                    <Link href={`/team-details/${member.id}`}>
                      {member.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
