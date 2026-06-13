"use client";
import Link from "next/link";
import Image from "next/image";
import { services2 } from "@/data/services";
import { footerLinks } from "@/data/menu";
import { Gallery, Item } from "react-photoswipe-gallery";
import { galleryImages } from "@/data/gallery";
import "photoswipe/dist/photoswipe.css";
import React from "react";
import { socialLinks } from "@/data/blogs";

export default function Footer1() {
  return (
    <footer
      className="footer-section bg-cover bg-cover"
      style={{ backgroundImage: 'url("/assets/img/footer/bg.jpg")' }}
    >
      <div className="container">
        <div className="contact-info-area">
          <Link
            href={`/`}
            className="logo-img wow fadeInUp"
            data-wow-delay=".2s"
          >
            <Image
              src="/assets/img/logo/black-logo.svg"
              width={149}
              height={64}
              alt="img"
            />
          </Link>
          <div className="contact-info-items wow fadeInUp" data-wow-delay=".4s">
            <div className="icon">
              <i className="fa-sharp fa-solid fa-location-dot" />
            </div>
            <div className="content">
              <p>Office location</p>
              <h3>4648 Rocky, New York</h3>
            </div>
          </div>
          <div className="contact-info-items wow fadeInUp" data-wow-delay=".6s">
            <div className="icon">
              <i className="fa-solid fa-envelope" />
            </div>
            <div className="content">
              <p>send email</p>
              <h3>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </h3>
            </div>
          </div>
          <div className="contact-info-items wow fadeInUp" data-wow-delay=".8s">
            <div className="icon">
              <i className="fa-solid fa-phone-volume" />
            </div>
            <div className="content">
              <p>call emergency</p>
              <h3>
                <a href="tel:+88012365499">+88 0123 654 99</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="footer-widgets-wrapper">
          <div className="row">
            <div
              className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h5>About Company</h5>
                </div>
                <div className="footer-content">
                  <p>
                    Nullam interdum libero vitae pretium aliquam <br />
                    donec nibh purus laoreet in ullamcorper vel <br />
                    malesuada sit amet enim.
                  </p>
                  <div className="social-icon d-flex align-items-center">
                    {socialLinks.map((elm, i) => (
                      <a key={i} href={elm.href}>
                        <i className={elm.iconClass} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h5>Quick Link</h5>
                </div>
                <ul className="list-area">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <i className="fa-solid fa-chevrons-right" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h5>Our Services</h5>
                </div>
                <ul className="list-area">
                  {services2.map((elm, i) => (
                    <li key={i}>
                      <Link href={`/service-details/${elm.id}`}>
                        <i className="fa-solid fa-chevrons-right" />
                        {elm.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp"
              data-wow-delay=".8s"
            >
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h5>Instagram</h5>
                </div>
                <Gallery>
                  <div className="footer-gallery">
                    <div className="gallery-wrap">
                      <div className="gallery-item">
                        {galleryImages.slice(0, 3).map((image, index) => (
                          <div key={index} className="thumb">
                            <a className="img-popup">
                              <Item
                                original={image.src}
                                thumbnail={image.src}
                                width={200}
                                height={200}
                              >
                                {({ ref, open }) => (
                                  <React.Fragment>
                                    <Image
                                      ref={ref}
                                      src={image.src}
                                      alt="gallery-img"
                                      width={80}
                                      height={80}
                                    />
                                    <div onClick={open} className="icon">
                                      <i className="far fa-plus" />
                                    </div>
                                  </React.Fragment>
                                )}
                              </Item>
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="gallery-item">
                        {galleryImages.slice(3, 6).map((image, index) => (
                          <div key={index} className="thumb">
                            <a className="img-popup">
                              <Item
                                original={image.src}
                                thumbnail={image.src}
                                width={200}
                                height={200}
                              >
                                {({ ref, open }) => (
                                  <React.Fragment>
                                    <Image
                                      ref={ref}
                                      src={image.src}
                                      alt="gallery-img"
                                      width={80}
                                      height={80}
                                    />
                                    <div onClick={open} className="icon">
                                      <i className="far fa-plus" />
                                    </div>
                                  </React.Fragment>
                                )}
                              </Item>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Gallery>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © All Copyright 2024 by <Link href={`/`}>Xbuild</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
