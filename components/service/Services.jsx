import React from "react";
import { getServices } from "@/lib/data";
import { mediaUrl, mediaAlt } from "@/lib/media";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";

export default async function Services() {
  const services = await getServices();

  return (
    <section className="service-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long"></i>КАКВО ПРЕДЛАГАМЕ
            <i className="fa-regular fa-arrow-right-long"></i>
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Изграждаме сградата," /> <br />
            <AnimatedText text="която искате" />
          </h2>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.2 * ((index % 3) + 1)}s`}
            >
              <div className="service-box-items items-bg">
                <div className="service-thumb">
                  <Image
                    src={mediaUrl(service.icon, "card")}
                    width={346}
                    height={236}
                    alt={mediaAlt(service.icon, service.title)}
                  />
                </div>
                <div className="service-content">
                  <h2 className="number">
                    {String(index + 1).padStart(2, "0")}
                  </h2>
                  <h3>
                    <Link href={`/service-details/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>
                  {service.excerpt && <p>{service.excerpt}</p>}
                  <Link
                    href={`/service-details/${service.slug}`}
                    className="link-btn"
                  >
                    Научи повече <i className="fa-solid fa-arrow-right" />
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
