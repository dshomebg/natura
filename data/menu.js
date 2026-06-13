export const menuData = [
  {
    label: "Home",
    href: "#",
    iconClass: "fa-regular fa-plus",
    className: "has-dropdown active menu-thumb",
    submenu: [
      {
        homeMenuItems: [
          {
            imageSrc: "/assets/img/header/home-1.jpg",
            title: "Home 01",
            buttons: [
              { label: "Multi Page", href: "/" },
              { label: "One Page", href: "/home-1-one-page" },
            ],
          },
          {
            imageSrc: "/assets/img/header/home-2.jpg",
            title: "Home 02",
            buttons: [
              { label: "Multi Page", href: "/home-2" },
              { label: "One Page", href: "/home-2-one-page" },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Pages",
    href: "#",
    iconClass: "fa-regular fa-plus",
    className: "has-dropdown",
    submenu: [
      {
        label: "Our Team",
        href: "#",
        iconClass: "fas fa-angle-down",
        submenu: [
          { label: "Our Team", href: "/team" },
          { label: "Team Details", href: "/team-details/1" },
        ],
      },
      { label: "Pricing", href: "/pricing" },
      { label: "Faq's", href: "/faq" },
      { label: "404 Page", href: "/404" },
    ],
  },
  {
    label: "Services",
    href: "#",
    iconClass: "fa-regular fa-plus",
    submenu: [
      { label: "Services", href: "/service" },
      { label: "Service Details", href: "/service-details/1" },
    ],
  },
  {
    label: "Projects",
    href: "#",
    iconClass: "fa-regular fa-plus",
    submenu: [
      { label: "Projects", href: "/project" },
      { label: "Project Details", href: "/project-details/1" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    iconClass: "fa-regular fa-plus",
    submenu: [
      { label: "Blog Grid", href: "/news-grid" },
      { label: "Blog Standard", href: "/news" },
      { label: "Blog Details", href: "/news-details/1" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export const onepageLinks = [
  { href: "#about", text: "About Us" },
  { href: "#services", text: "Services" },
  { href: "#projects", text: "Projects" },
  { href: "#team", text: "Team" },
  { href: "#blog", text: "Blog" },
  { href: "#contact", text: "Contact" },
];

export const footerLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Blog & News", href: "/news" },
  { name: "FAQ’S", href: "/faq" },
  { name: "Login / Register", href: "/contact" },
];
