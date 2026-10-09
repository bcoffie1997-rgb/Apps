import { HomePage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomePage lang="en" />;
}
