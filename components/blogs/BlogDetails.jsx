import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/common/RichText";
import { mediaUrl, mediaAlt } from "@/lib/media";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("bg-BG", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

export default function BlogDetails({ newsItem, recent = [], categories = [] }) {
  const category =
    newsItem.category && typeof newsItem.category === "object"
      ? newsItem.category.name
      : null;
  const author =
    newsItem.author && typeof newsItem.author === "object"
      ? newsItem.author.name
      : null;

  return (
    <section className="news-standard fix section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="blog-post-details">
              <div className="single-blog-post">
                <div
                  className="post-featured-thumb bg-cover"
                  style={{
                    backgroundImage: `url("${mediaUrl(newsItem.cover, "feature")}")`,
                  }}
                />
                <div className="post-content">
                  <ul className="post-list d-flex align-items-center">
                    {author && (
                      <li>
                        <i className="fa-regular fa-user" />
                        {author}
                      </li>
                    )}
                    <li>
                      <i className="fa-solid fa-calendar-days" />
                      {fmtDate(newsItem.publishedDate)}
                    </li>
                    {category && (
                      <li>
                        <i className="fa-solid fa-tag" />
                        {category}
                      </li>
                    )}
                  </ul>
                  <h3>{newsItem.title}</h3>
                  {newsItem.excerpt && <p className="mb-3">{newsItem.excerpt}</p>}
                  <RichText data={newsItem.content} />
                </div>
              </div>
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
