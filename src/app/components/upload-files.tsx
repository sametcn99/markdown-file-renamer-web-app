"use client";;
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { uploadFiles } from "../libs/upload-files";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Change the type to File[]
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Change the type here too
    setUploadedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Card>
        <CardBody
          {...getRootProps()}
          className="dropzone select-none w-96 text-center h-24 flex justify-center items-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Sürükleyip bırakın</p>
          ) : (
            <p>
              Dosyaları sürükleyip buraya bırakın veya tıklayarak dosya seçin
            </p>
          )}
        </CardBody>
      </Card>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          uploadFiles(uploadedFiles);
        }}
      >
        Button
      </Button>
    </>
  );
};

export default FileUpload;
