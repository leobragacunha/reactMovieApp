import { supabase } from "@/services/supabaseAPI";

export function useProfilePhoto() {
  const supabaseBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

  // Rename the file and upload to supabase storage
  const handlePhotoUpload = async (previewFile: File | null) => {
    try {
      // Adding an unique file name (adding date prefix just for uniqueness)
      const uniqueFileName = `${Date.now()}-${previewFile?.name}`;

      // Upload the image on supabase storage
      const { error } = await supabase.storage
        .from(supabaseBucket)
        .upload(uniqueFileName, previewFile);

      if (error) {
        throw error;
      }

      // Updating photoPath
      const { data } = supabase.storage
        .from(supabaseBucket)
        .getPublicUrl(uniqueFileName);

      // console.log("url posted:", data?.publicUrl);

      if (!data.publicUrl) throw new Error("Failed to get public URL");

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Deleting photo from supabase storage
  const handlePhotoDelete = async (photoPath: string) => {
    try {
      const fileName = photoPath?.split(`/`).pop();

      // Remove image from supabase storage
      // IMPORTANT: SUPABASE DELETE POLICY NEEDS A SELECT POLICY TO WORK
      if (fileName) {
        const { error } = await supabase.storage
          .from(supabaseBucket)
          .remove([decodeURIComponent(fileName)]);

        // If there is any error, we throw it
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  return { handlePhotoUpload, handlePhotoDelete };
}
