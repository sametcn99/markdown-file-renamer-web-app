"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@nextui-org/react";
import { UploadFiles } from "../libs/upload-files";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Change the type to File[]
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Next.js router
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Change the type here too
    setUploadedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/md": [".md", ".mdx"],
    },
  });

  const uploadClick = async () => {
    await UploadFiles(uploadedFiles);
    setIsLoading(false);
    router.push("/editor");
  };

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
      <Button onClick={uploadClick}>Go Editor</Button>
    </>
  );
};

export default FileUpload;
