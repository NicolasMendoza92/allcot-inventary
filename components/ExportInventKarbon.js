import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Spinner from "./Spinner";
import axios from "axios";

const ExportInventKarbon = () => {

  // creo states para guardar todas las operaciones 
  const [allprojects, setAllprojects] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, [])

  function getAllProjects() {
    axios.get('/api/allprojects').then(res => {
      setAllprojects(res.data.projects)
    })
  }

  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    const table_projects = document.getElementById("my-projects-table");

    const workbook = XLSX.utils.table_to_book(table_projects);
    const worksheet = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_to_html(worksheet, "Projects");

    setTimeout(() => {
      XLSX.writeFile(workbook, "InventoryTableKarbon.xlsx");
      setLoading(false);
    }, 1000);
  };


  return (
    <>
      {!loading ? (
        <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 " onClick={handleDownload}>
          Export data
        </button>
      ) : (
        <button disabled>
          <Spinner />
        </button>
      )}
      <div className="hidden">
        <table id="my-projects-table">
          <thead>
            <tr>
              <td>TEAM</td>
              <td>TYPE</td>
              <td>PRE PAYMENT</td>
              <td>STANDARD</td>
              <td>ID</td>
              <td>NAME</td>
              <td>LOCATION</td>
              <td>TECH</td>
              <td>CORSIA</td>
              <td>VINTAGE</td>
              <td>VOLUME</td>
              <td>DELIVERY</td>
              <td>TRADING PRICE</td>
              <td>CORP. PRICE</td>
              <td>KARBONX. PRICE</td>
              <td>CCP</td>
              <td>SDG</td>
              <td>NOTES</td>
              <td>P.TYPE</td>
              <td>AVAILABILITY</td>
              <td>LINK</td>
            </tr>
          </thead>
          <tbody>
            {allprojects.map(pr => (
              <tr key={pr._id}>
                <td>{pr.equipo}</td>
                <td>{pr.contrato}</td>
                <td>{pr.prePayment}</td>
                <td>{pr.standar} {pr.ccb === 'YES' ? (
                  <> CCB </>
                ) : null}</td>
                <td>{pr.projectID}</td>
                <td>{pr.name}</td>
                <td>{pr.pais}</td>
                <td>{pr.tech}</td>
                <td>{pr.corsia}</td>
                <td>{pr.vintage}</td>
                <td>{pr.volumen}</td>
                <td>{pr.disponible}</td>
                <td>{pr.precioVenta}</td>
                <td>{pr.precioCorp}</td>
                <td>{pr.thirdPartPrice}</td>
                <td>{pr.ccp}</td>
                <td>
                  {pr.sdgSelected.map(s => <React.Fragment key={s}>{s}*</React.Fragment>)}
                </td>
                <td>{pr.notasExtra}</td>
                <td>{pr.projectType}</td>
                <td>{pr.stock}</td>
                <td>{pr.projectLink}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExportInventKarbon;