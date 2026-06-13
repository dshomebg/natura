"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AnimatedText from "../common/AnimatedText";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "general" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Съобщението е изпратено успешно!");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section-22">
      <div className="container">
        <div className="contact-form-items">
          <div className="title text-center">
            <h2 className="splt-txt wow">
              <AnimatedText text="Свържете се с нас" />
            </h2>
          </div>
          <form onSubmit={submit}>
            <div className="row g-4">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="text"
                    placeholder="Име"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                <div className="form-clt">
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-phone" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="email"
                    placeholder="Имейл"
                    value={form.email}
                    onChange={update("email")}
                  />
                  <div className="icon">
                    <i className="fa-regular fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <textarea
                    placeholder="Вашето съобщение"
                    value={form.message}
                    onChange={update("message")}
                    required
                  />
                  <div className="icon">
                    <i className="fa-sharp fa-light fa-pencil" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
                <button
                  type="submit"
                  className="theme-btn w-100"
                  disabled={loading}
                >
                  {loading ? "ИЗПРАЩАНЕ..." : "ИЗПРАТИ СЪОБЩЕНИЕ"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
