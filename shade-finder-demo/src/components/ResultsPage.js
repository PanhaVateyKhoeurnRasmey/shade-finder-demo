import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "../styles/results.css";

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: initialData } = location.state || { data: [] };
  const [data, setData] = useState(initialData.recommendations);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTone, setSelectedTone] = useState(
    initialData.tone.tone_label || ""
  );
  const [selectedUndertone, setSelectedUndertone] = useState(
    initialData.undertone.undertone || ""
  );

  const map = { cool: "0", neutral: "1", warm: "2" };

  useEffect(() => {
    fetch("/shade_finder.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (selectedTone && selectedUndertone) {
      const filtered = data.filter(
        (item) =>
          item.skin_darkness === selectedTone &&
          item.warmth === map[selectedUndertone]
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedTone, selectedUndertone, data]);

  const tones = [
    "fair",
    "light",
    "light-medium",
    "medium",
    "medium-deep",
    "deep",
  ];
  const undertones = ["cool", "neutral", "warm"];

  const startNewAnalysis = () => {
    navigate("/camera"); // Adjust the route to the appropriate start page
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="results-page">
      <h2>Recommended Products</h2>
      <div className="dropdown-container">
        <div className="dropdown">
          <button className="dropdown-button">
            Predicted Tone: {selectedTone}
          </button>
          <div className="dropdown-content">
            {tones.map((tone, index) => (
              <div key={index} onClick={() => setSelectedTone(tone)}>
                {tone}
              </div>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropdown-button">
            Predicted Undertone: {selectedUndertone}
          </button>
          <div className="dropdown-content">
            {undertones.map((undertone, index) => (
              <div key={index} onClick={() => setSelectedUndertone(undertone)}>
                {undertone}
              </div>
            ))}
          </div>
        </div>
      </div>
      <table className="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Foundation</th>
            <th>
              <img
                src="https://cdn.shopify.com/s/files/1/0100/9257/6804/files/23_Foundation_Medium_9_Peach_Single_Soldier_OnGrey_Nuvision_CapOn_2000x2000_f6.jpg?v=1695156087"
                alt="Foundation"
              />
            </th>
            <th>Tinted Serum</th>
            <th>
              <img
                src="https://cdn.shopify.com/s/files/1/0100/9257/6804/products/22_SL_PDP_TintedSerum_30ml_Shade_040_open_gray_R1_AP.jpg?v=1695156173"
                alt="Tinted Serum"
              />
            </th>
            <th>Concealer</th>
            <th>
              <img
                src="https://cdn.shopify.com/s/files/1/0100/9257/6804/products/Product-Softlight-Concealer-LX070-Open_1.jpg?v=1695156362"
                alt="Concealer"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.url_model} alt="Model" />
              </td>
              <td>
                <img src={item.foundation_img_url} alt={item.foundation_slug} />
              </td>
              <td>
                <span>{item.recommendedFoundation}</span>
              </td>
              <td>
                <img src={item.serum_img_url} alt={item.serum_slug} />
              </td>
              <td>
                <span>{item.recommendedSerum}</span>
              </td>
              <td>
                <img src={item.concealer_img_url} alt={item.concealer_slug} />
              </td>
              <td>
                <span>{item.recommendedConcealer}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="new-analysis-button" onClick={startNewAnalysis}>
          ← Start New Analysis
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
