import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function DeleteFiles(name: any) {
  const supabase = createClientComponentClient();

  // Attempt to remove the file with the specified name from the "mdfiles" storage
  const { data, error } = await supabase.storage.from("mdfiles").remove(name);

  if (error) {
    // If there is an error during the file removal, log the error details
    console.error(
      "Error occurred:",
      error,
      error.message,
      error.name,
      error.stack,
      error.cause
    );
  }
}
