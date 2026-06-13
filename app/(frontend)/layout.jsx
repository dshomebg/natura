import "@/public/assets/scss/styles.scss";
import BackToTop from "@/components/common/BackToTop";
import Mouse from "@/components/common/Mouse";
import SearchWrap from "@/components/common/SearchWrap";
import ClientEffects from "@/components/common/ClientEffects";
import { SiteProvider } from "@/lib/SiteContext";
import { getHeader, getFooter, getSiteSettings } from "@/lib/data";

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

export const metadata = {
  title: "NATURA — строителство, ремонти и архитектура",
  description:
    "NATURA е строителна компания с фокус върху качество, устойчивост и модерна архитектура.",
};

export default async function RootLayout({ children }) {
  const [header, footer, settings] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteSettings(),
  ]);

  return (
    <html lang="bg">
      <head>
        {vendorStyles.map((href) => (
          <link key={href} rel="stylesheet" href={href} precedence="vendor" />
        ))}
      </head>
      <body>
        <SiteProvider value={{ header, footer, settings }}>
          <ClientEffects />
          {children}
          <SearchWrap />
          <BackToTop />
          <Mouse />
        </SiteProvider>
      </body>
    </html>
  );
}
