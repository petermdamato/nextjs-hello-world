"use client"; // This is a client component
import styles from "./../page.module.css";
import Tooltip from "../../components/components/Tooltip";

import ArcThick from './../../components/components/ArcThick';

const width = 600
const height = 400
export default function Labeled() {
  return (
    <div style={{width:width}} >
      <svg width={width} height={height} >
      <ArcThick
              width={width}
              height={height}
              />
      </svg>
    </div>
  );
}
