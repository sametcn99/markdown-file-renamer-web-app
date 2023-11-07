import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import readFiles from "./read-files";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { read } from "fs";

export let randomValue = 0;
// upload files to supabase storage
export const UploadFiles = async (uploadedFiles: File[]) => {
  // create a supabase client
  const supabase = createClientComponentClient();
  // create a random value using the current time in milliseconds
  if (randomValue === 0) {
    randomValue = new Date().getTime();
  }
  // loop through the uploaded files
  for (const file of uploadedFiles) {
    const fileName = file.name;
    const fileExt = fileName.split(".").pop();
    const filePath = `markdown/${randomValue}-${fileName}`;
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        alert(`File upload error for ${filePath}:` + error.message);
      }
      readFiles();
      console.log(`File uploaded successfully to ${filePath}`);
    } catch (error) {
      alert(`File upload failed for ${filePath}:` + error);
    }
  }
  return true;
};
