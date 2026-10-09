import "../globals.css";
import { SiteShell, shellMetadata, shellViewport } from "@/components/SiteShell";

export const viewport = shellViewport;
export const metadata = shellMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
