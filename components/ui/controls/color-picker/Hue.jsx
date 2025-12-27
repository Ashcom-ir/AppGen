"use client";

import {useRef, useEffect } from "react";

/* ---------- Hue Slice ---------- */
/* ---------- Hue Slice ---------- */
const HueSlice = ({ degree, radius, color, marker=false }) => {
    const angleOffset = marker ? 6 : 1;  // marker پهن‌تر
    const strokeWidth = marker ? 20 : 8; // ضخامت دایره اصلی هم بیشتر شد

    const sx = Math.sin((degree - angleOffset)*Math.PI/180)*radius;
    const sy = -Math.cos((degree - angleOffset)*Math.PI/180)*radius;
    const ex = Math.sin((degree + angleOffset)*Math.PI/180)*radius;
    const ey = -Math.cos((degree + angleOffset)*Math.PI/180)*radius;

    return <path d={`M ${sx} ${sy} A ${radius} ${radius} 0 0 1 ${ex} ${ey}`} stroke={color} strokeWidth={strokeWidth} fill="none"/>
};

/* ---------- Hue Ring ---------- */
function Hue({ hue, saturation, lightness, setHue, size=360, radius=150 }) {
    const svgRef = useRef(null);

    useEffect(()=>{
        const svg = svgRef.current;
        let offsetX=0, offsetY=0;

        const getDegree=(x,y)=>{
            const rect = svg.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            const xr = x - offsetX - cx;
            const yr = y - offsetY - cy;
            let deg = Math.atan2(yr,xr)*180/Math.PI + 90;
            setHue(Math.round(deg));
        };

        const down = e=>{
            const rect = svg.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            const shouldX = Math.sin(hue*Math.PI/180)*radius;
            const shouldY = -Math.cos(hue*Math.PI/180)*radius;
            offsetX = e.clientX - (cx + shouldX);
            offsetY = e.clientY - (cy + shouldY);
            window.addEventListener("mousemove",move);
            window.addEventListener("mouseup",up);
        };
        const move=e=>getDegree(e.clientX,e.clientY);
        const up=()=>{window.removeEventListener("mousemove",move); window.removeEventListener("mouseup",up);}
        svg.addEventListener("mousedown",down);
        return ()=>svg.removeEventListener("mousedown",down);
    },[hue,setHue,radius]);

    return (
        <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{cursor:"pointer"}}>
            <g transform={`translate(${size/2},${size/2})`}>
                {Array.from({length:360}).map((_,i)=>(
                    <HueSlice key={i} degree={i} radius={radius} color={`hsl(${i},${saturation}%,${lightness}%)`}/>
                ))}
                <HueSlice degree={hue} radius={radius} color="white" marker/>
                <text x="0" y={-radius-20} textAnchor="middle" style={{fontSize: radius*0.25, fill:`hsl(${hue},${saturation}%,${lightness}%)`}}>{hue}°</text>
                <text x="0" y={-radius-5} textAnchor="middle" style={{fontSize: radius*0.08, fill:`hsl(${hue},${saturation}%,${lightness}%)`}}>Hue</text>
            </g>
        </svg>
    );
}

export default Hue;
