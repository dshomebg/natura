import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/common/AnimatedText";
import { mediaUrl, mediaAlt } from "@/lib/media";
import {
  apartmentTypeLabels,
  apartmentStatusLabels,
  apartmentStatusClass,
  formatPrice,
} from "@/lib/apartments";

export default function Apartments({ apartments = [] }) {
  if (apartments.length === 0) return null;

  return (
    <section className="apartments-section section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            за продажба
            <i className="fa-regular fa-arrow-right-long" />
          </h6>
          <h2 className="splt-txt wow">
            <AnimatedText text="Свободни апартаменти" />
          </h2>
        </div>
        <div className="row g-4">
          {apartments.map((a) => {
            const cover = Array.isArray(a.images) ? a.images[0] : null;
            const projectName =
              a.project && typeof a.project === "object" ? a.project.title : null;
            return (
              <div className="col-xl-4 col-lg-6 col-md-6" key={a.id}>
                <div className="apartment-card">
                  <Link href={`/apartments/${a.slug}`} className="apartment-thumb">
                    <Image
                      src={mediaUrl(cover, "card")}
                      width={400}
                      height={300}
                      alt={mediaAlt(cover, a.title)}
                    />
                    <span
                      className={`apartment-status ${
                        apartmentStatusClass[a.status] || ""
                      }`}
                    >
                      {apartmentStatusLabels[a.status] || a.status}
                    </span>
                  </Link>
                  <div className="apartment-body">
                    <h3>
                      <Link href={`/apartments/${a.slug}`}>{a.title}</Link>
                    </h3>
                    {projectName && (
                      <p className="apartment-project">
                        <i className="fa-solid fa-building" /> {projectName}
                      </p>
                    )}
                    <ul className="apartment-specs">
                      {a.type && (
                        <li>
                          <span>Тип</span>
                          {apartmentTypeLabels[a.type] || a.type}
                        </li>
                      )}
                      {a.area != null && (
                        <li>
                          <span>Площ</span>
                          {a.area} кв.м
                        </li>
                      )}
                      {a.floor != null && (
                        <li>
                          <span>Етаж</span>
                          {a.floor}
                        </li>
                      )}
                    </ul>
                    <div className="apartment-footer">
                      <span className="apartment-price">{formatPrice(a)}</span>
                      <Link href={`/apartments/${a.slug}`} className="theme-btn">
                        Детайли
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-5">
          <Link href="/apartments" className="theme-btn">
            Всички апартаменти <i className="fa-regular fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
