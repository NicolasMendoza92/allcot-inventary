import useProjectFormStore from "@/store/projectFromStore";
import React from "react";

const ProjectTdSection = () => {
  const {
    sectorTD,
    setSectorTD, // Usar directamente el setter del store
    tdService,
    setTdService, // Usar directamente el setter del store
    typeOfContract,
    setTypeOfContract,
    status,
    setStatus, // Usar directamente el setter del store
    stage,
    setStage,
    rpStartDate,
    setRpStartDate,
    rpEndDate,
    setRpEndDate,
    actualDataVolume,
    setActualDataVolume,
    netVolume,
    setNetVolume,
  } = useProjectFormStore();

  const hanldeSectorTdInternal = (e) => {
    setSectorTD(e.target.value); 
  };

  const hanldeTdServiceInternal = (e) => {

    setTdService(e.target.value); 
  };

  const hanldeStatusInternal = (e) => {
    // Renombrado
    setStatus(e.target.value); 
  };
  return (
    <>
      <label className="text-sm text-green-600 font-bold">TD Fields</label>
      <div className="flex flex-wrap gap-2 border border-green-600 p-2">
        <div>
          <label className="text-gray-400">Sector TD</label>
          <select
            className="border border-gray-200 bg-zinc-100/40"
            value={sectorTD}
           onChange={hanldeSectorTdInternal}
          >
            <option value="">-no seleccionado-</option>
            <option value="NBS AFRICA">NBS AFRICA</option>
            <option value="NBS LAC">NBS LAC</option>
            <option value="NBS SPAIN">NBS SPAIN</option>
            <option value="PLASTIC">PLASTIC</option>
            <option value="TBS">TBS</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400">Service</label>
          <select
            className="border border-gray-200 bg-zinc-100/40"
            value={tdService}
            onChange={hanldeTdServiceInternal}
          >
            <option value="">-no seleccionado-</option>
            <option value="CONS">CONS</option>
            <option value="CPR">CPR</option>
            <option value="Feasibility">Feasibility</option>
            <option value="Implementation">Implementation</option>
            <option value="Implementation + VAL">Implementation + VAL</option>
            <option value="METHODOLOGY">METHODOLOGY</option>
            <option value="PFA">PFA</option>
            <option value="PRC">PRC</option>
            <option value="VAL">VAL</option>
            <option value="VAL/VER">VAL/VER</option>
            <option value="VER">VER</option>
            <option value="TRAD">TRAD</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400">Type of Contract</label>
          <select
            className="border border-gray-200 bg-zinc-100/40"
            value={typeOfContract}
            onChange={(e) => setTypeOfContract(e.target.value)}
          >
            <option value="">-no seleccionado-</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Consultancy">Consultancy</option>
            <option value="Consultancy and PD">Consultancy and PD</option>
            <option value="Consultancy + Trading">Consultancy + Trading</option>
            <option value="Project Development">Project Development</option>
            <option value="Technical Financial">Technical Financial</option>
            <option value="Technical Investment">Technical Investment</option>
            <option value="Trading">Trading</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400">Status</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={status}
            onChange={hanldeStatusInternal}
          >
            <option value="">-no seleccionado-</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Forecasted">Forecasted</option>
            <option value="On hold">On hold</option>
          </select>
        </div>
        {status === "Ongoing" && (
          <div>
            <label className="text-gray-400">Stage</label>
            <select
              className=" border border-gray-200 bg-zinc-100/40"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="">-no seleccionado-</option>
              <option value="Stage 1 - Elaboration of documentation">
                Stage 1 - Elaboration of documentation
              </option>
              <option value="Stage 2 - Validation/Verification process">
                Stage 2 - Validation/Verification process
              </option>
              <option value="Stage 3 - Standard Assessment">
                Stage 3 - Standard Assessment
              </option>
              <option value="Under implementation">Under implementation</option>
              <option value="Feasibility Study">Feasibility Study</option>
            </select>
          </div>
        )}
        {status !== "Ongoing" && <></>} {/* Cambié "!=" por "!==" */}
        <div>
          <label className="text-gray-400">Reporting Start Period</label>
          <input
            type="date"
            className="flex border border-gray-200 bg-zinc-100/40 w-48"
            value={
              rpStartDate
                ? new Date(rpStartDate).toISOString().slice(0, 10)
                : rpStartDate
            }
            onChange={(e) => setRpStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-400">Reporting End Period</label>
          <input
            type="date"
            className="flex border border-gray-200 bg-zinc-100/40 w-48"
            value={
              rpEndDate
                ? new Date(rpEndDate).toISOString().slice(0, 10)
                : rpEndDate
            }
            onChange={(e) => setRpEndDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-400">Actual Data Vol</label>
          <input
            type="number"
            placeholder="ej: 4512"
            value={actualDataVolume}
            onChange={(e) => setActualDataVolume(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-400">Net Volume</label>
          <input
            type="number"
            placeholder="ej: 4512"
            value={netVolume}
            onChange={(e) => setNetVolume(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectTdSection;
