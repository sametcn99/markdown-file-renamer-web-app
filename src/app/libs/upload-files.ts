import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// upload files to supabase storage
export const uploadFiles = async (uploadedFiles: File[]) => {
  // create a supabase client
  const supabase = createClientComponentClient();

  // create a random value using the current time in milliseconds
  const randomValue = new Date().getTime();

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
        console.error(`File upload error for ${filePath}:`, error.message);
      }
    } catch (error) {
      console.error(`File upload failed for ${filePath}:`, error);
    }
  }
};
