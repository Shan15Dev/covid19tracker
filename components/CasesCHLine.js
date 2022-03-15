import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const URL = "https://www.covid19.admin.ch/api/data/context";
var today = new Date();
var date =
  today.getFullYear() + "-" +("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
export default function CasesCHLine() {
  const [cases, setCases] = useState([]);
  const [casesList, setCasesList] = useState([]);
  Chart.register(CategoryScale);
  useEffect(async () => {
    const response = await fetch(URL);
    const responseJSON = await response.json();

    const caseResponse = await fetch(
      `${responseJSON["sources"]["individual"]["json"]["daily"]["cases"]}`
    );
    const caseResponseJSON = await caseResponse.json();

    const list = [];
    const casesSwitzerland = [];
    const casesZurich = [];
    for (let geoRegion of caseResponseJSON) {
      if (geoRegion["geoRegion"] === "CHFL" && geoRegion["datum"] !== date) {
        list.push(geoRegion);
        casesSwitzerland.push(geoRegion.entries);
      } else if (
        geoRegion["geoRegion"] === "ZH" &&
        geoRegion["datum"] !== date
      ) {
        casesZurich.push(geoRegion.entries);
      }
    }
    setCases(list);
    setCasesList({
      labels: list.map((i) => i.datum),
      datasets: [
        {
          label: "Covid Cases in Switzerland",
          data: casesSwitzerland,
          borderColor: "#a8d2ed",
        },
        {
          label: "Covid Cases in Zurich",
          data: casesZurich,
          borderColor: "#68e86d",
        },
      ],
    });
  }, []);

  console.log(date);

  return (
    <div>
      {casesList.length != 0 && (
        <Line data={casesList} width={400} height={400} />
      )}
    </div>
  );
}
