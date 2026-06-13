"use client";
import Nav from "./Nav";
import Link from "next/link";
import Offcanvas from "./Offcanvas";
import { openMobilemenu } from "@/utlis/toggleMobilemenu";
import Image from "next/image";
import { useSiteData } from "@/lib/SiteContext";

export default function Header1() {
  const { settings, header } = useSiteData();
  return (
    <>
      <header className="header-section">
        <div className="container-fluid">
          <div className="main-header-wrapper">
            <div className="logo-image">
              <Link href={`/`}>
                <Image
                  src="/assets/img/logo/black-logo.svg"
                  width={149}
                  height={64}
                  alt="img"
                />
              </Link>
            </div>
            <div className="main-header-items">
              <div className="header-contact-info-area">
                {settings?.address && (
                  <div className="contact-info-items">
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-location-dot"></i>
                    </div>
                    <div className="content">
                      <p>Адрес</p>
                      <h3>{settings.address}</h3>
                    </div>
                  </div>
                )}
                {settings?.email && (
                  <div className="contact-info-items">
                    <div className="icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="content">
                      <p>Имейл</p>
                      <h3>
                        <a href={`mailto:${settings.email}`}>
                          {settings.email}
                        </a>
                      </h3>
                    </div>
                  </div>
                )}
                {settings?.phone && (
                  <div className="contact-info-items style-2">
                    <div className="icon">
                      <i className="fa-solid fa-phone-volume"></i>
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
                <div className="header-button">
                  <Link
                    href={header?.ctaHref || "/contact"}
                    className="theme-btn"
                  >
                    {header?.ctaLabel || "Запитване"}{" "}
                    <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div id="header-sticky" className="header-1">
                <div className="mega-menu-wrapper">
                  <div className="header-main">
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
                    <div className="header-left">
                      <div className="mean__menu-wrapper">
                        <div className="main-menu">
                          <nav id="mobile-menu">
                            <ul>
                              <Nav />
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div className="header-right d-flex justify-content-end align-items-center">
                      <a
                        href="#0"
                        onClick={() =>
                          document
                            .getElementById("searchWrap")
                            .classList.add("active")
                        }
                        className="search-trigger search-icon"
                      >
                        <i className="fal fa-search"></i>
                      </a>
                      <div className="header__hamburger d-xl-block my-auto">
                        <div
                          onClick={() => openMobilemenu()}
                          className="sidebar__toggle"
                        >
                          <i className="fas fa-bars"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas>
        <Nav />
      </Offcanvas>
    </>
  );
}
