"use client";
import Image from "next/image";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { links, listItems, recentItems, socialLinks } from "@/data/blogs";
import Link from "next/link";
export default function BlogDetails({ newsItem }) {
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
                    backgroundImage: 'url("/assets/img/news/post-4.jpg")',
                  }}
                />
                <div className="post-content">
                  <ul className="post-list d-flex align-items-center">
                    <li>
                      <i className="fa-regular fa-user" />
                      By Admin
                    </li>
                    <li>
                      <i className="fa-solid fa-calendar-days" />
                      18 Dec, 2024
                    </li>
                    <li>
                      <i className="fa-solid fa-tag" />
                      Technology
                    </li>
                  </ul>
                  <h3>{newsItem.title}</h3>
                  <p className="mb-3">
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore of magna aliqua. Ut enim ad
                    minim veniam, made of owl the quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea dolor commodo
                    consequat. Duis aute irure and dolor in reprehenderit.
                  </p>
                  <p className="mb-3">
                    The is ipsum dolor sit amet consectetur adipiscing elit.
                    Fusce eleifend porta arcu In hac habitasse the is platea
                    augue thelorem turpoi dictumst. In lacus libero faucibus at
                    malesuada sagittis placerat eros sed istincidunt augue ac
                    ante rutrum sed the is sodales augue consequat.
                  </p>
                  <p>
                    Nulla facilisi. Vestibulum tristique sem in eros eleifend
                    imperdiet. Donec quis convallis neque. In id lacus pulvinar
                    lacus, eget vulputate lectus. Ut viverra bibendum lorem, at
                    tempus nibh mattis in. Sed a massa eget lacus consequat
                    auctor.
                  </p>
                  <div className="hilight-text mt-4 mb-4">
                    <p>
                      Pellentesque sollicitudin congue dolor non aliquam. Morbi
                      volutpat, nisi vel ultricies urnacondimentum, sapien neque
                      lobortis tortor, quis efficitur mi ipsum eu metus.
                      Praesent eleifend orci sit amet est vehicula.
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        d="M7.71428 20.0711H0.5V5.64258H14.9286V20.4531L9.97665 30.3568H3.38041L8.16149 20.7947L8.5233 20.0711H7.71428Z"
                        stroke="#F55B1F"
                      />
                      <path
                        d="M28.2846 20.0711H21.0703V5.64258H35.4989V20.4531L30.547 30.3568H23.9507L28.7318 20.7947L29.0936 20.0711H28.2846Z"
                        stroke="#F55B1F"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 mb-5">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                    massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                    sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat. In iaculis arcu eros.
                  </p>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="details-image">
                        <Image
                          src="/assets/img/news/post-5.jpg"
                          width={370}
                          height={269}
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="details-image">
                        <Image
                          src="/assets/img/news/post-6.jpg"
                          width={370}
                          height={269}
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="pt-5">
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore of magna aliqua. Ut enim ad
                    minim veniam, made of owl the quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea dolor commodo
                    consequat. Duis aute irure and dolor in
                    reprehenderit.Consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore of magna aliqua. Ut
                    enim ad minim veniam, made of owl the quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea dolor
                    commodo consequat. Duis aute irure and dolor in
                    reprehenderit.
                  </p>
                </div>
              </div>
              <div className="row tag-share-wrap mt-4 mb-5">
                <div className="col-lg-8 col-12">
                  <div className="tagcloud">
                    <span>Tags:</span>
                    <a href="#">Travel</a>
                    <a href="#">Services</a>
                    <a href="#">Agency</a>
                  </div>
                </div>
                <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end">
                  <div className="social-share">
                    <span className="me-3">Share:</span>
                    {socialLinks.map((link, index) => (
                      <a href={link.href} key={index}>
                        <i className={link.iconClass} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="comments-area">
                <div className="comments-heading">
                  <h3>02 Comments</h3>
                </div>
                <Comments />
              </div>
              <div className="comment-form-wrap pt-5">
                <h3>Leave a comments</h3>
                <CommentForm />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="main-sidebar">
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Search</h3>
                </div>
                <div className="search-widget">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Search here" />
                    <button type="submit">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Categories</h3>
                </div>
                <div className="news-widget-categories">
                  <ul>
                    {listItems.map((item, index) => (
                      <li key={index} className={item.isActive ? "active" : ""}>
                        <a href={item.link}>{item.text}</a>{" "}
                        <span>{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Recent Post</h3>
                </div>
                <div className="recent-post-area">
                  {recentItems.map((item, index) => (
                    <div className="recent-items" key={index}>
                      <div className="recent-thumb">
                        <Image
                          src={item.imageSrc}
                          width={70}
                          height={70}
                          alt="img"
                        />
                      </div>
                      <div className="recent-content">
                        <ul>
                          <li>
                            <i className="fa-solid fa-calendar-days" />
                            {item.date}
                          </li>
                        </ul>
                        <h6>
                          <Link
                            href={`/news-details/${item.id}`}
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Popular Tag</h3>
                </div>
                <div className="news-widget-categories">
                  <div className="tagcloud">
                    {links.map((link, index) => (
                      <Link href={link.href} key={index}>
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
