import { HiPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("en", "hi");

export default function Page() {
  return <HiPage lang="en" />;
}
