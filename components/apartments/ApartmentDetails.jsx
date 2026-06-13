import Link from "next/link";
import Image from "next/image";
import RichText from "@/components/common/RichText";
import InquiryForm from "@/components/apartments/InquiryForm";
import { mediaUrl, mediaAlt } from "@/lib/media";
import {
  apartmentTypeLabels,
  apartmentStatusLabels,
  apartmentStatusClass,
  formatPrice,
} from "@/lib/apartments";

export default function ApartmentDetails({ apartment }) {
  const images = Array.isArray(apartment.images) ? apartment.images : [];
  const projectName =
    apartment.project && typeof apartment.project === "object"
      ? apartment.project
      : null;

  const specs = [
    apartment.type && ["Тип", apartmentTypeLabels[apartment.type] || apartment.type],
    apartment.floor != null && ["Етаж", apartment.floor],
    apartment.area != null && ["Площ", `${apartment.area} кв.м`],
    apartment.netArea != null && ["Чиста площ", `${apartment.netArea} кв.м`],
    apartment.exposure && ["Изложение", apartment.exposure],
    ["Статус", apartmentStatusLabels[apartment.status] || apartment.status],
  ].filter(Boolean);

  return (
    <section className="apartment-details-section section-padding fix">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="apartment-gallery">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <Image
                    key={i}
                    src={mediaUrl(img, "feature")}
                    width={870}
                    height={500}
                    alt={mediaAlt(img, apartment.title)}
                  />
                ))
              ) : (
                <Image
                  src={mediaUrl(null, "feature")}
                  width={870}
                  height={500}
                  alt={apartment.title}
                />
              )}
            </div>

            {apartment.description && (
              <div className="apartment-description mt-4">
                <h3 className="mb-3">Описание</h3>
                <RichText data={apartment.description} />
              </div>
            )}

            {apartment.floorPlan && typeof apartment.floorPlan === "object" && (
              <div className="apartment-floorplan mt-4">
                <h3 className="mb-3">Разпределение</h3>
                <Image
                  src={mediaUrl(apartment.floorPlan, "feature")}
                  width={870}
                  height={600}
                  alt={`План — ${apartment.title}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="apartment-sidebar">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span
                  className={`apartment-status ${
                    apartmentStatusClass[apartment.status] || ""
                  }`}
                  style={{ position: "static" }}
                >
                  {apartmentStatusLabels[apartment.status] || apartment.status}
                </span>
                <span className="apartment-price">{formatPrice(apartment)}</span>
              </div>
              <h2 className="mb-2">{apartment.title}</h2>
              {projectName && (
                <p className="apartment-project mb-3">
                  <i className="fa-solid fa-building" />{" "}
                  <Link href={`/project-details/${projectName.slug}`}>
                    {projectName.title}
                  </Link>
                </p>
              )}

              <ul className="apartment-detail-specs">
                {specs.map(([label, value], i) => (
                  <li key={i}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>

              {apartment.status !== "sold" && (
                <div className="apartment-inquiry mt-4">
                  <InquiryForm
                    apartmentId={apartment.id}
                    type="apartment"
                    title="Запитване за този апартамент"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
