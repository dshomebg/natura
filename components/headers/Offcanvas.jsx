"use client";

import { closeMobilemenu } from "@/utlis/toggleMobilemenu";
import Link from "next/link";
import Image from "next/image";
import { useSiteData } from "@/lib/SiteContext";
import { mediaUrl } from "@/lib/media";
import { socialIcon } from "@/lib/socials";

export default function Offcanvas({ children }) {
  const { settings, header } = useSiteData();
  const socials = settings?.socials || [];
  const logo =
    settings?.logo && typeof settings.logo === "object"
      ? mediaUrl(settings.logo)
      : "/assets/img/logo/black-logo.svg";
  return (
    <>
      <div className="fix-area">
        <div className="offcanvas__info ">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      width={149}
                      height={64}
                      alt={settings?.siteName || "NATURA"}
                      style={{ width: "auto", height: "auto", maxHeight: 64 }}
                    />
                  </Link>
                </div>
                <div
                  onClick={() => closeMobilemenu()}
                  className="offcanvas__close"
                >
                  <button>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="mobile-menu fix mb-3 mean-container">
                <div className="mean-bar">
                  <a
                    href="#nav"
                    className="meanmenu-reveal"
                    style={{ right: 0, left: "auto", display: "inline" }}
                  >
                    <span>
                      <span>
                        <span />
                      </span>
                    </span>
                  </a>
                  <nav className="mean-nav">
                    <ul style={{ display: "none" }}>{children}</ul>
                  </nav>
                </div>
              </div>

              <div className="offcanvas__contact">
                <h4>Контакти</h4>
                <ul>
                  {settings?.address && (
                    <li className="d-flex align-items-center">
                      <div className="offcanvas__contact-icon">
                        <i className="fal fa-map-marker-alt" />
                      </div>
                      <div className="offcanvas__contact-text">
                        {settings.address}
                      </div>
                    </li>
                  )}
                  {settings?.email && (
                    <li className="d-flex align-items-center">
                      <div className="offcanvas__contact-icon mr-15">
                        <i className="fal fa-envelope" />
                      </div>
                      <div className="offcanvas__contact-text">
                        <a href={`mailto:${settings.email}`}>{settings.email}</a>
                      </div>
                    </li>
                  )}
                  {settings?.workingHours && (
                    <li className="d-flex align-items-center">
                      <div className="offcanvas__contact-icon mr-15">
                        <i className="fal fa-clock" />
                      </div>
                      <div className="offcanvas__contact-text">
                        {settings.workingHours}
                      </div>
                    </li>
                  )}
                  {settings?.phone && (
                    <li className="d-flex align-items-center">
                      <div className="offcanvas__contact-icon mr-15">
                        <i className="far fa-phone" />
                      </div>
                      <div className="offcanvas__contact-text">
                        <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                          {settings.phone}
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
                <div className="header-button mt-4">
                  <Link
                    href={header?.ctaHref || "/contact"}
                    className="theme-btn text-center"
                  >
                    <span>
                      {header?.ctaLabel || "Запитване"}
                      <i className="fa-solid fa-arrow-right-long" />
                    </span>
                  </Link>
                </div>
                {socials.length > 0 && (
                  <div className="social-icon d-flex align-items-center">
                    {socials.map((s, i) => (
                      <a key={i} href={s.url || "#"}>
                        <i className={socialIcon[s.platform] || "fa-solid fa-link"} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas__overlay " onClick={() => closeMobilemenu()} />
    </>
  );
}
