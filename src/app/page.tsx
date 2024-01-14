"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  handleLocalStorageFiles,
  readFilesFromLocalStorage,
} from "@/app/utils/utils";

export default function Home() {
  // State variables to manage uploaded files, loading state, and button disabled state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<[]>([]);
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [isUploadable, setIsUploadable] = useState(true);
  const [isClearable, setIsClearable] = useState(false);

  // Callback function triggered when files are dropped or selected
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Set the uploaded files and enable the upload button
    setUploadedFiles(acceptedFiles);
    setIsUploadable(true);
    setIsClearable(true);
  }, []);

  // Hook from react-dropzone to handle drag-and-drop functionality and file acceptance
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [
        ".md",
        ".mdx",
        ".markdown",
        ".text",
        ".mdtxt",
        ".mdtext",
        ".mkd",
        ".mdown",
      ],
    },
  });

  // Function to handle the upload button click
  const uploadClick = async () => {
    await handleLocalStorageFiles(uploadedFiles);
    setIsDownloadable(true);
    setIsUploadable(false);
    setIsClearable(true);
  };
  // Function to handle the upload button click
  const downloadClick = async () => {
    await readFilesFromLocalStorage();
    setIsDownloadable(false);
    setIsClearable(false);
    await localStorage.clear();
  };
  // Function to handle the upload button click
  const clearClick = async () => {
    setUploadedFiles([]);
    setFiles([]);
    setIsClearable(false);
    setIsUploadable(false);
    setIsDownloadable(false);
    await localStorage.clear();
  };

  return (
    <>
      {/* Card for dropzone area */}
      <Card>
        <CardBody
          {...getRootProps()}
          className="flex justify-center items-center h-36 text-center select-none dropzone w-full"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drag and drop</p>
          ) : (
            <p>Drag and drop files here or click to select a file</p>
          )}
        </CardBody>
      </Card>

      {/* Table to display uploaded files */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>SIZE</TableColumn>
        </TableHeader>
        <TableBody>
          {uploadedFiles.map((file) => (
            <TableRow key={file.name} className="font-bold text-black">
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Button for file upload */}
      <Button
        onClick={uploadClick}
        isDisabled={uploadedFiles.length === 0 || isUploadable === false}
        className="w-full"
      >
        Upload
      </Button>
      <Button
        onClick={clearClick}
        isDisabled={isClearable === false}
        className="w-full"
      >
        Clear
      </Button>
      <Button
        onClick={downloadClick}
        isDisabled={isDownloadable === false}
        className="w-full"
      >
        Download
      </Button>
    </>
  );
}
