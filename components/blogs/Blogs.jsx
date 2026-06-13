import React from "react";
import Pagination from "../common/Pagination";
import { newsItems3 } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
export default function Blogs() {
  return (
    <section className="news-section fix section-padding">
      <div className="container">
        <div className="row g-4">
          {newsItems3.map((news) => (
            <div
              key={news.id}
              className={`col-xl-4 col-lg-6 col-md-6 wow fadeInUp ${
                news.active ? "active" : ""
              }`}
              data-wow-delay={news.delay}
            >
              <div className="news-box-items mt-0">
                <div className="news-image">
                  {news.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      width={370}
                      height={198}
                      alt="img"
                    />
                  ))}
                </div>
                <div className="news-content">
                  <ul className="post-list">
                    <li>{news.category}</li>
                    <li>{news.date}</li>
                  </ul>
                  <h4>
                    <Link href={`/news-details/${news.id}`}>{news.title}</Link>
                  </h4>
                  <div className="author-items">
                    <div className="author-info">
                      <Image
                        src={news.author.image}
                        width={40}
                        height={40}
                        alt="img"
                      />
                      <div className="content">
                        <h6>Admin</h6>
                        <p>{news.author.name}</p>
                      </div>
                    </div>
                    <Link
                      href={`/news-details/${news.id}`}
                      className="link-btn"
                    >
                      Read More <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
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
