import React from "react";

const Manifeste = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={handlePrint} style={{ marginBottom: "20px", padding: "10px", background: "#04AA6D", color: "white", border: "none", cursor: "pointer" }}>
        Imprimer
      </button>
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>MANIFESTE</h2>
        <p><strong>Raison Sociale :</strong> Rawaa's Crochet Corner</p>
        <p><strong>Contact :</strong></p>
        <p><strong>Adresse :</strong> Centre Du Mharza à côté la Banque BIAT</p>
        <p><strong>Téléphone :</strong> 51170070</p>
        <p><strong>Code TVA :</strong></p>
        <p><strong>Date :</strong> {new Date().toISOString().split("T")[0]}</p>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th>CODE</th>
              <th>PRIX</th>
              <th>DISPATCH</th>
              <th>GOUVERNERAT</th>
              <th>COORDONNÉES CLIENT</th>
              <th>DESIGNATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>Aucun colis</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Total :</strong> 0 colis</p>
        <p><strong>Total :</strong> 0,000 DT</p>
      </div>
    </div>
  );
};

export default Manifeste;
