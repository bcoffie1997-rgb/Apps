import { LegalPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("en", "terms");

export default function Page() {
  return <LegalPage lang="en" kind="terms" />;
}
