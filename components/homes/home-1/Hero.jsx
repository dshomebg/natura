"use client";
import AnimatedText from "@/components/common/AnimatedText";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import ModalVideo from "react-modal-video";
import { useState } from "react";
export default function Hero() {
  const [isOpen, setOpen] = useState(false);
  const swiperOptions = {
    spaceBetween: 30,
    speed: 2000,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".array-prevs",
      nextEl: ".array-nexts",
    },
    modules: [Autoplay, Navigation],
    breakpoints: {
      1199: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
  };
  const images = [
    "/assets/img/hero/01.jpg",
    "/assets/img/hero/02.jpg",
    "/assets/img/hero/01.jpg",
    "/assets/img/hero/02.jpg",
    // Add more image paths as needed
  ];
  return (
    <>
      <section className="hero-section hero-1 fix section-padding">
        <div className="line-shape">
          <Image
            src="/assets/img/hero/line-shape.png"
            width={365}
            height={603}
            alt="img"
          />
        </div>
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="vector-shape">
                  <Image
                    src="/assets/img/hero/vector.png"
                    width={254}
                    height={296}
                    alt="img"
                  />
                </div>
                <div className="vector-shape-2">
                  <Image
                    src="/assets/img/hero/vector-2.png"
                    width={254}
                    height={296}
                    alt="img"
                  />
                </div>
                <h1 className="splt-txt wow">
                  <AnimatedText text="Create the" />
                  <br /> <AnimatedText text="building you" />
                  <br /> <AnimatedText text="want here" />
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".5s">
                  Proactively pontificate client-centered relationships visavis
                  process centric leadership skills. Credibly.
                </p>
                <div className="hero-button">
                  <Link
                    href={`/about`}
                    className="theme-btn bg-white wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Explore More
                    <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                  <span
                    className="button-text wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <a
                      onClick={() => setOpen(true)}
                      className="video-btn video-popup"
                    >
                      <i className="fa-solid fa-play"></i>
                    </a>
                    <span className="ms-3 d-line">play reel</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-image-items">
                <Swiper {...swiperOptions} className="swiper hero-slider">
                  {images.map((src, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="hero-image">
                        <Image
                          width={475}
                          height={635}
                          src={src}
                          alt={`Hero ${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="array-button">
                    <button className="array-prevs">
                      <Image
                        src="/assets/img/hero/prev.png"
                        width={15}
                        height={11}
                        alt="img"
                      />
                      Previews
                    </button>
                    <button className="array-nexts">
                      Next{" "}
                      <Image
                        src="/assets/img/hero/next.png"
                        width={15}
                        height={11}
                        alt="img"
                      />
                    </button>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
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
