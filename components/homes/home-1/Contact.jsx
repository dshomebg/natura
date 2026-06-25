"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import AnimatedText from "@/components/common/AnimatedText";
import { useSiteData } from "@/lib/SiteContext";

export default function Contact() {
  const { settings } = useSiteData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.phone && !form.email)) {
      toast.error("Моля попълнете име и телефон или имейл.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "general" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Съобщението е изпратено успешно!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section fix section-padding bg-cover  scrollSpySection"
      style={{ backgroundImage: 'url("/assets/img/contact-bg.jpg")' }}
    >
      <div className="contact-image float-bob-x">
        <Image
          src="/assets/img/contact-img-shape.png"
          width={353}
          height={398}
          alt="img"
        />
      </div>
      <div className="container">
        <div className="contact-wrapper">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="contact-items">
                <h3 className="splt-txt wow">
                  <AnimatedText text="Свържете се с нас!" />
                </h3>
                <form onSubmit={submit} className="mt-4 mt-md-0">
                  <div className="row g-4">
                    <div
                      className="col-lg-6 col-md-6 wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <div className="form-clt">
                        <input
                          type="text"
                          placeholder="Име"
                          value={form.name}
                          onChange={update("name")}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 wow fadeInUp"
                      data-wow-delay=".4s"
                    >
                      <div className="form-clt">
                        <input
                          type="email"
                          placeholder="Имейл"
                          value={form.email}
                          onChange={update("email")}
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-12 wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <div className="form-clt">
                        <input
                          type="tel"
                          placeholder="Телефон"
                          value={form.phone}
                          onChange={update("phone")}
                        />
                      </div>
                    </div>
                    <div
                      className="col-lg-12 wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <div className="form-clt">
                        <textarea
                          placeholder="Вашето съобщение"
                          value={form.message}
                          onChange={update("message")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-7 wow fadeInUp" data-wow-delay=".4s">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={loading}
                      >
                        {loading ? "Изпращане..." : "Изпрати съобщение"}{" "}
                        <i className="fas fa-long-arrow-right" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-content">
                <div className="section-title">
                  <h6 className="text-white wow fadeInUp">
                    <i className="fa-regular fa-arrow-left-long" />
                    talk to us
                    <i className="fa-regular fa-arrow-right-long" />
                  </h6>
                  <h2 className="text-white splt-txt wow">
                    <AnimatedText text="Изграждаме със страст и грижа за всеки детайл" />
                  </h2>
                </div>
                {settings?.phone && (
                  <div className="icon-items wow fadeInUp" data-wow-delay=".3s">
                    <div className="icon">
                      <i className="fa-solid fa-phone-volume" />
                    </div>
                    <div className="content">
                      <span>Обадете се</span>
                      <h4>
                        <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                          {settings.phone}
                        </a>
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
