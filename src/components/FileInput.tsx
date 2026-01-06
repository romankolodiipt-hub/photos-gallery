"use client";

import React from "react";

type FileInputProps = {
  accept?: string;
  onFileSelect: (file: File) => void;
};

export const FileInput: React.FC<FileInputProps> = ({
  accept,
  onFileSelect,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[90vw] w-lg h-24 flex items-center justify-center mx-auto mt-4 text-xl"
      >
        Select an images
      </label>
      <input
        id="fileInput"
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};
