"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSiteData } from "@/lib/SiteContext";
import { socialIcon } from "@/lib/socials";
import { mediaUrl } from "@/lib/media";

export default function Footer1() {
  const { settings, footer } = useSiteData();
  const socials = settings?.socials || [];
  const columns = footer?.columns || [];
  const logo =
    settings?.logo && typeof settings.logo === "object"
      ? mediaUrl(settings.logo)
      : "/assets/img/logo/black-logo.svg";

  return (
    <footer
      className="footer-section bg-cover bg-cover"
      style={{ backgroundImage: 'url("/assets/img/footer/bg.jpg")' }}
    >
      <div className="container">
        <div className="contact-info-area">
          <Link href={`/`} className="logo-img wow fadeInUp" data-wow-delay=".2s">
            <Image src={logo} width={149} height={64} alt="NATURA" />
          </Link>
          {settings?.address && (
            <div className="contact-info-items wow fadeInUp" data-wow-delay=".4s">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-location-dot" />
              </div>
              <div className="content">
                <p>Адрес</p>
                <h3>{settings.address}</h3>
              </div>
            </div>
          )}
          {settings?.email && (
            <div className="contact-info-items wow fadeInUp" data-wow-delay=".6s">
              <div className="icon">
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="content">
                <p>Имейл</p>
                <h3>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </h3>
              </div>
            </div>
          )}
          {settings?.phone && (
            <div className="contact-info-items wow fadeInUp" data-wow-delay=".8s">
              <div className="icon">
                <i className="fa-solid fa-phone-volume" />
              </div>
              <div className="content">
                <p>Телефон</p>
                <h3>
                  <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                    {settings.phone}
                  </a>
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="footer-widgets-wrapper">
          <div className="row">
            <div
              className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h5>{settings?.siteName || "NATURA"}</h5>
                </div>
                <div className="footer-content">
                  {footer?.about && <p>{footer.about}</p>}
                  {socials.length > 0 && (
                    <div className="social-icon d-flex align-items-center">
                      {socials.map((s, i) => (
                        <a key={i} href={s.url || "#"}>
                          <i
                            className={
                              socialIcon[s.platform] || "fa-solid fa-link"
                            }
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {columns.map((col, ci) => (
              <div
                key={ci}
                className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp"
                data-wow-delay={`${0.4 + ci * 0.2}s`}
              >
                <div className="single-footer-widget">
                  <div className="widget-head">
                    <h5>{col.title}</h5>
                  </div>
                  <ul className="list-area">
                    {(col.links || []).map((link, li) => (
                      <li key={li}>
                        <Link href={link.href || "#"}>
                          <i className="fa-solid fa-chevrons-right" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer?.copyright || "© NATURA"}</p>
        </div>
      </div>
    </footer>
  );
}
