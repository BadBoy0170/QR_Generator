export type QRType = 'url' | 'text' | 'email' | 'contact' | 'event' | 'sms' | 'wifi';

export type QRConfig = {
  type: QRType;
  content: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  logo?: string;
};

export type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
};

export type WifiConfig = {
  ssid: string;
  password: string;
  encryption: 'WEP' | 'WPA' | 'nopass';
};