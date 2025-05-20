"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!image) return;
    setIsGenerating(true);
    try {
      // TODO: Implement image generation logic
      console.log("Generating image...");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
      >
        <input {...getInputProps()} capture="environment" />
        {image ? (
          <div className="relative w-full aspect-square">
            <Image
              src={image}
              alt="Uploaded image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl">📸</div>
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the image here..."
                : "Drag & drop an image here, or click to select"}
            </p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, GIF</p>
          </div>
        )}
      </div>

      {image && (
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium
            ${
              isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </button>
      )}
    </div>
  );
}
