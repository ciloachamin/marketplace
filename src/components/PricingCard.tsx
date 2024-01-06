import React from 'react';
import WhatsAppButton from './WhatsAppButton';
interface PricingCardProps {
  title: string;
  description: string;
  promo?: string;
  price: string;
  time: string;
  features: string[];
  buttonText: string;
  buttonMessage: string;
  buttonNumber: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  promo,
  price,
  time,
  features,
  buttonText,
  buttonMessage,
  buttonNumber,
}) => {
  return (
    <div className="flex flex-col max-w-lg w-[400px] p-6 shadow-lg mx-auto text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-gray-700 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>
      <span className="mr-2 text-5xl font-extrabold">{promo}</span>
      <div className="flex items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500 dark:text-gray-400">/{time}</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span>{feature}</span>
          </li>

        ))}
      </ul>
      <span className="mb-5 text-muted-foreground text-xs hover:text-gray-700"  >* Aplican condiciones</span>


      <WhatsAppButton phoneNumber={buttonNumber} message={buttonMessage} text={buttonText} />
    </div>
  );
};

export default PricingCard;
