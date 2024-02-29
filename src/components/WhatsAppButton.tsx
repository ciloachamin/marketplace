"use client"
import React, { useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  text: string;
  autoSend?: boolean;

}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message, text, autoSend}) => {
  const baseUrl = 'https://wa.me/';
  
  // const sendMessage = () => {
  //   window.open(`${baseUrl}${"593"+phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  // };

  // // const sendMessage = () => {
  // //   window.open(`${baseUrl}${"593"+phoneNumber}?text=${encodeURIComponent(message)}`);
  // // };

  // useEffect(() => {
  //   // Si la prop autoSend está establecida en true, envía el mensaje automáticamente al montarse el componente
  //   if (autoSend) {
  //     sendMessage();
  //   }
  // }, []); // El efecto se ejecutará solo una vez al montarse el componente


  return (
    <a aria-label="Chat on WhatsApp" href={`${baseUrl}${"593"+phoneNumber}?text=${encodeURIComponent(message)}`} className=" bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white border  dark:text-white  dark:focus:ring-primary-900">
        {text}
    </a>
  );
};

export default WhatsAppButton;
