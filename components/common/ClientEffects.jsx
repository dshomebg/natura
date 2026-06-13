"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

// Client-only side effects extracted from the (server) root layout:
// sticky header on scroll, Bootstrap JS, and WOW.js animations per route.
export default function ClientEffects() {
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const header = document.getElementById("header-sticky");
      if (!header) return;
      if (window.scrollY > 250) header.classList.add("sticky");
      else header.classList.remove("sticky");
    };
    window.addEventListener("scroll", onScroll);

    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      animateClass: "animated",
      offset: 100,
      mobile: false,
      live: false,
    });
    wow.init();
  }, [path]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
