"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@nextui-org/react";
import { UploadFiles } from "../libs/upload-files";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Change the type to File[]
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Change the type here too
    setUploadedFiles(acceptedFiles);
    setIsDisabled(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/md": [".md", ".mdx", ".markdown",".text","mdtxt","mdtext","mkd", "mdown"],
    },
  });

  const uploadClick = async () => {
    setIsLoading(true);
    await UploadFiles(uploadedFiles);
    setIsLoading(false);
  };

  useEffect(() => {});

  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-full">
      <Card>
        <CardBody
          {...getRootProps()}
          className="flex justify-center items-center w-full h-24 text-center select-none max-w-[20rem] dropzone"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drag and drop</p>
          ) : (
            <p>Drag and drop files here or click to select a file</p>
          )}
        </CardBody>
      </Card>
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
            <TableRow key="1" className="font-bold text-black">
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
