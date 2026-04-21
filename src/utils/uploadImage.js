import { supabase } from "../supabaseClient";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  // upload
  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  // get PUBLIC URL
  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  console.log("FINAL IMAGE URL:", data.publicUrl);

  return data.publicUrl; // ✅ correct URL with /public/
};