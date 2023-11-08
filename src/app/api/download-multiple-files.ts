// Import necessary libraries and modules
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import matter from "gray-matter";
import JSZip from "jszip";
import TextRegex from "./text-regex";
import DeleteFiles from "./delete-files";
import getDateTime from "../utils/get-date";

// Main function for downloading multiple files
export default async function downloadMultipleFiles(data: any) {
  // Create a Supabase client
  const supabase = createClientComponentClient();

  // Create a ZIP file with the provided data using Supabase
  const zipBlob = await createZipFile(data, supabase);

  // Create a URL for the ZIP blob
  const url = window.URL.createObjectURL(zipBlob);

  // Create a hidden anchor element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = `${getDateTime()}_renamed_files`; // You can set the name of the ZIP file
  a.style.display = "none";

  // Add the anchor element to the document's body and trigger the download
  document.body.appendChild(a);
  a.click();

  // Revoke the Object URL to free up resources
  window.URL.revokeObjectURL(url);
}

// Helper function to create a ZIP file from an array of file names
async function createZipFile(
  data: any,
  supabase: SupabaseClient<any, "public", any>
) {
  // Create a new instance of JSZip
  const zip = new JSZip();

  // Iterate through each file name in the data array
  for (const fileName of data) {
    // Download the file from Supabase's storage
    const { data, error } = await supabase.storage
      .from("mdfiles")
      .download(fileName);

    // If there's no error and the data is a Blob
    if (!error && data instanceof Blob) {
      // Read the text from the Blob
      const text = await data.text();

      // Parse the text using gray-matter to extract the title
      const matterResult = matter(text);
      const title = matterResult.data.title;
      const filePath = `${TextRegex(title)}.md`;
      // Add the text to the ZIP file with a sanitized title
      zip.file(filePath, text);
      console.log("File added to ZIP: " + filePath);

      // Delete the file from Supabase after adding it to the ZIP
      await DeleteFiles(fileName);
    }
  }

  // Generate the ZIP file as a blob and return it
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}
