"use client";
import { useState } from "react";
import { FileInput } from "./FileInput";
import { PhotoMetadata } from "./PhotoMetaData";

export const PhotoUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <FileInput
        accept="image/*,image/x-sony-arw,.arw,.cr2,.nef,.dng"
        onFileSelect={setFile}
      />
      {file && <PhotoMetadata file={file} />}
    </div>
  );
};
