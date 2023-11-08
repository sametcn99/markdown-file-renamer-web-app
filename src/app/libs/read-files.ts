import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomValue } from "./upload-files";
import DownloadFiles from "./download-files";

// Define and export a function to read files
export default async function readFiles() {
  // Create a Supabase client
  const supabase = createClientComponentClient();

  try {
    // List files from the "mdfiles" storage with a specific search pattern
    const { data, error } = await supabase.storage.from("mdfiles").list("", {
      limit: 100, // Limit the number of files to retrieve
      offset: 0, // Start from the beginning of the list
      search: `${randomValue}-`, // Search for files with the specified pattern
    });

    if (error) {
      // Log an error message if there's an error during file listing
      console.error("File read error:", error.message);
    }

    // Iterate through the list of files (if any)
    data?.map((element) => {
      // Call the DownloadFiles function to download each file
      DownloadFiles(element.name);
    });
  } catch (error) {
    // Log an error message if there's an error during the file reading process
    console.error("File read failed:", error);
  }
}
