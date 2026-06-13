import React from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
export default function Cta() {
  return (
    <section className="cta-banner-section section-padding">
      <div className="container">
        <div
          className="cta-banner-wrapper fix bg-cover"
          style={{ backgroundImage: 'url("/assets/img/cta-bg.jpg")' }}
        >
          <h2 className="splt-txt wow">
            <AnimatedText text="Looking For Best Partner" /> <br />
            <AnimatedText text="For Your" />{" "}
            <b>
              <AnimatedText text="Next Construction" />
            </b>{" "}
            <br />
            <AnimatedText text="Works?" />
          </h2>
          <div className="cta-img wow fadeInUp" data-wow-delay=".4s">
            <Image
              src="/assets/img/cta-img.png"
              width={223}
              height={256}
              alt="img"
            />
            <div className="shape-img">
              <Image
                src="/assets/img/cta-shape.png"
                width={225}
                height={242}
                alt="img"
              />
            </div>
          </div>
          <Link
            href={`/contact`}
            className="theme-btn bg-white wow fadeInUp"
            data-wow-delay=".6s"
          >
            contact us
            <i className="fa-regular fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
