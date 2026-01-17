import { useRef } from "react";

import { FaCamera, FaTrash } from "react-icons/fa";
import { Spinner } from "./ui/spinner";
import { useFormContext } from "react-hook-form";
import type { ProfilePhotoUploaderProps } from "@/types/profilePhotoUploader";

const ProfilePhotoUploader = ({
  uploading,
  setUploading,
  previewURL,
  onSetPreviewURL,
  onSetPreviewFile,
}: ProfilePhotoUploaderProps) => {
  // Ref for styling the photo div and triggering the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Getting setValue from useFormContext (check useFormContext info to see details)
  const { setValue } = useFormContext();

  // Receive the selected file from input, validates for image and display a preview in the UI
  const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Grab file
    const file = e.target.files?.[0] ?? null;
    // Guard clause if there is no file
    if (!file) return;

    //Validate file (only images)
    try {
      if (!file.type.startsWith("image/")) {
        console.error("Invalid file type");
        alert("Please upload a valid image file.");
        throw new Error("Invalid file type");
      }

      setUploading(true);

      // Preview the image
      const prev = URL.createObjectURL(file);
      onSetPreviewURL(prev);
      setValue("isPhotoModified", "update");
      onSetPreviewFile(file);
    } catch (error) {
      console.error("Error generating preview URL:", error);
    } finally {
      setUploading(false);
    }
  };

  // Clear preview and set form value to delete photo (for when user clicks on the trash icon)
  const handlePhotoDiselection = () => {
    onSetPreviewURL(null);
    onSetPreviewFile(null);
    setValue("isPhotoModified", "delete");
  };

  return (
    <div
      className={`w-30 h-30  mx-auto mb-4 hover:cursor-pointer flex items-center justify-center overflow-hidden relative ${
        !previewURL && "bg-gray-200 rounded-full shadow-md "
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handlePhotoSelection}
      />

      {uploading && <Spinner className="text-gray-700" />}

      {previewURL && !uploading && (
        <img
          src={previewURL}
          alt="User photo"
          className="w-full h-full object-cover rounded-full shadow-md"
        />
      )}

      {previewURL && (
        <FaTrash
          className="absolute top-0.5 right-0.5  bg-white p-1.5 rounded-sm text-gray-700 hover:text-red-600 hover:cursor-pointer transition-colors duration-150 border-2 border-gray-100"
          size={30}
          onClick={(e) => {
            e.stopPropagation();
            handlePhotoDiselection();
          }}
        />
      )}

      {!previewURL && <FaCamera size={40} className="text-gray-500" />}
    </div>
  );
};

export default ProfilePhotoUploader;
