
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface EventTypeDetailsProps {
  form: ReturnType<typeof useForm>;
}

export function EventTypeDetails({ form }: EventTypeDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b">
        <h3 className="text-lg font-medium">Informasi Detail Kegiatan</h3>
      </div>

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Jenis Kegiatan</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline">Offline (Tatap Muka)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Online (Virtual)</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="participants"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimasi Jumlah Peserta</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormDescription>
              Perkiraan jumlah peserta yang akan hadir
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="max_participants"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kuota Peserta (Opsional)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="Kosongkan jika tidak ada batasan"
                value={field.value === undefined || field.value === null ? '' : field.value}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                  field.onChange(val);
                }}
              />
            </FormControl>
            <FormDescription>
              Batas maksimal jumlah peserta yang dapat mendaftar
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
            <FormLabel>Status Kegiatan</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status kegiatan" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="upcoming">Akan Datang</SelectItem>
                <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Status kegiatan membantu pengunjung mengetahui fase event
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="is_featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Tampilkan di Halaman Utama
              </FormLabel>
              <FormDescription>
                Jadikan event ini sebagai highlight di halaman utama website
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
