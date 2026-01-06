"use client";
import { useEffect, useState } from "react";
import * as exifr from "exifr";

type Metadata = {
  latitude?: number;
  longitude?: number;
  DateTimeOriginal?: Date;
  Make?: string;
  Model?: string;
};

type Address = {
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  country?: string;
};

type PhotoMetadataProps = {
  file: File;
};

export const PhotoMetadata: React.FC<PhotoMetadataProps> = ({ file }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      setError(null);
      setMetadata(null);
      setAddress(null);

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await exifr.parse(arrayBuffer, {
          gps: true,
          exif: true,
        });

        if (!result) {
          setError("No EXIF metadata found");
          return;
        }

        const meta: Metadata = {
          latitude: result.latitude,
          longitude: result.longitude,
          DateTimeOriginal: result.DateTimeOriginal,
          Make: result.Make,
          Model: result.Model,
        };
        setMetadata(meta);

        if (meta.latitude && meta.longitude) {
          const addr = await fetchAddress(meta.latitude, meta.longitude);
          setAddress(addr);
        }
      } catch {
        setError("Failed to read metadata or fetch address");
      }
    };

    loadMetadata();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  const fetchAddress = async (lat: number, lon: number): Promise<Address> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "MyReactApp/1.0" },
    });
    const data = await res.json();
    return data.address || {};
  };

  return (
    <div className="flex flex-col items-center mt-4 space-y-2">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-[90vw] w-xl max-h-[60vh] h-[40vh] object-contain mx-auto block"
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {address && (
        <div>
          <strong>Location:</strong>{" "}
          {address.city || address.town || address.village || "—"},{" "}
          {address.country || "—"}
        </div>
      )}
    </div>
  );
};
