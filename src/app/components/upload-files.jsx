"use client"
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Yükleme işlemi tamamlandığında burası çalışacak
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Sürükleyip bırakın</p>
        ) : (
          <p>Dosyaları sürükleyip buraya bırakın veya tıklayarak dosya seçin</p>
        )}
      </div>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
