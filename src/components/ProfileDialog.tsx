// Types
import type { DialogType } from "@/types/dialog";
import {
  updateUserSchema,
  type updateUserFormData,
} from "@/schemas/updateUser";

// Contexts
import { useUserContext } from "@/contexts/UserContext";

// LIBS
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/hooks/useUpdateUser";

// Components
import ProfilePhotoUploader from "./ProfilePhotoUploader";

// UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { FaEnvelope, FaEye, FaLock, FaUser } from "react-icons/fa";
import { useProfilePhoto } from "@/hooks/useProfilePhoto";

// HOOKS
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ProfileDialog = ({ open, onOpenChange }: DialogType) => {
  // Hook for user info
  const { user } = useUserContext();

  // State for uploading control, file storage and preview URL
  const [uploading, setUploading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(
    user?.user_metadata?.photoPath || null
  );
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  // Hooks for updating user and handling profile photo
  const { handlePhotoUpload, handlePhotoDelete } = useProfilePhoto();
  const updateUserMutation = useUpdateUser();

  const form = useForm<updateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      photoPath: user?.user_metadata?.photoPath,
      isPhotoModified: "none",
    },
    shouldUnregister: true,
  });

  const handleSubmit = async (data: updateUserFormData) => {
    try {
      // Handle photo upload or deletion based on isPhotoModified value
      if (data?.isPhotoModified === "delete") {
        handlePhotoDelete(user?.user_metadata?.photoPath);
        data = { ...data, photoPath: null };
      }
      if (data?.isPhotoModified === "update") {
        const newPhotoPath = await handlePhotoUpload(previewFile);
        newPhotoPath && (data = { ...data, photoPath: newPhotoPath });
      }

      // Updating user info
      await updateUserMutation.mutateAsync(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setPreviewURL(user?.user_metadata?.photoPath || null);
      setPreviewFile(null);
    }
  }, [open, user, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Info</DialogTitle>
          <DialogDescription>
            Check and edit your profile info{" "}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ProfilePhotoUploader
              uploading={uploading}
              setUploading={setUploading}
              previewURL={previewURL}
              onSetPreviewURL={setPreviewURL}
              previewFile={previewFile}
              onSetPreviewFile={setPreviewFile}
            />
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputGroup>
                      <InputGroupInput
                        placeholder={user?.user_metadata?.fullName}
                        aria-invalid={fieldState.invalid}
                        {...field}
                        value={field.value ?? ""}
                        autoComplete="on"
                      />
                      <InputGroupAddon>
                        <FaUser />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <InputGroup>
                      <InputGroupInput
                        placeholder={user?.email}
                        aria-invalid={fieldState.invalid}
                        {...field}
                        value={field.value ?? ""}
                        autoComplete="on"
                      />
                      <InputGroupAddon>
                        <FaEnvelope />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <InputGroup>
                      <InputGroupInput
                        placeholder="Password"
                        type="password"
                        {...field}
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon>
                        <FaLock />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <FaEye className="hover:cursor-pointer" />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <input type="hidden" {...form.register("photoPath")} />
              <input type="hidden" {...form.register("isPhotoModified")} />
              <div className="flex justify-between">
                <InputGroupButton
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onOpenChange(false);
                  }}
                >
                  Close
                </InputGroupButton>
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={uploading || updateUserMutation.isPending}
                >
                  {uploading || updateUserMutation.isPending ? (
                    <Spinner />
                  ) : (
                    "Save"
                  )}
                </InputGroupButton>
              </div>
            </FieldGroup>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
