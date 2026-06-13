"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteData } from "@/lib/SiteContext";

export default function Nav() {
  const { header } = useSiteData();
  const items = header?.items || [];
  const pathname = usePathname();
  const [open, setOpen] = useState(-1);

  const isActive = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {items.map((item, index) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        return (
          <li
            key={item.id || index}
            className={hasChildren ? "has-dropdown" : ""}
          >
            <Link
              href={item.href || "#"}
              className={isActive(item.href) ? "menuActive" : ""}
              onClick={() => setOpen((p) => (p === index ? -1 : index))}
            >
              {item.label}{" "}
              {hasChildren && <i className="fa-regular fa-plus"></i>}
            </Link>
            {hasChildren && (
              <ul className={`submenu ${open === index ? "active" : ""}`}>
                {item.children.map((child, ci) => (
                  <li key={ci}>
                    <Link
                      href={child.href || "#"}
                      className={isActive(child.href) ? "menuActive" : ""}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}
