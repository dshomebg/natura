"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function InquiryForm({
  apartmentId = null,
  type = "general",
  title = "Запитване",
}) {
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
    if (!form.name || (!form.phone && !form.email)) {
      toast.error("Моля попълнете име и телефон или имейл.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type,
          ...(apartmentId ? { apartment: apartmentId } : {}),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Запитването е изпратено успешно!");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="inquiry-form" onSubmit={submit}>
      {title && <h4 className="mb-3">{title}</h4>}
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Име *"
            value={form.name}
            onChange={update("name")}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="tel"
            className="form-control"
            placeholder="Телефон"
            value={form.phone}
            onChange={update("phone")}
          />
        </div>
        <div className="col-12">
          <input
            type="email"
            className="form-control"
            placeholder="Имейл"
            value={form.email}
            onChange={update("email")}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Съобщение"
            value={form.message}
            onChange={update("message")}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="theme-btn" disabled={loading}>
            {loading ? "Изпращане..." : "Изпрати запитване"}
            <i className="fa-regular fa-arrow-right ms-2" />
          </button>
        </div>
      </div>
    </form>
  );
}
