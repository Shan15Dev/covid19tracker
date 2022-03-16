import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const URL = "https://www.covid19.admin.ch/api/data/context";
var today = new Date();
var date =
  today.getFullYear() +
  "-" +
  ("0" + (today.getMonth() + 1)).slice(-2) +
  "-" +
  today.getDate();
export default function TestsCHLine() {
  const [tests, setTests] = useState([]);
  const [testsList, setTestList] = useState([]);
  Chart.register(CategoryScale);
  useEffect(async () => {
    const response = await fetch(URL);
    const responseJSON = await response.json();

    const caseResponse = await fetch(
      `${responseJSON["sources"]["individual"]["json"]["daily"]["test"]}`
    );
    const caseResponseJSON = await caseResponse.json();

    const testTotal = [];
    const testPos = [];
    const list = [];
    for (let geoRegion of caseResponseJSON) {
      if (geoRegion["datum"] !== date) {
        list.push(geoRegion);
        testTotal.push(geoRegion.entries);
        testPos.push(geoRegion.entries_pos);
      }
    }
    setTestList({
      labels: list.map((i) => i.datum),
      datasets: [
        {
          label: "Total COVID-19 Tests",
          data: testTotal,
          borderColor: "#a8d2ed",
        },
        {
          label: "Positive COVID-19 Tests",
          data: testPos,
          borderColor: "#68e86d",
        },
      ],
    });
  }, []);


  return (
    <div>
      {testsList.length != 0 && (
        <Line data={testsList} width={400} height={400} />
      )}
    </div>
  );
}
