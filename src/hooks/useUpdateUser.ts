import { useMutation } from "@tanstack/react-query";
import type {
  updateUserFormData,
  userUpdateObject,
} from "@/schemas/updateUser";
import { useUserContext } from "@/contexts/UserContext";
import { supabase } from "@/services/supabaseAPI";

export function useUpdateUser() {
  const { user } = useUserContext();

  const updateProfile = async ({
    name,
    email,
    password,
    photoPath,
    isPhotoModified,
  }: updateUserFormData) => {
    if (!user) throw new Error("User not authenticated!");

    const updates: userUpdateObject = {};

    if (name?.trim() || isPhotoModified) {
      updates.data = {
        ...user?.user_metadata,
        fullName: name?.trim() ?? user.user_metadata?.fullName,
        ...(isPhotoModified === "update" && {
          photoPath: photoPath ?? null,
        }),
        ...(isPhotoModified === "delete" && {
          photoPath: null,
        }),
      };
    }
    if (email?.trim()) updates.email = email.trim();
    if (password) updates.password = password;

    // console.log("Updates object:", updates);

    if (Object.keys(updates).length === 0) {
      console.log("Nothing to update!");
      return;
    }

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
      photoPath,
      isPhotoModified,
    }: updateUserFormData) =>
      updateProfile({ email, password, name, photoPath, isPhotoModified }),
    onError: (error) => console.log("Error:", error.message),
  });
}
