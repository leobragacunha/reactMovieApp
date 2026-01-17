export interface ProfilePhotoUploaderProps {
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
  previewURL: string | null;
  onSetPreviewURL: (preview: string | null) => void;
  previewFile: File | null;
  onSetPreviewFile: (file: File | null) => void;
}
