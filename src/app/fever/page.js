"use client"; // This is a client component

import Historical from '../../components/components/Historical';

export default function Spring() {
  return (
    <div>
      <svg width={800} height={500} >
      <Historical/>
      </svg>
    </div>
  );
}

