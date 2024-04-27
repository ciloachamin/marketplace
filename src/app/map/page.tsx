'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useRef, useState } from 'react';
import InfoBox from './info';

const MapPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedElement, setHighlightedElement] = useState<NodeListOf<Element> | null>(null);
    const [searchMessage, setSearchMessage] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(1); // Estado para controlar el nivel de zoom
    const svgRef = useRef<SVGSVGElement>(null); // Referencia al elemento SVG

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.1); // Incrementar el nivel de zoom
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.2) {
            // Limitar el nivel mínimo de zoom
            setZoomLevel(zoomLevel - 0.1); // Decrementar el nivel de zoom
        }
    };

    const handleSearch = () => {
        // const svg = document.getElementById('mapSvg');
        const svg = svgRef.current;
        console.log(svg);
        
        if (!svg) return;

        if (highlightedElement) {
            highlightedElement.forEach(element => {
                element.classList.remove('st1');
            });
        }
        if (searchTerm.trim() === '') {
            setHighlightedElement(null);
            setSearchMessage('');
            return;
        }

        const elements = svg.querySelectorAll(`.${searchTerm}`);

        if (elements.length > 0) {
            setHighlightedElement(elements);
            setSearchMessage(getSearchMessage(searchTerm)); // Obtener el mensaje para el término de búsqueda
            elements.forEach(element => {
                element.classList.add('st4');
            });
        } else {
            setHighlightedElement(null);
            setSearchMessage('No se encontró ninguna aula con ese nombre.');
        }
    };

    const getSearchMessage = (searchTerm: string) => {
        const messages: { [key: string]: string } = {
            A01: 'A01 se encuentra en el primer piso.',
            A11: 'A11 Esta aula se encuentra en el segundo piso.',
            A21: 'A21 Esta aula se encuentra en el tercer piso.',
            Baño: 'Baño bloque C',
        };
        return messages[searchTerm] || 'Aula no encontrada.';
    };
    // Calcula el nuevo viewBox
const newViewBox = `0 0 ${3633.4 * zoomLevel} ${2676.9 * zoomLevel}`;

