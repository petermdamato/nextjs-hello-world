import React, { useState, useEffect } from "react";
import { supabase } from "./../supabaseClient";
import { scaleLinear } from "d3-scale";
import {
  generateValues,
  pickQuadrant,
  findIndices,
  anglePicker,
} from "./../util";
import * as d3 from "d3";
import Fever from "./Fever";
const parseDate = d3.timeParse("%Y-%m-%d");
const Historical = ({ context }) => {
  const [appData, setAppData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("historical").select(`*`);
      const d = data.filter(
        (entry) => parseDate(entry.date) > parseDate("2014-02-01")
      );

      setAppData(d);
    }

    getData();
  }, []);

  return appData?.length > 0 ? <Fever data={appData} /> : <></>;
};

export default Historical;
