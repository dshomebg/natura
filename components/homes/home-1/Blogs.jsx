import React from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/common/AnimatedText";
import { mediaUrl, mediaAlt } from "@/lib/media";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("bg-BG", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export default function Blogs({ posts = [] }) {
  const featured = posts[0];
  const list = posts.slice(1, 4);

  return (
    <section
      id="blog"
      className="news-section fix section-padding fix section-bg-2  scrollSpySection"
    >
      <div className="shape-1 float-bob-y">
        <Image
          src="/assets/img/news/shape-1.png"
          width={165}
          height={116}
          alt="img"
        />
      </div>
      <div className="shape-2 float-bob-x">
        <Image
          src="/assets/img/news/shape-2.png"
          width={165}
          height={116}
          alt="img"
        />
      </div>
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            Блог и новини
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Последни новини и статии" />
          </h2>
        </div>
        <div className="row">
          {featured && (
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
              <div
                className="news-image-items bg-cover"
                style={{
                  backgroundImage: `url("${mediaUrl(featured.cover, "feature")}")`,
                }}
              >
                <div className="news-content">
                  <ul>
                    <li>
                      <i className="fa-solid fa-calendar-days" />
                      {fmtDate(featured.publishedDate)}
                    </li>
                    {featured.category &&
                      typeof featured.category === "object" && (
                        <li>
                          <i className="fa-solid fa-tag" />
                          {featured.category.name}
                        </li>
                      )}
                  </ul>
                  <h3>
                    <Link href={`/news-details/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h3>
                  {featured.excerpt && (
                    <p className="text-white">{featured.excerpt}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-6">
            <div className="news-right-items">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="news-card-items wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="news-content">
                    <ul>
                      <li>
                        <i className="fa-solid fa-calendar-days" />
                        {fmtDate(item.publishedDate)}
                      </li>
                      {item.category && typeof item.category === "object" && (
                        <li>
                          <i className="fa-solid fa-tag" />
                          {item.category.name}
                        </li>
                      )}
                    </ul>
                    <h4>
                      <Link href={`/news-details/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>
                    {item.excerpt && <p>{item.excerpt}</p>}
                    <Link
                      href={`/news-details/${item.slug}`}
                      className="link-btn"
                    >
                      Прочети повече{" "}
                      <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                  <div className="news-image">
                    <Image
                      src={mediaUrl(item.cover, "thumbnail")}
                      width={247}
                      height={258}
                      alt={mediaAlt(item.cover, item.title)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
