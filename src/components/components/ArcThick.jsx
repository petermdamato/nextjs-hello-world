"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import ArcWithLabels from "./ArcWithLabels";
import { supabase } from "../supabaseClient";
import labelConstants from "./labelConstants";

const arcArr = [...Array(5).keys()];
const changes = {
  change_cpi: 3.11,
  change_pce: 4.47,
  change_cpilfesl: 3.87,
  change_pcepilfe: 2.88,
  change_composite: 2.64,
};
const labels = labelConstants.labels.rates;

const ArcThick = ({ chartType = 1, width, height }) => {
  const context = ["inflation", "inflation_rate"][chartType];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("inflation").select(`*`);
      data.reverse();
      let dat = [];
      const keys = Object.keys(data[0]).slice(5, 35);
      for (let i = 0; i < 5 && i < keys.length; i++) {
        let payload = {};
        const key = i === 4 ? keys[i].split("_")[1] : keys[3 - i].split("_")[1];

        payload["key"] = key;
        payload["current"] = data[0]["change_" + key];
        payload["average"] = data[0]["average_" + key];
        payload["current_rate"] = data[0]["rate_" + key];
        payload["average_rate"] = data[0]["average_rate_" + key];
        payload["target_month"] = data[0]["target_month_" + key];
        payload["target_year"] = data[0]["target_year_" + key];
        payload["range"] = data[0]["95_" + key];
        payload["ranges"] = data[0]["ranges_rate_" + key];
        payload["previous"] = changes["change_" + key];
        dat.push(payload);
      }

      setAppData(dat[0]);
    }

    getData();
  }, []);

  return (
    <g key={"arc-g-bg-0"}>
      {appData?.ranges?.length > 0 ? (
        <ArcWithLabels
          context={context}
          labels={labels}
          key={"arc-fg-0"}
          innerRadius={110 + 40}
          thickness={70}
          width={width}
          height={height}
          current={appData.current_rate}
          previous={appData.previous}
          target_month={appData.target_month}
          target_year={appData.target_year}
          range={appData.range}
          ranges={JSON.parse(appData.ranges)}
        />
      ) : (
        ""
      )}
    </g>
  );
};

export default ArcThick;