// Actualiza el viewBox del SVG



    return (
        <MaxWidthWrapper className='px-2.5 md:px-20'>
            <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                <div>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button onClick={handleSearch}>Buscar</button>
                </div>
                <div>
                    <button onClick={handleZoomIn}>Acercar</button>
                    <button onClick={handleZoomOut}>Alejar</button>
                </div>
                <svg ref={svgRef} version="1.1" id="mapSvg" xmlns="http://www.w3.org/2000/svg" viewBox={newViewBox}>
                    <polygon className="st1" points="1722,1027 1693.5,1029.3 1693.8,803.9 2280.8,810.8 2280.4,1030.2 1888.7,1030.2 1889.6,1154.1 
	2077.4,1157 2076.7,1446 1940.4,1445 1941.8,1382.8 1722.2,1384.5 1726.6,1438.6 1756.7,1438.9 1757.9,1660.6 1189.4,1663.7 
	1190.3,1434.3 1589.1,1435.6 1589.6,1301.1 1394.6,1300.8 1394.8,1029.2 1531.4,1031.5 1532.6,1096 1723.8,1097.3 "/>
                    <rect x="1934.1" y="960.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2002.6" y="960.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2205.1" y="960.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2137.6" y="960.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2070.1" y="960.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1933.6" y="820.3" className="st0" width="67.5" height="57.9" />
                    <rect x="2002.1" y="820.3" className="st0" width="67.5" height="57.9" />
                    <rect x="2204.6" y="820.3" className="st0" width="67.5" height="57.9" />
                    <rect x="2137.1" y="820.3" className="st0" width="67.5" height="57.9" />
                    <rect x="2069.6" y="820.3" className="st0" width="67.5" height="57.9" />
                    <rect x="1208" y="1588.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1276.5" y="1588.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1479" y="1588.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1411.5" y="1588.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1344" y="1588.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1208.5" y="1449.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1277" y="1449.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1479.5" y="1449.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1412" y="1449.6" className="st0" width="67.5" height="57.9" />
                    <rect x="1344.5" y="1449.6" className="st0" width="67.5" height="57.9" />
                    <rect x="2006.9" y="1186.7" className="st0" width="57.9" height="67.5" />
                    <rect x="2006.9" y="1255.2" className="st0" width="57.9" height="67.5" />
                    <rect x="2006.9" y="1322.7" className="st0" width="57.9" height="67.5" />
                    <rect x="1416.4" y="1059.7" className="st0" width="57.9" height="67.5" />
                    <rect x="1416.3" y="1128.2" className="st0" width="57.9" height="67.5" />
                    <rect x="1416.3" y="1195.7" className="st0" width="57.9" height="67.5" />
                    <rect x="1702.2" y="812.9" className="st0" width="57.9" height="67.5" />
                    <rect x="1702.2" y="881.4" className="st0" width="57.9" height="67.5" />
                    <rect x="1702.2" y="948.9" className="st0" width="57.9" height="67.5" />
                    <rect x="1866.6" y="1308.8" className="st0" width="67.5" height="57.9" />
                    <rect x="1798.2" y="1308.8" className="st0" width="67.5" height="57.9" />
                    <rect x="1730.7" y="1308.8" className="st0" width="67.5" height="57.9" />
                    <rect x="1688" y="1448.6" className="st0" width="57.9" height="67.5" />
                    <rect x="1688" y="1517.1" className="st0" width="57.9" height="67.5" />
                    <rect x="1688" y="1584.6" className="st0" width="57.9" height="67.5" />
                    <rect x="1658.1" y="1112.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1589.6" y="1112.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1522.1" y="1112.4" className="st0" width="67.5" height="57.9" />
                    <polygon className="st1" points="907.3,412.7 878.8,415 879.1,189.6 1466.1,196.5 1465.7,415.9 1074,415.9 1074.9,539.8 1262.7,542.7 
	1262,831.7 1125.7,830.7 1127.1,768.5 907.5,770.2 911.9,824.3 942,824.6 943.2,1046.3 374.7,1049.4 375.6,820 774.4,821.3 
	774.9,686.8 579.9,686.5 580.1,414.9 716.7,417.2 717.9,481.7 909.1,483 "/>
                    <rect x="1119.4" y="346.1" className="st0" width="67.5" height="57.9" />
                    <rect x="1187.9" y="346.1" className="st0" width="67.5" height="57.9" />
                    <rect x="1390.4" y="346.1" className="st0" width="67.5" height="57.9" />
                    <rect x="1322.9" y="346.1" className="st0" width="67.5" height="57.9" />
                    <rect x="1255.4" y="346.1" className="st0" width="67.5" height="57.9" />
                    <rect x="1118.9" y="206" className="st0" width="67.5" height="57.9" />
                    <rect x="1187.4" y="206" className="st0" width="67.5" height="57.9" />
                    <rect x="1389.9" y="206" className="st0" width="67.5" height="57.9" />
                    <rect x="1322.4" y="206" className="st0" width="67.5" height="57.9" />
                    <rect x="1254.9" y="206" className="st0" width="67.5" height="57.9" />
                    <rect x="393.3" y="974.3" className="st0" width="67.5" height="57.9" />
                    <rect x="461.8" y="974.3" className="st0" width="67.5" height="57.9" />
                    <rect x="664.3" y="974.3" className="st0" width="67.5" height="57.9" />
                    <rect x="596.8" y="974.3" className="st0" width="67.5" height="57.9" />
                    <rect x="529.3" y="974.3" className="st0" width="67.5" height="57.9" />
                    <rect x="393.8" y="835.3" className="st0" width="67.5" height="57.9" />
                    <rect x="462.3" y="835.3" className="st0" width="67.5" height="57.9" />
                    <rect x="664.8" y="835.3" className="st0" width="67.5" height="57.9" />
                    <rect x="597.3" y="835.3" className="st0" width="67.5" height="57.9" />
                    <rect x="529.8" y="835.3" className="st0" width="67.5" height="57.9" />
                    <rect x="1192.2" y="572.4" className="st0" width="57.9" height="67.5" />
                    <rect x="1192.2" y="640.9" className="st0" width="57.9" height="67.5" />
                    <rect x="1192.2" y="708.4" className="st0" width="57.9" height="67.5" />
                    <rect x="601.7" y="445.4" className="st0" width="57.9" height="67.5" />
                    <rect x="601.6" y="513.9" className="st0" width="57.9" height="67.5" />
                    <rect x="601.6" y="581.4" className="st0" width="57.9" height="67.5" />
                    <rect x="887.5" y="198.6" className="st0" width="57.9" height="67.5" />
                    <rect x="887.4" y="267.1" className="st0" width="57.9" height="67.5" />
                    <rect x="887.4" y="334.6" className="st0" width="57.9" height="67.5" />
                    <rect x="1051.9" y="694.6" className="st0" width="67.5" height="57.9" />
                    <rect x="983.5" y="694.6" className="st0" width="67.5" height="57.9" />
                    <rect x="916" y="694.5" className="st0" width="67.5" height="57.9" />
                    <rect x="873.3" y="834.3" className="st0" width="57.9" height="67.5" />
                    <rect x="873.2" y="902.8" className="st0" width="57.9" height="67.5" />
                    <rect x="873.2" y="970.3" className="st0" width="57.9" height="67.5" />
                    <rect x="843.4" y="498.1" className="st0" width="67.5" height="57.9" />
                    <rect x="774.9" y="498.1" className="st0" width="67.5" height="57.9" />
                    <rect x="707.4" y="498.1" className="st0" width="67.5" height="57.9" />
                    <polygon className="st1" points="2933.5,306.1 2905,308.4 2905.3,83 3492.3,89.9 3491.9,309.3 3100.2,309.3 3101.1,433.2 3288.9,436.1 
	3288.2,725.1 3151.9,724.1 3153.3,661.9 2933.7,663.6 2938.1,717.7 2968.2,718 2969.4,939.7 2400.9,942.8 2401.8,713.4 
	2800.6,714.7 2801.1,580.2 2606.1,579.9 2606.3,308.3 2742.9,310.6 2744.1,375.1 2935.3,376.4 "/>
                    <rect x="3145.6" y="239.5" className="st0" width="67.5" height="57.9" />
                    <rect x="3214.1" y="239.5" className="st0" width="67.5" height="57.9" />
                    <rect x="3416.6" y="239.5" className="st0" width="67.5" height="57.9" />
                    <rect x="3349.1" y="239.5" className="st0" width="67.5" height="57.9" />
                    <rect x="3281.6" y="239.5" className="st0" width="67.5" height="57.9" />
                    <rect x="3145.1" y="99.4" className="st0" width="67.5" height="57.9" />
                    <rect x="3213.6" y="99.4" className="st0" width="67.5" height="57.9" />
                    <rect x="3416.1" y="99.4" className="st0" width="67.5" height="57.9" />
                    <rect x="3348.6" y="99.4" className="st0" width="67.5" height="57.9" />
                    <rect x="3281.1" y="99.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2419.5" y="867.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2488" y="867.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2690.5" y="867.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2623" y="867.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2555.5" y="867.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2420" y="728.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2488.5" y="728.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2691" y="728.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2623.5" y="728.7" className="st0" width="67.5" height="57.9" />
                    <rect x="2556" y="728.7" className="st0" width="67.5" height="57.9" />
                    <rect x="3218.4" y="465.8" className="st0" width="57.9" height="67.5" />
                    <rect x="3218.4" y="534.3" className="st0" width="57.9" height="67.5" />
                    <rect x="3218.4" y="601.8" className="st0" width="57.9" height="67.5" />
                    <rect x="2627.9" y="338.9" className="st0" width="57.9" height="67.5" />
                    <rect x="2627.8" y="407.3" className="st0" width="57.9" height="67.5" />
                    <rect x="2627.8" y="474.8" className="st0" width="57.9" height="67.5" />
                    <rect x="2913.7" y="92" className="st0" width="57.9" height="67.5" />
                    <rect x="2913.7" y="160.5" className="st0" width="57.9" height="67.5" />
                    <rect x="2913.7" y="228" className="st0" width="57.9" height="67.5" />
                    <rect x="3078.1" y="588" className="st0" width="67.5" height="57.9" />
                    <rect x="3009.7" y="588" className="st0" width="67.5" height="57.9" />
                    <rect x="2942.2" y="588" className="st0" width="67.5" height="57.9" />
                    <rect x="2899.5" y="727.7" className="st0" width="57.9" height="67.5" />
                    <rect x="2899.5" y="796.2" className="st0" width="57.9" height="67.5" />
                    <rect x="2899.5" y="863.7" className="st0" width="57.9" height="67.5" />
                    <rect x="2869.6" y="391.6" className="st0" width="67.5" height="57.9" />
                    <rect x="2801.1" y="391.6" className="st0" width="67.5" height="57.9" />
                    <rect x="2733.6" y="391.6" className="st0" width="67.5" height="57.9" />
                    <polygon className="st1" points="685,1957.1 656.5,1959.4 656.8,1734 1243.8,1740.9 1243.4,1960.3 851.7,1960.3 852.6,2084.2 
	1040.4,2087.1 1039.7,2376.1 903.4,2375.1 904.8,2312.9 685.2,2314.6 689.6,2368.7 719.7,2369 720.9,2590.7 152.4,2593.8 
	153.3,2364.4 552.1,2365.7 552.6,2231.2 357.6,2230.9 357.8,1959.3 494.4,1961.6 495.6,2026.1 686.8,2027.4 "/>
                    <rect x="897.1" y="1890.5" className="st0" width="67.5" height="57.9" />
                    <rect x="965.6" y="1890.5" className="st0" width="67.5" height="57.9" />
                    <rect x="1168.1" y="1890.5" className="st0" width="67.5" height="57.9" />
                    <rect x="1100.6" y="1890.5" className="st0" width="67.5" height="57.9" />
                    <rect x="1033.1" y="1890.5" className="st0" width="67.5" height="57.9" />
                    <rect x="896.6" y="1750.4" className="st0" width="67.5" height="57.9" />
                    <rect x="965.1" y="1750.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1167.6" y="1750.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1100.1" y="1750.4" className="st0" width="67.5" height="57.9" />
                    <rect x="1032.6" y="1750.4" className="st0" width="67.5" height="57.9" />
                    <rect x="171" y="2518.7" className="st0" width="67.5" height="57.9" />
                    <rect x="239.5" y="2518.7" className="st0" width="67.5" height="57.9" />
                    <rect x="442" y="2518.7" className="st0" width="67.5" height="57.9" />
                    <rect x="374.5" y="2518.7" className="st0" width="67.5" height="57.9" />
                    <rect x="307" y="2518.7" className="st0" width="67.5" height="57.9" />
                    <rect x="171.5" y="2379.7" className="st0" width="67.5" height="57.9" />
                    <rect x="240" y="2379.7" className="st0" width="67.5" height="57.9" />
                    <rect x="442.5" y="2379.7" className="st0" width="67.5" height="57.9" />
                    <rect x="375" y="2379.7" className="st0" width="67.5" height="57.9" />
                    <rect x="307.5" y="2379.7" className="st0" width="67.5" height="57.9" />
                    <rect x="969.8" y="2116.8" className="st0" width="57.9" height="67.5" />
                    <rect x="969.8" y="2185.2" className="st0" width="57.9" height="67.5" />
                    <rect x="969.8" y="2252.7" className="st0" width="57.9" height="67.5" />
                    <rect x="379.3" y="1989.8" className="st0" width="57.9" height="67.5" />
                    <rect x="379.3" y="2058.2" className="st0 A02" width="57.9" height="67.5" />
                    <rect x="379.3" y="2125.7" className="st0" width="57.9" height="67.5" />
                    <rect x="665.1" y="1742.9" className="st0" width="57.9" height="67.5" />
                    <rect x="665.1" y="1811.4" className="st0" width="57.9" height="67.5" />
                    <rect x="665.1" y="1878.9" className="st0" width="57.9" height="67.5" />
                    <rect x="829.6" y="2238.9" className="st0" width="67.5" height="57.9" />
                    <rect x="761.1" y="2238.9" className="st0" width="67.5" height="57.9" />
                    <rect x="693.6" y="2238.9" className="st0" width="67.5" height="57.9" />
                    <rect x="650.9" y="2378.6" className="st0" width="57.9" height="67.5" />
                    <rect x="650.9" y="2447.1" className="st0" width="57.9" height="67.5" />
                    <rect x="650.9" y="2514.6" className="st0" width="57.9" height="67.5" />
                    <rect x="621.1" y="2042.5" className="st0" width="67.5" height="57.9" />
                    <rect x="552.5" y="2042.5" className="st0" width="67.5" height="57.9" />
                    <rect x="485" y="2042.5" className="st0" width="67.5" height="57.9" />
                    <polygon className="st1" points="2576.7,1797.6 2548.2,1799.9 2548.5,1574.5 3135.5,1581.4 3135.1,1800.8 2743.4,1800.8 2744.3,1924.7 
	2932.1,1927.6 2931.4,2216.6 2795.1,2215.6 2796.5,2153.4 2576.9,2155.1 2581.3,2209.2 2611.4,2209.5 2612.6,2431.2 2044.1,2434.3 
	2045,2204.9 2443.8,2206.2 2444.3,2071.7 2249.3,2071.4 2249.5,1799.8 2386.1,1802.1 2387.3,1866.6 2578.5,1867.9 "/>
                    <rect x="2788.8" y="1731" className="st0" width="67.5" height="57.9" />
                    <rect x="2857.3" y="1731" className="A01" width="67.5" height="57.9" />
                    <rect x="3059.8" y="1731" className="st0" width="67.5" height="57.9" />
                    <rect x="2992.3" y="1731" className="st0" width="67.5" height="57.9" />
                    <rect x="2924.8" y="1731" className="st0" width="67.5" height="57.9" />
                    <rect x="2788.3" y="1590.9" className="st0" width="67.5" height="57.9" />
                    <rect x="2856.8" y="1590.9" className="st0" width="67.5" height="57.9" />
                    <rect x="3059.3" y="1590.9" className="st0" width="67.5" height="57.9" />
                    <rect x="2991.8" y="1590.9" className="st0" width="67.5" height="57.9" />
                    <rect x="2924.3" y="1590.9" className="st0" width="67.5" height="57.9" />
                    <rect x="2062.7" y="2359.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2131.2" y="2359.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2333.7" y="2359.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2266.2" y="2359.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2198.7" y="2359.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2063.2" y="2220.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2131.7" y="2220.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2334.2" y="2220.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2266.7" y="2220.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2199.2" y="2220.2" className="st0" width="67.5" height="57.9" />
                    <rect x="2861.6" y="1957.3" className="st0" width="57.9" height="67.5" />
                    <rect x="2861.5" y="2025.8" className="st0" width="57.9" height="67.5" />
                    <rect x="2861.5" y="2093.3" className="st0" width="57.9" height="67.5" />
                    <rect x="2271" y="1830.3" className="st0" width="57.9" height="67.5" />
                    <rect x="2271" y="1898.8" className="st0" width="57.9" height="67.5" />
                    <rect x="2271" y="1966.3" className="st0" width="57.9" height="67.5" />
                    <rect x="2556.9" y="1583.5" className="st0" width="57.9" height="67.5" />
                    <rect x="2556.8" y="1651.9" className="st0" width="57.9" height="67.5" />
                    <rect x="2556.8" y="1719.4" className="st0" width="57.9" height="67.5" />
                    <rect x="2721.3" y="2079.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2652.9" y="2079.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2585.4" y="2079.4" className="st0" width="67.5" height="57.9" />
                    <rect x="2542.6" y="2219.2" className="st0" width="57.9" height="67.5" />
                    <rect x="2542.6" y="2287.6" className="st0" width="57.9" height="67.5" />
                    <rect x="2542.6" y="2355.1" className="st0" width="57.9" height="67.5" />
                    <rect x="2512.8" y="1883" className="st0" width="67.5" height="57.9" />
                    <rect x="2444.3" y="1883" className="st0" width="67.5" height="57.9" />
                    <rect x="2376.8" y="1883" className="st0" width="67.5" height="57.9" />
                </svg>
                <style>
                    {`.st0{fill:#63B22F;}
                    .st1{fill:#D2DA48;}
                    .st2{fill:#274C26;}
                    .st3{fill:#FFFFFF;}
                    .st4{fill:#FAFAFA;}
                    .st5{fill:#DEDF42;}
                    .st6{fill:#E52622;}
                    .st7{fill:#63B22F;stroke:#000000;stroke-width:9;stroke-miterlimit:10;}
`}
                </style>
                {highlightedElement && Array.from(highlightedElement).map((element, index) => (
                    <InfoBox key={index} element={element} searchMessage={searchMessage} />
                ))}
            </div>
        </MaxWidthWrapper>
    );
};

export default MapPage;
