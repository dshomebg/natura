import React from "react";
import Pagination from "../common/Pagination";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
export default function Services() {
  return (
    <section className="service-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long"></i>WHAT WE OFFER
            <i className="fa-regular fa-arrow-right-long"></i>
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Create The Building" /> <br />
            <AnimatedText text="You Want Here" />
          </h2>
        </div>
        <div className="row">
          {services.map((service) => (
            <div
              key={service.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={service.delay}
            >
              <div className="service-box-items items-bg">
                <div className="service-thumb">
                  <Image
                    src={service.image}
                    width={346}
                    height={236}
                    alt="img"
                  />
                  <div className="icon">
                    <Image
                      src={service.icon}
                      width={32}
                      height={32}
                      alt="img"
                    />
                  </div>
                </div>
                <div className="service-content">
                  <h2 className="number">{service.number}</h2>
                  <h3>
                    <Link href={`/service-details/${service.id}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p>{service.description}</p>
                  <Link
                    href={`/service-details/${service.id}`}
                    className="link-btn"
                  >
                    Explore More <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="page-nav-wrap pt-5 text-center wow fadeInUp"
          data-wow-delay=".3s"
        >
          <ul>
            <Pagination />
          </ul>
        </div>
      </div>
    </section>
  );
}
