
import { Card, CardContent } from "@/components/ui/card";

interface EventImageProps {
  imageUrl?: string;
  title?: string;
}

export function EventImage({ imageUrl, title }: EventImageProps) {
  return (
    <Card>
      <CardContent className="p-0">
        {imageUrl ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={title || "Event image"}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Tidak ada gambar</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
