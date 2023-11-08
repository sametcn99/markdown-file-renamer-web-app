import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import matter from "gray-matter";
import TextRegex from "./text-regex";
import DeleteFiles from "./delete-files";

export default async function DownloadFiles(name: any) {
  const supabase = createClientComponentClient();

  try {
    // Download the file with the specified name from the "mdfiles" storage
    const { data, error } = await supabase.storage
      .from("mdfiles")
      .download(name);

    if (error) {
      // Log an error message if there's an error during file download
      console.error("File download error:", error.message);
      return null;
    }

    if (data instanceof Blob) {
      // If the downloaded data is a Blob (binary data), continue
      const text = await data.text(); // Convert Blob to text

      // Parse the text using the "gray-matter" library to extract metadata (e.g., title)
      const matterResult = matter(text);
      const title = matterResult.data.title;

      // Create a Blob from the downloaded text and set its type as "text/markdown"
      const blob = new Blob([text], { type: "text/markdown" });

      // Create a download link for the Blob content
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = TextRegex(title) + ".md"; // Set the desired file name using the extracted title
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      // Revoke the Object URL to free up resources
      window.URL.revokeObjectURL(url);

      // Call the DeleteFiles function to delete the file from storage
      DeleteFiles(name);

      // Return true to indicate a successful download
      return true;
    }

    // Handle cases where the downloaded data is not a Blob
    return null;
  } catch (error) {
    // Log an error message if there's an error during the download process
    console.error("File download failed:", error);
    return null;
  }
}
