import React from "react";

const StandardSelect = ({ standar, setStandar, errorFields }) => {
  return (
    <div>
      <label className="text-gray-400">Standard *</label>
      <select
        className={
          errorFields.standar
            ? "input-error"
            : " border border-gray-200 bg-zinc-100/40"
        }
        value={standar}
        onChange={(e) => setStandar(e.target.value)}
      >
        <option value="">-no seleccionado-</option>
        <option value="CDM">CDM</option>
        <option value="VCS">VCS</option>
        <option value="GS">GS</option>
        <option value="CERCARBONO">CERCARBONO</option>
        <option value="I-RECs">I-RECs</option>
        <option value="CAR">CAR</option>
        <option value="CSA">CSA</option>
        <option value="PLAN VIVO">Plan Vivo</option>
        <option value="BioCarbon">BioCarbon</option>
        <option value="COLCX">COLCX</option>
        <option value="A6.4">A6.4</option>
        <option value="A6.2">A6.2</option>
        <option value="N/A">N/A</option>
      </select>
    </div>
  );
};

export default StandardSelect;