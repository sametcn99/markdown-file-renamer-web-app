import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomValue } from "./upload-files";

export default async function readFiles() {
  const supabase = createClientComponentClient();
  console.log("random value: " + randomValue);

  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list("markdown", {
        limit: 100,
        offset: 0,
        search: `${randomValue}-`,
      });
    console.log(data);
    if (error) {
      console.error(`File download error for `, error.message);
    }
    return data;
  } catch (error) {
    console.error(`File download failed for `, error);
  }
}
