"use client";
import { testimonials } from "@/data/testimonials";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
export default function Testimonials() {
  const swiperOptions = {
    spaceBetween: 30,
    speed: 2000,
    loop: true,
    modules: [Autoplay, Navigation],
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".snbp2",
      prevEl: ".snbn2",
    },
  };
  return (
    <section className="testimonial-section fix section-padding section-bg">
      <div className="arrow-shape float-bob-y">
        <Image
          src="/assets/img/testimonial/arrow-shape.png"
          width={202}
          height={291}
          alt="img"
        />
      </div>
      <div className="building-shape float-bob-x">
        <Image
          src="/assets/img/testimonial/building-shape.png"
          width={931}
          height={520}
          alt="img"
        />
      </div>
      <div className="testimonial-image">
        <Image
          src="/assets/img/testimonial/testimonial-image.jpg"
          width={745}
          height={708}
          alt="img"
        />
      </div>
      <div className="container">
        <div className="testimonial-wrapper">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="testimonial-content">
                <div className="section-title">
                  <h6 className="wow fadeInUp">
                    <i className="fa-regular fa-arrow-left-long" />
                    testimonials
                    <i className="fa-regular fa-arrow-right-long" />
                  </h6>
                  <h2 className="text-white splt-txt wow">
                    <AnimatedText text="What Client’s Say" /> <br />
                    <AnimatedText text="About Us!" />
                  </h2>
                </div>
                <Swiper
                  {...swiperOptions}
                  className="swiper testimonial-slider mt-3 mt-md-0"
                >
                  {testimonials.map((text, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="testi-content">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path d="M0 4V28L12 16V4H0Z" fill="#F55B1F" />
                            <path d="M20 4V28L32 16V4H20Z" fill="#F55B1F" />
                          </svg>
                          <h4>{text}</h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="client-img-items">
                  <div className="client-image-area">
                    <div className="client-img">
                      <Image
                        src="/assets/img/testimonial/client-1.png"
                        alt="img"
                        width={81}
                        height={89}
                      />
                    </div>
                    <div className="client-img">
                      <Image
                        src="/assets/img/testimonial/client-2.png"
                        alt="img"
                        width={81}
                        height={89}
                      />
                    </div>
                    <div className="client-img">
                      <Image
                        src="/assets/img/testimonial/client-3.png"
                        alt="img"
                        width={81}
                        height={89}
                      />
                    </div>
                  </div>
                  <div className="array-button">
                    <button className="array-prev snbp2">
                      <i className="fa-solid fa-arrow-left-long" />
                    </button>
                    <button className="array-next snbn2">
                      <i className="fa-solid fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
