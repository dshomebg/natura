import Link from "next/link";
import Image from "next/image";
import { mediaUrl, mediaAlt } from "@/lib/media";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("bg-BG", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export default function Blogs2({ posts = [], recent = [], categories = [] }) {
  return (
    <section className="news-standard fix section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="news-standard-wrapper">
              {posts.length === 0 && <p>Все още няма публикации.</p>}
              {posts.map((item) => (
                <div className="news-standard-items" key={item.id}>
                  <div className="news-thumb">
                    <Image
                      src={mediaUrl(item.cover, "feature")}
                      width={740}
                      height={396}
                      alt={mediaAlt(item.cover, item.title)}
                    />
                  </div>
                  <div className="news-content">
                    <ul className="date-list">
                      <li>
                        <i className="fa-regular fa-calendar-days" />
                        {fmtDate(item.publishedDate)}
                      </li>
                      {item.category && typeof item.category === "object" && (
                        <li>
                          <i className="fa-regular fa-tag" />
                          {item.category.name}
                        </li>
                      )}
                    </ul>
                    <h3>
                      <Link href={`/news-details/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    {item.excerpt && <p>{item.excerpt}</p>}
                    <div className="news-button">
                      <Link
                        href={`/news-details/${item.slug}`}
                        className="theme-btn mt-4"
                      >
                        Прочети повече{" "}
                        <i className="fa-regular fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="main-sidebar">
              {categories.length > 0 && (
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Категории</h3>
                  </div>
                  <div className="news-widget-categories">
                    <ul>
                      {categories.map((c) => (
                        <li key={c.id}>
                          <Link href={`/news`}>{c.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {recent.length > 0 && (
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Последни публикации</h3>
                  </div>
                  <div className="recent-post-area">
                    {recent.map((item) => (
                      <div className="recent-items" key={item.id}>
                        <div className="recent-thumb">
                          <Image
                            src={mediaUrl(item.cover, "thumbnail")}
                            width={70}
                            height={70}
                            alt={mediaAlt(item.cover, item.title)}
                          />
                        </div>
                        <div className="recent-content">
                          <ul>
                            <li>
                              <i className="fa-solid fa-calendar-days" />
                              {fmtDate(item.publishedDate)}
                            </li>
                          </ul>
                          <h6>
                            <Link href={`/news-details/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
