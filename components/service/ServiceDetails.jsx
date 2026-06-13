import Link from "next/link";
import Image from "next/image";
import RichText from "@/components/common/RichText";
import { mediaUrl, mediaAlt } from "@/lib/media";

export default function ServiceDetails({ serviceItem, services = [] }) {
  return (
    <section className="service-details-section section-padding">
      <div className="container">
        <div className="service-details-wrapper">
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="service-details-image">
                <Image
                  src={mediaUrl(serviceItem.icon, "feature")}
                  width={740}
                  height={336}
                  alt={mediaAlt(serviceItem.icon, serviceItem.title)}
                />
              </div>
              <div className="service-details-content">
                <h2>{serviceItem.title}</h2>
                {serviceItem.excerpt && (
                  <p className="mt-3">{serviceItem.excerpt}</p>
                )}
                <RichText data={serviceItem.description} />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="main-sidebar">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Всички услуги</h3>
                  </div>
                  <div className="service-category">
                    <ul>
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/service-details/${s.slug}`}
                            className={
                              s.slug === serviceItem.slug ? "active" : ""
                            }
                          >
                            {s.title}
                            <i className="fa-solid fa-arrow-right" />
                          </Link>
                        </li>
                      ))}
                    </ul>
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
