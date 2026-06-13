import React from "react";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import { skills } from "@/data/skills";
export default function Skills() {
  return (
    <section className="skills-section fix section-padding pt-0">
      <div className="shape-1 float-bob-x">
        <Image
          src="/assets/img/skills/shape-1.png"
          width={135}
          height={99}
          alt="img"
        />
      </div>
      <div className="shape-2 float-bob-y">
        <Image
          src="/assets/img/skills/shape-2.png"
          width={310}
          height={344}
          alt="img"
        />
      </div>
      <div className="container">
        <div className="skills-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-lg-7 wow fadeInUp" data-wow-delay=".2s">
                  <div className="skills-image">
                    <Image
                      src="/assets/img/skills/01.jpg"
                      width={324}
                      height={520}
                      alt="img"
                    />
                    <div className="logo-shape">
                      <Image
                        src="/assets/img/skills/logo.png"
                        width={153}
                        height={167}
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 wow fadeInUp" data-wow-delay=".4s">
                  <div className="skills-image">
                    <Image
                      src="/assets/img/skills/02.jpg"
                      width={227}
                      height={520}
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="skill-content">
                <div className="section-title">
                  <h6 className="wow fadeInUp">
                    <i className="fa-regular fa-arrow-left-long" />
                    our skills
                    <i className="fa-regular fa-arrow-right-long" />
                  </h6>
                  <h2 className="splt-txt wow">
                    <AnimatedText text="We Are Giving You A Chance To Build Your Dream" />
                  </h2>
                </div>
                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".4s">
                  It is a long established fact that a reader will be distracted
                  the readable content of a page when looking at layout the
                  point of using lorem the is Ipsum less normal distribution of
                  letters.
                </p>
                <div className="skill-feature-items">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="skill-feature wow fadeInUp"
                      data-wow-delay={skill.delay}
                    >
                      <h3 className="box-title">{skill.title}</h3>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${skill.percentage}%`,
                            animation:
                              "2.6s ease 0s 1 normal none running animate-positive",
                            opacity: 1,
                          }}
                        >
                          <div className="progress-value">
                            <span className="counter-number2">
                              {skill.percentage}
                            </span>
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
