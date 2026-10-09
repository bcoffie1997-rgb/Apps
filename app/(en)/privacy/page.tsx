import { LegalPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage lang="en" kind="privacy" />;
}
