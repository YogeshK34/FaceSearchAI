"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MyDropzone() {
  const [images, setImages] = useState<
    { name: string; src: string | ArrayBuffer | null; size: number }[]
  >([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: {
      name: string;
      src: string | ArrayBuffer | null;
      size: number;
    }[] = [];

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        newImages.push({
          name: file.name,
          src: reader.result,
          size: file.size,
        });
        setImages((prevImages) => [...prevImages, ...newImages]);
      };

      reader.readAsDataURL(file); // Convert file to base64
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          padding: "10px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <Button type="submit">
          <Upload className="h-5 w-5" />
          Upload
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((image, index) => (
          <Card
            key={index}
            className="w-64 m-4 shadow-md border border-gray-200"
          >
            <CardHeader className="p-0">
              <Image
                src={image.src as string}
                alt={image.name}
                width={400}
                height={250}
                className="rounded-t-lg object-cover h-40 w-full"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <CardTitle className="truncate">{image.name}</CardTitle>
              <Badge variant="outline" className="mt-2">
                {Math.round(image.size / 1024)} KB
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
