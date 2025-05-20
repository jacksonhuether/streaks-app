import ImageUploader from "@/components/ImageUploader";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Image Generator
        </h1>
        <ImageUploader />
      </div>
    </main>
  );
}
