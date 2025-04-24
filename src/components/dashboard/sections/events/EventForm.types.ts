
export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  participants: number;
  image_url: string;
}
