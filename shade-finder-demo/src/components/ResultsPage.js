import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/results.css"; // Import the CSS file

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || { data: [] };

  if (!data || data.length === 0) {
    return <div>No data available. Please go back and try again.</div>;
  }

  const startNewAnalysis = () => {
    navigate("/camera"); // Adjust the route to the appropriate start page
  };

  return (
    <div className="results-page">
      <h2>Recommended Products</h2>
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
          {data.recommendations.map((item, index) => (
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
