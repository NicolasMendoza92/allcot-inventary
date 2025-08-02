// ProjectDataSection.jsx
import React from "react";
import TechSelect from "./TechSelect";
import CountryPFSelect from "./CountryPFSelect";

const ProjectDataSection = ({
  name,
  setName,
  projectLink,
  setProjectLink,
  tech,
  setTech,
  pais,
  setPais,
  continente,
  setContinente,
  disponible,
  setDisponible,
  methodology,
  setMethodology,
  stock,
  setStock,
  errorFields,
}) => {
  return (
    <>
      <label className="text-gray-400">Project&apos;s Name *</label>
      <input
        type="text"
        className={errorFields.name ? "input-error" : ""}
        placeholder="ej: piedra larga II"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="text-xs text-gray-400">Set to N/A if there is no</span>

      <label className="text-gray-400">Project&apos;s Link</label>
      <input
        type="text"
        placeholder="ej: https://cdm.unfccc.int/Projects/DB/AENOR1343375362.2/view"
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
      />
      <div>
        <label className="text-gray-400">Methodology</label>
        <input
          type="text"
          placeholder="ex:Methane emission "
          value={methodology}
          onChange={(e) => setMethodology(e.target.value)}
        />
      </div>
      <TechSelect tech={tech} setTech={setTech} errorFields={errorFields} />
      {/* Pongo los paises en un componente por que son muchos */}
      <CountryPFSelect
        pais={pais}
        setPais={setPais}
        continente={continente}
        setContinente={setContinente}
        errorFields={errorFields}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 items-center">
        <div className="col-span-2">
          <label className="text-gray-400">Availability</label>
          <input
            type="text"
            placeholder="ex: Spot or november 2024"
            value={disponible}
            onChange={(e) => setDisponible(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <label className="text-gray-400">Stock *</label>
          <select
            className={
              errorFields.stock
                ? "input-error"
                : "border border-gray-200 bg-zinc-100/40"
            }
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <option value="">-no selected-</option>
            <option value="Now">Now</option>
            <option value="Future">Future</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProjectDataSection;
