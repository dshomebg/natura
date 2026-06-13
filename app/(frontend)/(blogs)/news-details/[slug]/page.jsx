import BlogDetails from "@/components/blogs/BlogDetails";
import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getCategories } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Публикация — NATURA" };
  return {
    title: `${post.title} — NATURA`,
    description: post.excerpt || undefined,
  };
}

export default async function page({ params }) {
  const { slug } = await params;
  const newsItem = await getPostBySlug(slug);
  if (!newsItem) notFound();

  const recent = (await getPosts(4)).filter((p) => p.slug !== slug).slice(0, 3);
  const categories = await getCategories("blog");

  return (
    <>
      <Header2 />
      <div
        className="breadcrumb-wrapper bg-cover"
        style={{ backgroundImage: 'url("/assets/img/breadcrumb-bg.jpg")' }}
      >
        <div className="shape-image float-bob-y">
          <Image
            src="/assets/img/vector.png"
            width={84}
            height={186}
            alt="img"
          />
        </div>
        <div className="container">
          <div className="breadcrumb-wrapper-items">
            <div className="page-heading">
              <div className="breadcrumb-sub-title">
                <h1 className="wow fadeInUp" data-wow-delay=".3s">
                  {newsItem.title}
                </h1>
              </div>
              <ul
                className="breadcrumb-items wow fadeInUp"
                data-wow-delay=".5s"
              >
                <li>
                  <Link href={`/`}> Начало </Link>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-slash-forward" />
                </li>
                <li>
                  <Link href={`/news`}> Блог </Link>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-slash-forward" />
                </li>
                <li>{newsItem.title}</li>
              </ul>
            </div>
            <div className="breadcrumb-image">
              <Image
                src="/assets/img/breadcrumb-image.png"
                width={540}
                height={450}
                alt="img"
                className="float-bob-x"
              />
              <div className="bar-shape">
                <Image
                  src="/assets/img/breadcrumb-bar.png"
                  width={631}
                  height={604}
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogDetails newsItem={newsItem} recent={recent} categories={categories} />
      <div className="brand-section fix section-padding pt-0">
        <Brands />
      </div>
      <Footer1 />
    </>
  );
}
