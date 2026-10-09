import { LegalPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("es", "terms");

export default function Page() {
  return <LegalPage lang="es" kind="terms" />;
}
