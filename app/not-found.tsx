import Link from "next/link";
import { PageHero } from "@/components/Sections";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page went to voicemail." subtitle="Let's get you back on track.">
      <Link href="/" className="btn-accent mt-10">Back to home</Link>
    </PageHero>
  );
}
