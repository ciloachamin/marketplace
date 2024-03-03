'use client'
import React, { useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  text: string;
  autoSend?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message, text, autoSend}) => {
  const baseUrl = 'https://wa.me/';
  
  useEffect(() => {
    if (autoSend) {
      window.location.href = `${baseUrl}${"593"+phoneNumber}?text=${encodeURIComponent(message)}&source=${encodeURIComponent(document.URL)}`;
    }
  }, []); 

  return (
    <a aria-label="Chat on WhatsApp" href={`${baseUrl}${"593"+phoneNumber}?text=${encodeURIComponent(message)}`} className=" bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white border  dark:text-white  dark:focus:ring-primary-900">
        {text}
    </a>
  );
};

export default WhatsAppButton;
