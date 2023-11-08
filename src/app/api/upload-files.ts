import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import readFiles from "./read-files";
import TextRegex from "./text-regex";

export let randomValue = 0;

// Function to upload files to Supabase storage
export const UploadFiles = async (uploadedFiles: File[]) => {
  // Create a Supabase client
  const supabase = createClientComponentClient();

  // Create a random value using the current time in milliseconds if it's not set
  if (randomValue === 0) {
    randomValue = new Date().getTime();
  }

  // Loop through the uploaded files
  for (const file of uploadedFiles) {
    const fileName = file.name;
    const filePath = `${randomValue}-${fileName}`;

    try {
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from("mdfiles")
        .upload(TextRegex(filePath), file, {
          cacheControl: "3600", // Cache control for the file
          upsert: false, // Do not overwrite the file if it already exists
        });

      if (error) {
        // Display an alert if there's an error during file upload
        alert(`File upload error for ${filePath}:` + error.message);
      }

      // Log a success message if the file is uploaded successfully
      console.log(`File uploaded successfully to ${filePath}`);
    } catch (error) {
      // Display an alert if there's an error during the upload process
      alert(`File upload failed for ${filePath}:` + error);
    }
  }

  // After uploading files, call the readFiles function (assuming it's defined in read-files.js)
  await readFiles();

  // Return true to indicate that the file upload process is complete
  return true;
};
