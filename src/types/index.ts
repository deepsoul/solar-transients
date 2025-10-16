export interface Release {
  id: string;
  title: string;
  date: string;
  coverUrl: string;
  spotifyUrl: string;
  appleUrl: string;
  tidalUrl: string;
  previewUrl: string;
  description: string;
  tags: string[];
  type: 'Single' | 'EP' | 'Album';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  previewUrl: string;
  spotifyUrl: string;
  appleUrl: string;
  tidalUrl: string;
  coverUrl: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'booking' | 'collaboration';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PressKit {
  bio: string;
  pressPhotos: string[];
  socialLinks: SocialLink[];
  downloadUrl: string;
}
