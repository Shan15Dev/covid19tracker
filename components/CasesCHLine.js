import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto' 

const URL = "https://www.covid19.admin.ch/api/data/context";
export default function CasesCHLine() {
  const [cases, setCases] = useState([]);
  const [casesList, setCasesList] = useState([]);
  Chart.register(CategoryScale)
  useEffect(async () => {
    const response = await fetch(URL);
    const responseJSON = await response.json();
    
    const caseResponse = await fetch(
      `${responseJSON["sources"]["individual"]["json"]["daily"]["cases"]}`
      );
      const caseResponseJSON = await caseResponse.json();
      
      const list = [];
      const casesListItter = [];
    for (let geoRegion of caseResponseJSON) {
      if (geoRegion["geoRegion"] === "CH") {
        list.push(geoRegion);
        casesListItter.push(geoRegion.entries);
      } 
    }
    setCases(list);
    setCasesList({
      labels: list.map(i => i.datum),
      datasets: [
        {
          label: 'My First dataset',
          data: casesListItter
        }
      ]
    })
  }, []);

  return (
    <div>
      <h1>Covid Cases in Switzerland</h1>
     { casesList.length != 0 && <Line data={casesList} width={400} height={400} />}
    </div>
  );
}
