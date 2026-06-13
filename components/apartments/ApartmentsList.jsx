"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { mediaUrl, mediaAlt } from "@/lib/media";
import {
  apartmentTypeLabels,
  apartmentStatusLabels,
  apartmentStatusClass,
  formatPrice,
} from "@/lib/apartments";

export default function ApartmentsList({ apartments = [], projects = [] }) {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [project, setProject] = useState("");

  const types = useMemo(
    () => [...new Set(apartments.map((a) => a.type).filter(Boolean))],
    [apartments]
  );

  const filtered = useMemo(
    () =>
      apartments.filter((a) => {
        if (type && a.type !== type) return false;
        if (status && a.status !== status) return false;
        if (project) {
          const pid = typeof a.project === "object" ? a.project?.id : a.project;
          if (String(pid) !== String(project)) return false;
        }
        return true;
      }),
    [apartments, type, status, project]
  );

  return (
    <section className="apartments-section section-padding fix">
      <div className="container">
        <div className="apartments-filter">
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Всички типове</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {apartmentTypeLabels[t] || t}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Всички статуси</option>
                {Object.entries(apartmentStatusLabels).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                <option value="">Всички проекти</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="apartments-count mt-4 mb-2">
          Намерени: <strong>{filtered.length}</strong>
        </div>

        <div className="row g-4">
          {filtered.length === 0 && (
            <p className="text-center py-5">
              Няма апартаменти по избраните филтри.
            </p>
          )}
          {filtered.map((a) => {
            const cover = Array.isArray(a.images) ? a.images[0] : null;
            const projectName =
              a.project && typeof a.project === "object" ? a.project.title : null;
            return (
              <div className="col-xl-4 col-lg-6 col-md-6" key={a.id}>
                <div className="apartment-card">
                  <Link
                    href={`/apartments/${a.slug}`}
                    className="apartment-thumb"
                  >
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
                      <Link
                        href={`/apartments/${a.slug}`}
                        className="theme-btn"
                      >
                        Детайли
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
