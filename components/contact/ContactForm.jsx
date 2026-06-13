"use client";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedText from "../common/AnimatedText";

export default function ContactForm() {
  const form = useRef();

  const sandMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", form.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Message Sent successfully!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          form.current.reset();
        } else {
          toast.error("Ops Message not Sent!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  return (
    <section className="contact-section-22">
      <div className="container">
        <div className="contact-form-items">
          <div className="title text-center">
            <h2 className="splt-txt wow">
              <AnimatedText text="Get In Touch" />
            </h2>
          </div>
          <form ref={form} onSubmit={sandMail}>
            <div className="row g-4">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Fast Name"
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
                    type="text"
                    name="name"
                    id="name12"
                    placeholder="Last Name"
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="number"
                    id="number"
                    placeholder="Phone Number"
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-phone" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="email"
                    id="email3"
                    placeholder="Email Address"
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="What’s on your mind"
                    defaultValue={""}
                    required
                  />
                  <div className="icon">
                    <i className="fa-sharp fa-light fa-pencil" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
                <button type="submit" className="theme-btn w-100">
                  SEND MESSAGE NOW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
