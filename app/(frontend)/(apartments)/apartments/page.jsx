import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ApartmentsList from "@/components/apartments/ApartmentsList";
import Image from "next/image";
import Link from "next/link";
import { getApartments, getProjects } from "@/lib/data";

export const metadata = {
  title: "Апартаменти за продажба — NATURA",
  description: "Свободни апартаменти в проектите на NATURA.",
};

export default async function page() {
  const [apartments, projects] = await Promise.all([
    getApartments(),
    getProjects(),
  ]);

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
                  Апартаменти
                </h1>
              </div>
              <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
                <li>
                  <Link href={`/`}> Начало </Link>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-slash-forward" />
                </li>
                <li>Апартаменти</li>
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
      <ApartmentsList apartments={apartments} projects={projects} />
      <Footer1 />
    </>
  );
}
