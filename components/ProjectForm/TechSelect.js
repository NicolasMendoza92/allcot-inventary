// components/TechSelect.jsx
import React from "react";

const TechSelect = ({ tech, setTech, errorFields }) => {
  const techOptions = [
    { value: "", label: "-no selected-" },
    { value: "ALM", label: "Agricultural land management" },
    { value: "Any transportation project", label: "Any transportation project" },
    { value: "ARR", label: "ARR" },
    { value: "Biomass to Electricity", label: "Biomass to Electricity" },
    { value: "Biomass to heat", label: "Biomass to heat" },
    { value: "Biogas", label: "Biogas" },
    { value: "Cogeneration", label: "Cogeneration" },
    { value: "Combined cycle", label: "Combined cycle" },
    { value: "Cookstove", label: "Cookstove" },
    {
      value: "Energy Efficiency - Agriculture Sector",
      label: "Energy Efficiency - Agriculture Sector",
    },
    {
      value: "Energy Efficiency - Commercial Sector",
      label: "Energy Efficiency - Commercial Sector",
    },
    {
      value: "Energy Efficiency - Domestic",
      label: "Energy Efficiency - Domestic",
    },
    {
      value: "Energy Efficiency - Industrial",
      label: "Energy Efficiency - Industrial",
    },
    {
      value: "Energy Efficiency - Public Sector",
      label: "Energy Efficiency - Public Sector",
    },
    { value: "Gheotermal", label: "Gheotermal" },
    { value: "HFC", label: "HFC" },
    { value: "Hydro", label: "Hydro" },
    { value: "IFM", label: "Improved Forest Managment" },
    { value: "ILM", label: "Improved Land Management" },
    { value: "Landfill gas", label: "Landfill gas" },
    { value: "Landfill to energy", label: "Landfill to energy" },
    { value: "Mangroves", label: "Mangroeves" },
    { value: "Manufacturing industries", label: "Manufacturing industries" },
    { value: "Manure management", label: "Manure management" },
    { value: "Methane Recovery", label: "Methane recovery" },
    {
      value: "Mine Methane Utilization Project",
      label: "Mine Methane Utilization Project",
    },
    { value: "N20 destrutction", label: "N2O Destruction" },
    {
      value: "Non mine Methane Porject",
      label: "Non mine Methane Porject",
    },
    { value: "Oil Management", label: "Oil Management" },
    { value: "Run of river", label: "Run of river" },
    { value: "REDD", label: "REDD" },
    { value: "REDD+", label: "REDD+" },
    { value: "SF6", label: "SF6" },
    {
      value: "Small Renewable energy projects",
      label: "Small Renewable energy projects",
    },
    { value: "Small Hydro", label: "Small Hydro" },
    { value: "Solar", label: "Solar" },
    { value: "Solar Cookstove", label: "Solar Cookstove" },
    { value: "Waste", label: "Waste" },
    { value: "Waste to compost", label: "Waste to compost" },
    { value: "Wind", label: "Wind" },
  ];

  return (
    <>
      <label className="text-gray-400">Tech *</label>
      <select
        className={
          errorFields.tech
            ? "input-error"
            : "border border-gray-200 bg-zinc-100/40"
        }
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      >
        {techOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default TechSelect;