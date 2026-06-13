"use client";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import ModalVideo from "react-modal-video";
import { useState } from "react";
export default function About() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section
        id="about"
        className="about-section fix section-padding scrollSpySection"
      >
        <div className="about-shape-1 float-bob-x">
          <Image
            src="/assets/img/about/about-shape-1.png"
            width={114}
            height={419}
            alt="img"
          />
        </div>
        <div className="about-shape-2 float-bob-x">
          <Image
            src="/assets/img/about/about-shape-2.png"
            width={318}
            height={408}
            alt="img"
          />
        </div>
        <div className="container">
          <div className="about-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="about-image">
                  <Image
                    src="/assets/img/about/01.jpg"
                    alt="img"
                    width={485}
                    height={592}
                    className="wow fadeInLeft"
                    data-wow-delay=".2s"
                  />
                  <div
                    className="about-image-2 wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    <Image
                      src="/assets/img/about/02.jpg"
                      width={260}
                      height={270}
                      alt="img"
                    />
                    <div className="video-box">
                      <a
                        onClick={() => setOpen(true)}
                        className="video-btn video-popup"
                      >
                        <i className="fas fa-play"></i>
                      </a>
                    </div>
                  </div>
                  <div className="about-line-shape">
                    <Image
                      src="/assets/img/about/about-shape-3.png"
                      width={30}
                      height={545}
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title">
                    <h6 className="wow fadeInUp">
                      <i className="fa-regular fa-arrow-left-long"></i>1976
                      Building conpany
                      <i className="fa-regular fa-arrow-right-long"></i>
                    </h6>
                    <h2 className="splt-txt wow">
                      <AnimatedText text="Create The Building You Want Here" />
                    </h2>
                  </div>
                  <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".4s">
                    It is a long established fact that a reader will be
                    distracted the readable content of a page when looking at
                    layout the point of using lorem the is Ipsum less normal
                    distribution of letters.
                  </p>
                  <ul className="list-items wow fadeInUp" data-wow-delay=".2s">
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      Proactively pontificate client-centered relationships
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      Is there a waiting list for desired work to be started
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      Release of Letraset sheets containing Lorem Ipsum
                    </li>
                  </ul>
                  <div className="about-author">
                    <div
                      className="author-image wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <Image
                        src="/assets/img/about/author.png"
                        width={68}
                        height={68}
                        alt="author-img"
                      />
                      <div className="content">
                        <p>Xbuild, CEO</p>
                        <h4>Brooklyn Simmons</h4>
                      </div>
                    </div>
                    <Image
                      src="/assets/img/about/signature.png"
                      alt="img"
                      width={85}
                      height={51}
                      className="wow fadeInUp"
                      data-wow-delay=".4s"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="Cn4G2lZ_g2I"
        onClose={() => setOpen(false)}
      />{" "}
    </>
  );
}
