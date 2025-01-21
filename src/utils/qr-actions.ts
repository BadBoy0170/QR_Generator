import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ContactInfo, WifiConfig } from '../types/qr';

export const downloadQR = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = await html2canvas(element);
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = url;
  link.click();
};

export const printQR = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = await html2canvas(element);
  const url = canvas.toDataURL('image/png');
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <img src="${url}" />
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.close();
            }, 250);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

export const shareQR = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0);
    });

    if (navigator.share) {
      try {
        // First try to share with files
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });
        await navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code!',
          files: [file]
        });
      } catch (fileError) {
        // If file sharing fails, try sharing without files
        const url = URL.createObjectURL(blob);
        try {
          await navigator.share({
            title: 'QR Code',
            text: 'Check out this QR code!',
            url
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error sharing QR code:', error);
    // Fallback to download if sharing fails
    downloadQR(elementId);
  }
};

export const generateVCard = (contact: ContactInfo): string => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
${contact.company ? `ORG:${contact.company}\n` : ''}
${contact.title ? `TITLE:${contact.title}\n` : ''}
END:VCARD`;
};

export const generateWifiQR = (config: WifiConfig): string => {
  return `WIFI:T:${config.encryption};S:${config.ssid};P:${config.password};;`;
};