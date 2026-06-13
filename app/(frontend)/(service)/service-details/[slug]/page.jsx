import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ServiceDetails from "@/components/service/ServiceDetails";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServices } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  return { title: service ? `${service.title} — NATURA` : "Услуга — NATURA" };
}

export default async function page({ params }) {
  const { slug } = await params;
  const services = await getServices();
  const serviceItem = services.find((s) => s.slug === slug);
  if (!serviceItem) notFound();

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
                  {serviceItem.title}
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
                  <Link href={`/service`}> Услуги </Link>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-slash-forward" />
                </li>
                <li>{serviceItem.title}</li>
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
      <ServiceDetails serviceItem={serviceItem} services={services} />
      <div className="brand-section fix section-padding pt-0">
        <Brands />
      </div>
      <Footer1 />
    </>
  );
}
