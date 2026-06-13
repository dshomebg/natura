"use client";
import React from "react";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import { useSiteData } from "@/lib/SiteContext";

export default function ContactInfo() {
  const { settings } = useSiteData();

  return (
    <section className="contact-info-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            КОНТАКТИ
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Нашата контактна информация" />
          </h2>
        </div>
        <div className="row">
          <div
            className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".2s"
          >
            <div className="contact-box-items">
              <div className="icon">
                <Image
                  src="/assets/img/icon/18.svg"
                  width={50}
                  height={50}
                  alt="img"
                />
              </div>
              <div className="content">
                <h3>Адрес</h3>
                <p>{settings?.address || "—"}</p>
              </div>
            </div>
          </div>
          <div
            className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".4s"
          >
            <div className="contact-box-items">
              <div className="icon">
                <Image
                  src="/assets/img/icon/19.svg"
                  width={46}
                  height={28}
                  alt="img"
                />
              </div>
              <div className="content">
                <h3>Телефон и имейл</h3>
                <p>
                  {settings?.phone && (
                    <>
                      Тел.:{" "}
                      <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                        {settings.phone}
                      </a>
                      <br />
                    </>
                  )}
                  {settings?.email && (
                    <>
                      Имейл:{" "}
                      <a href={`mailto:${settings.email}`}>{settings.email}</a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".6s"
          >
            <div className="contact-box-items">
              <div className="icon">
                <Image
                  src="/assets/img/icon/20.svg"
                  width={50}
                  height={50}
                  alt="img"
                />
              </div>
              <div className="content">
                <h3>Работно време</h3>
                <p>{settings?.workingHours || "Пон–Пет: 9:00–18:00"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
