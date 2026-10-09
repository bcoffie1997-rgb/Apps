import "../globals.css";
import { SiteShell, shellMetadata, shellViewport } from "@/components/SiteShell";

export const viewport = shellViewport;
export const metadata = shellMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
