
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "./EventForm.types";

interface EventTypeDetailsProps {
  form: UseFormReturn<EventFormData>;
}

export function EventTypeDetails({ form }: EventTypeDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b">
        <h3 className="text-lg font-medium">Detail Event</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Event</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Partisipan</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  placeholder="Jumlah partisipan"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="max_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kuota Pendaftaran (opsional)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  placeholder="Batas partisipan"
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>
                Biarkan kosong untuk tanpa batas pendaftaran
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Event</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="upcoming">Akan Datang</SelectItem>
                  <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="is_featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Tampilkan di Halaman Utama</FormLabel>
              <FormDescription>
                Event akan ditampilkan di bagian featured pada halaman utama
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
