"use client";
import Nav from "./Nav";
import Link from "next/link";
import Offcanvas from "./Offcanvas";
import { openMobilemenu } from "@/utlis/toggleMobilemenu";
import Image from "next/image";
import { useSiteData } from "@/lib/SiteContext";
import { socialIcon } from "@/lib/socials";

export default function Header2() {
  const { settings, header } = useSiteData();
  const socials = settings?.socials || [];
  return (
    <>
      <header className="header-section-2">
        <div className="container-fluid">
          <div className="header-top-wrapper-2">
            <ul className="contact-list">
              {settings?.email && (
                <li>
                  <i className="far fa-envelope" />
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              )}
              {settings?.address && (
                <li>
                  <i className="fa-sharp fa-solid fa-location-dot" />
                  {settings.address}
                </li>
              )}
              {settings?.phone && (
                <li>
                  <i className="fa-regular fa-phone" />
                  <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
            <div className="top-right">
              <ul className="text-list">
                <li>
                  <Link href={`/contact`}>Контакти</Link>
                </li>
              </ul>
              {socials.length > 0 && (
                <div className="social-icon d-flex align-items-center">
                  {socials.map((s, i) => (
                    <a key={i} href={s.url || "#"}>
                      <i
                        className={socialIcon[s.platform] || "fa-solid fa-link"}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div id="header-sticky" className="header-2">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <div className="logo">
                    <Link href={`/`} className="header-logo">
                      <Image
                        src="/assets/img/logo/black-logo.svg"
                        alt="logo-img"
                        width={149}
                        height={64}
                      />
                    </Link>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <ul>
                          <Nav />
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="header-button">
                    <Link
                      href={header?.ctaHref || "/contact"}
                      className="theme-btn"
                    >
                      {header?.ctaLabel || "Запитване"}{" "}
                      <i className="fa-regular fa-arrow-right" />
                    </Link>
                  </div>
                  <div className="search-item">
                    <a
                      onClick={() =>
                        document
                          .getElementById("searchWrap")
                          .classList.add("active")
                      }
                      className="search-trigger search-icon"
                    >
                      <i className="fal fa-search" />
                    </a>
                    <div className="header__hamburger d-xl-block my-auto">
                      <div
                        onClick={() => openMobilemenu()}
                        className="sidebar__toggle"
                      >
                        <i className="fas fa-bars" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>{" "}
      <Offcanvas>
        <Nav />
      </Offcanvas>
    </>
  );
}
