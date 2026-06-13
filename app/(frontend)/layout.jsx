"use client";

import { useEffect } from "react";
import "@/public/assets/scss/styles.scss";
import BackToTop from "@/components/common/BackToTop";
import Mouse from "@/components/common/Mouse";
import { usePathname } from "next/navigation";
import SearchWrap from "@/components/common/SearchWrap";
import { ToastContainer } from "react-toastify";

// Vendor stylesheets served statically from /public/assets/css.
// Order matters for the cascade — kept identical to the original template.
const vendorStyles = [
  "/assets/css/bootstrap.min.css",
  "/assets/css/all.min.css",
  "/assets/css/animate.css",
  "/assets/css/splitting.css",
  "/assets/css/magnific-popup.css",
  "/assets/css/meanmenu.css",
  "/assets/css/swiper-bundle.min.css",
  "/assets/css/nice-select.css",
  "/assets/css/color.css",
];

export default function RootLayout({ children }) {
  const path = usePathname();
  useEffect(() => {
    window.addEventListener("scroll", function () {
      const header = document.getElementById("header-sticky");
      if (window.scrollY > 250) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
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
    <html lang="bg">
      <head>
        {vendorStyles.map((href) => (
          <link key={href} rel="stylesheet" href={href} precedence="vendor" />
        ))}
      </head>
      <body>
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
        {children}
        <SearchWrap />
        <BackToTop />
        <Mouse />
      </body>
    </html>
  );
}
