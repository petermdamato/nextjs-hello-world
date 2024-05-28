"use client"; // This is a client component

import TransitionArc from '../../components/components/TransitionArc';
const arr = [0,1,2,3,4]
const width = 400
const height = 300
export default function Spring() {
  return (
    <div>
      <div style={{width:width, height:height}} >
      <TransitionArc />
      </div>
    </div>
  );
}

