import React from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import { mediaUrl, mediaAlt } from "@/lib/media";

const socialIcon = {
  facebook: "fab fa-facebook-f",
  instagram: "fab fa-instagram",
  linkedin: "fab fa-linkedin-in",
  twitter: "fab fa-twitter",
  youtube: "fab fa-youtube",
};

export default function TeamDetails({ teamMember }) {
  const socials = Array.isArray(teamMember.socials) ? teamMember.socials : [];

  return (
    <section className="team-details-section fix section-padding">
      <div className="container">
        <div className="team-details-wrapper">
          <div className="team-details-items">
            <div className="details-image">
              <Image
                src={mediaUrl(teamMember.photo, "card")}
                width={370}
                height={466}
                alt={mediaAlt(teamMember.photo, teamMember.name)}
              />
            </div>
            <div className="team-details-content">
              <div className="details-header">
                <h3>{teamMember.name}</h3>
                {teamMember.position && <span>{teamMember.position}</span>}
              </div>
              {teamMember.bio && <p className="cont">{teamMember.bio}</p>}
              {socials.length > 0 && (
                <div className="social-icon d-flex align-items-center">
                  {socials.map((link, index) => (
                    <a key={index} href={link.url || "#"}>
                      <i className={socialIcon[link.platform] || "fa-solid fa-link"} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          {teamMember.bio && (
            <div className="personal-skills-items">
              <div className="row g-5">
                <div className="col-lg-12">
                  <h3 className="mb-3 splt-txt wow">
                    <AnimatedText text="За мен" />
                  </h3>
                  <p>{teamMember.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
