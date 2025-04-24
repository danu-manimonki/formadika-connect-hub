
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useEventImages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getExistingImages = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching existing images...");
      
      const { data: events, error } = await supabase
        .from('events')
        .select('image_url')
        .not('image_url', 'is', null);

      if (error) {
        console.error("Error fetching existing images:", error);
        toast.error("Failed to load existing images");
        throw error;
      }

      // Filter out null values and get unique URLs
      const uniqueImages = [...new Set(events
        .map(event => event.image_url)
        .filter(url => url && typeof url === 'string') as string[])];

      console.log("Fetched unique images:", uniqueImages);
      return uniqueImages;
    } catch (error) {
      console.error('Error fetching existing images:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { getExistingImages, isLoading };
};
