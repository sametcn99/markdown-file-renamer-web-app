"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@nextui-org/react";
import { UploadFiles } from "../api/upload-files";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

// Component for handling file uploads
const FileUpload = () => {
  // State variables to manage uploaded files, loading state, and button disabled state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Change the type to File[]
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Callback function triggered when files are dropped or selected
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Set the uploaded files and enable the upload button
    setUploadedFiles(acceptedFiles);
    setIsDisabled(false);
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
    // Set loading state, upload files, and reset loading state
    setIsLoading(true);
    await UploadFiles(uploadedFiles);
    setIsLoading(false);
  };

  // Empty useEffect hook (can be used for side effects when component mounts/unmounts)

  // JSX structure for the file upload component
  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-full">
      {/* Card for dropzone area */}
      <Card>
        <CardBody
          {...getRootProps()}
          className="flex justify-center items-center w-[20rem] h-24 text-center select-none max-w-[20rem] dropzone"
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
      <Table
        aria-label="Example static collection table"
        className="max-w-[20rem]"
      >
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
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={uploadClick}
        className="w-full max-w-[20rem]"
      >
        {isLoading ? "Please Wait..." : "Download"}
      </Button>
    </div>
  );
};

export default FileUpload;
