import { LegalPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("es", "privacy");

export default function Page() {
  return <LegalPage lang="es" kind="privacy" />;
}
