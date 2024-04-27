'use client';
import { useEffect, useState } from 'react';

const InfoBox = ({ element, searchMessage }: { element: any, searchMessage: string }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    console.log('hola',element.classList[0]);
    console.log('hola 2',element.getBoundingClientRect);

    console.log('hola 2',element.classList);
    console.log('hola 2',element.className);
    

    // Función para calcular la posición del cuadro informativo
// Función para calcular la posición del cuadro informativo
const calculatePosition = () => {
    if (element && typeof element.getBoundingClientRect === 'function') {
        const { x, y, width, height } = element.getBoundingClientRect();
        setPosition({ x: x + width / 2, y: y - 50 }); // Ajusta la posición según sea necesario
    }
};

console.log('ps',position);

    // Calcula la posición cuando el elemento cambia
    useEffect(() => {
        calculatePosition();
    }, [element]);
    return (
        <div className="absolute p-3 border bg-white" style={{ top: position.y, left: position.x }}>
           <p> {searchMessage}</p>
        </div>
    );
    
};

export default InfoBox;
