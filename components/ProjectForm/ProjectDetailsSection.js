
import React from "react";
import StandardSelect from "./StandardSelect";


const ProjectDetailsSection = ({
  projectID,
  setProjectId,
  vintage,
  setVintage,
  standar,
  setStandar,
  ccb,
  setCcb,
  corsia,
  setCorsia,
  ccp,
  setCcp,
  errorFields, 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div>
        <label className="text-gray-400">Project ID *</label>
        <input
          type="text"
          placeholder="ej: 6877"
          value={projectID}
          className={errorFields.projectID ? "input-error" : ""}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <span className="text-xs text-gray-400">
          Set to TBA if there is no
        </span>
      </div>
      <div>
        <label className="text-gray-400">Vintage * (year)</label>
        <input
          type="text"
          placeholder="ej: 2022"
          value={vintage}
          className={errorFields.vintage ? "input-error" : ""}
          onChange={(e) => setVintage(e.target.value)}
        />
      </div>
      <StandardSelect 
        standar={standar}
        setStandar={setStandar}
        errorFields={errorFields}
      />
      <div>
        <label className="text-gray-400">CCB</label>
        <select
          className=" border border-gray-200 bg-zinc-100/40"
          value={ccb}
          onChange={(e) => setCcb(e.target.value)}
        >
          <option value="">-no seleccionado-</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label className="text-gray-400">CORSIA</label>
        <select
          className=" border border-gray-200 bg-zinc-100/40"
          value={corsia}
          onChange={(e) => setCorsia(e.target.value)}
        >
          <option value="">-no selected-</option>
          <option value="NO">No</option>
          <option value="YES">Yes</option>
        </select>
      </div>
      <div>
        <label className="text-gray-400">CCP</label>
        <select
          className=" border border-gray-200 bg-zinc-100/40"
          value={ccp}
          onChange={(e) => setCcp(e.target.value)}
        >
          <option value="">-no seleccionado-</option>
          <option value="Eligible">Eligible</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

    </div>
  );
};

export default ProjectDetailsSection;