// BorderBeamFullBody.jsx
import React from 'react';
import './BorderBeam.scss';

export default function BorderBeamFullBody({
  content = null,
  gradientColorStart = '#00ff99',
  gradientColorEnd = '#0066ff',
  borderRadius = '16px',
  borderColor = 'rgba(255,255,255,0.06)',
  animationDuration = '4s',
  beamWidth = '4px',
}) {
  return (
    <div className="border-beam-wrapper" style={{ borderRadius, border: `1px solid ${borderColor}` }}>
      <span className='border_1'> </span>
      <span className='border_2'> </span>
      <span className='border_3'> </span>
      <span className='border_4'> </span>
      <div className="border-beam-content" style={{ borderRadius }}>
        {content}
      </div>
      <div
        className="border-beam-animation"
        style={{
          '--gradient-start': gradientColorStart,
          '--gradient-end': gradientColorEnd,
          '--beam-width': beamWidth,
          '--animation-duration': animationDuration,
          borderRadius,
        }}
      />
    </div>
  );
}
