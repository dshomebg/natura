import Home1 from "./(homes)/home-1/page";
import { getPageMeta } from "@/lib/data";

export async function generateMetadata() {
  const m = await getPageMeta();
  return {
    title:
      m?.home?.metaTitle || "NATURA — строителство, ремонти и архитектура",
    description:
      m?.home?.metaDescription ||
      "NATURA — строителство, ремонти и архитектура.",
  };
}
export default function Home() {
  return (
    <>
      <Home1 />
    </>
  );
}
