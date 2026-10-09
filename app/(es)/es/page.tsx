import { HomePage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("es", "home");

export default function Page() {
  return <HomePage lang="es" />;
}
