"use client";
import React from "react";
import { useSiteData } from "@/lib/SiteContext";
import { socialIcon } from "@/lib/socials";

export default function HeaderTop1() {
  const { settings } = useSiteData();
  const socials = settings?.socials || [];

  return (
    <div className="header-top-section section-bg pt-3 pb-3">
      <div className="container-fluid">
        <div className="header-top-wrapper">
          <span>
            <i className="fa-regular fa-clock"></i>{" "}
            {settings?.workingHours || "Пон–Пет: 9:00–18:00"}
          </span>
          {socials.length > 0 && (
            <div className="social-icon d-flex align-items-center">
              <span>Последвайте ни:</span>
              {socials.map((s, i) => (
                <a key={i} href={s.url || "#"}>
                  <i
                    className={socialIcon[s.platform] || "fa-solid fa-link"}
                  ></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
