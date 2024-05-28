import React, { useState, useEffect } from "react";
import Arcs from "./Arcs";
import ArcsBackground from "./ArcsBackground";
import Legend from "./Legend";
import { supabase } from "./../supabaseClient";
import labelConstants from "./labelConstants";

const arcArr = [...Array(5).keys()];

const labels = labelConstants.labels.indices;
const changes = {
  change_cpi: 3.11,
  change_pce: 4.47,
  change_cpilfesl: 3.87,
  change_pcepilfe: 2.88,
  change_composite: 2.64,
};
const ArcChart = ({ chartType, width, height }) => {
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

      setAppData(dat);
    }

    getData();
  }, []);

  return (
    <svg width={width} height={height + 100}>
      {appData.length > 0 && appData[0].current > 0
        ? arcArr.map((arc, index) => (
            <g key={"arc-g-bg-" + arc}>
              <ArcsBackground
                context={context}
                key={"arc-bg-" + arc}
                arcIndex={arc}
                innerRadius={90 + 45 * index}
                thickness={40}
                width={width}
                height={height}
              />
              <Arcs
                context={context}
                labels={labels}
                displayText={true}
                current={
                  context === "inflation"
                    ? appData[index].current
                    : appData[index].current_rate
                }
                key={"arc-fg-" + arc}
                average={
                  context === "inflation"
                    ? appData[index].average
                    : appData[index].average_rate
                }
                previous={appData[index].previous}
                targetMonth={appData[index].target_month}
                targetYear={appData[index].target_year}
                range={appData[index].range}
                ranges={JSON.parse(appData[index].ranges)}
                arcIndex={arc}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                innerRadius={90 + 45 * index}
                thickness={40}
                width={width}
                height={height}
              />
              <Legend
                context={context}
                hoveredIndex={hoveredIndex}
                width={width}
                height={height}
              />
            </g>
          ))
        : ""}
    </svg>
  );
};

export default ArcChart;
