export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string | null;
  type: 'online' | 'offline';
  participants: number;
  created_at: string;
  updated_at: string;
  is_featured?: boolean;
  max_participants?: number | null;
  registered_participants?: number;
  notification_sent?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendance_status?: 'registered' | 'confirmed' | 'attended' | 'absent' | 'cancelled';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: 'image' | 'video' | 'youtube';
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Member {
  id: string;
  name: string;
  university: string;
  major: string;
  batch: string;
  location: string | null;
  type: 'active' | 'alumni';
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  email: string;
  amount: number;
  donation_type: 'scholarship' | 'event' | 'community' | 'general';
  message: string | null;
  is_anonymous: boolean;
  payment_method: 'bank_transfer' | 'qris' | 'ewallet';
  payment_status: 'pending' | 'completed' | 'failed';
  bank_name: string | null;
  transaction_proof: string | null;
  created_at: string;
  updated_at: string;
}

// Add the RegularUser type for the regular_users table
export interface RegularUser {
  id: string;
  name: string;
  email: string;
  password: string;  // Note: In production, passwords should be hashed
  university: string | null;
  created_at: string;
}
