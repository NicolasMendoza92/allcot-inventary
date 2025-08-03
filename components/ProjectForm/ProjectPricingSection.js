import useProjectFormStore from "@/store/projectFromStore";
import React from "react";

const PricingSection = () => {
  const {
    volumen,
    setVolumen,
    precioVenta,
    setPrecioVenta,
    precioCorp,
    setPrecioCorp,
    floorPrice,
    setFloorPrice,
    purchasePrice,
    setPurchasePrice,
    errorFields,
  } = useProjectFormStore();
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-auto">
        <label className="text-gray-400">Volume *</label>
        <input
          type="number"
          placeholder="ej: 4512"
          value={volumen}
          className={errorFields.volumen ? "input-error" : ""}
          onChange={(e) => setVolumen(e.target.value)}
        />
        <span className="text-xs text-gray-400">
          Set to zero if there is no
        </span>
      </div>
      <div className="w-auto">
        <label className="text-gray-400">Sell Trading Price (USD)</label>
        <input
          type="number"
          placeholder="ej: 1.60"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(e.target.value)}
        />
      </div>
      <div className="w-auto">
        <label className="text-gray-400">Sell Corporate Price (USD)</label>
        <input
          type="number"
          placeholder="ej: 3.60"
          value={precioCorp}
          onChange={(e) => setPrecioCorp(e.target.value)}
        />
      </div>
      <div className="w-auto">
        <label className="text-gray-400">Floor Price (USD)</label>
        <input
          type="number"
          placeholder="ej: 2.00"
          value={floorPrice}
          onChange={(e) => setFloorPrice(e.target.value)}
        />
      </div>
      {/* Si decides incluir KarbonX Price, descomenta y pasa las props */}
      {/* <div className="w-auto">
        <label className="text-gray-400">KarbonX Price (USD)</label>
        <input
          type="number"
          placeholder="ej: 3.00"
          value={thirdPartPrice}
          onChange={(e) => setThirdPartPrice(e.target.value)}
        />
      </div> */}
      <div className="w-auto">
        <label className="text-gray-400">Purchase Price (USD)</label>
        <input
          type="number"
          placeholder="ej: 1.90"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PricingSection;
