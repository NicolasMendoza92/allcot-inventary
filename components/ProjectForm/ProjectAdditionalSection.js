
import React from "react";

const ProjectAdditionalSection = ({
  countries, 
  buyerCountry,
  handleBuyCountrySelectionChange,
  projectType,
  setProjectType,
  icroa,
  setIcroa,
  firstCPDate,
  setFirstCPDate,
  registrationDate,
  setRegistrationDate,
  doubleCountingRisk,
  setDoubleCountingRisk,
  regulatedMarket,
  setRegulatedMarket,
  sdg,
  hanldeSdg, 
}) => {
  return (
    <>
      <div>
        <label className="text-gray-400">Buyer Country</label>
        <div className="mt-2 space-y-2 grid grid-cols-1 md:flex md:gap-2">
          {countries.map((country) => (
            <div key={country} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={country}
                value={country}
                checked={buyerCountry.includes(country)}
                onChange={handleBuyCountrySelectionChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={country} className="text-gray-700">
                {country}
              </label>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          Selected countries: {buyerCountry.join(", ")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-32">
          <label className="text-gray-400">TYPE</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">-no seleccionado-</option>
            <option value="NBS">NBS</option>
            <option value="TBS">TBS</option>
          </select>
        </div>
        <div className="w-32">
          <label className="text-gray-400">ICROA</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={icroa}
            onChange={(e) => setIcroa(e.target.value)}
          >
            <option value="">-no seleccionado-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400">First CP date</label>
          <input
            type="date"
            className="flex border border-gray-200 bg-zinc-100/40 w-42"
            value={
              firstCPDate
                ? new Date(firstCPDate).toISOString().slice(0, 10)
                : firstCPDate
            }
            onChange={(e) => setFirstCPDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-400">Registration date</label>
          <input
            type="date"
            className="flex border border-gray-200 bg-zinc-100/40 w-42"
            value={
              registrationDate
                ? new Date(registrationDate).toISOString().slice(0, 10)
                : registrationDate
            }
            onChange={(e) => setRegistrationDate(e.target.value)}
          />
        </div>
        <div className="w-32">
          <label className="text-gray-400">D.C. Risk</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={doubleCountingRisk}
            onChange={(e) => setDoubleCountingRisk(e.target.value)}
          >
            <option value="">-no selected-</option>
            <option value="Letter of Intend">Letter of Intend</option>
            <option value="Letter of Approval">Letter of Approval</option>
            <option value="Correspondent Adjustments">
              Correspondent Adjustments
            </option>
          </select>
        </div>
        <div className="w-32">
          <label className="text-gray-400">Regulated MKT</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={regulatedMarket}
            onChange={(e) => setRegulatedMarket(e.target.value)}
          >
            <option value="">-no selected-</option>
            <option value="Colombia">Colombia</option>
            <option value="Chile">Chile</option>
            <option value="Queretaro">Queretaro</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>
        <div className="w-32">
          <label className="text-gray-400">SDG</label>
          <select
            className=" border border-gray-200 bg-zinc-100/40"
            value={sdg}
            onChange={(e) => hanldeSdg(e)}
          >
            <option value="">-no selected-</option>
            <option value="NO">No</option>
            <option value="YES">Yes</option>
            <option value="N/A">Clean</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProjectAdditionalSection;