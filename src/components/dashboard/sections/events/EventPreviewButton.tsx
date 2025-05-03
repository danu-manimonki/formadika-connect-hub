
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface EventPreviewButtonProps {
  onPreview: () => void;
}

export function EventPreviewButton({ onPreview }: EventPreviewButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onPreview}
      className="mb-4"
    >
      <Eye className="h-4 w-4 mr-2" /> Preview
    </Button>
  );
}
