import { PhotoUploader } from "@/src/components/PhotoUploader";
import { ChangeEvent } from "react";

export default function Home() {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
  };

  return (
    <section className="h-screen mx-auto py-8 text-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to the Photos Gallery</h1>
      <p className="text-xl">Explore a collection of beautiful images.</p>
      <PhotoUploader />
    </section>
  );
}
