import { getTeam } from "@/lib/data";
import { mediaUrl, mediaAlt } from "@/lib/media";
import React from "react";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import Link from "next/link";

const socialIcon = {
  facebook: "fab fa-facebook-f",
  instagram: "fab fa-instagram",
  linkedin: "fab fa-linkedin-in",
  twitter: "fab fa-twitter",
  youtube: "fab fa-youtube",
};

export default async function Team() {
  const team = await getTeam();

  return (
    <section className="team-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            нашият екип
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Нашият професионален екип" />
          </h2>
        </div>
        <div className="row">
          {team.map((member) => (
            <div
              key={member.id}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
            >
              <div className="team-box-items">
                {Array.isArray(member.socials) && member.socials.length > 0 && (
                  <div className="social-icon d-grid align-items-center">
                    {member.socials.map((link, index) => (
                      <a key={index} href={link.url || "#"}>
                        <i className={socialIcon[link.platform] || "fa-solid fa-link"} />
                      </a>
                    ))}
                  </div>
                )}
                <div className="team-image">
                  <Image
                    src={mediaUrl(member.photo, "card")}
                    width={240}
                    height={288}
                    alt={mediaAlt(member.photo, member.name)}
                  />
                </div>
                <div className="team-content">
                  <h5>
                    <Link href={`/team-details/${member.id}`}>
                      {member.name}
                    </Link>
                  </h5>
                  {member.position && <p>{member.position}</p>}
                  <Link href={`/team-details/${member.id}`} className="icon">
                    <i className="fa-solid fa-link" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
