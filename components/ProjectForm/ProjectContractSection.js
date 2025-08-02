export default function ProjectContractSection({
  equipo,
  proveedor,
  setProveedor,
  misha,
  setMisha,
  mailingList,
  setMailingList,
  brokerList,
  setBrokerList,
  prePayment,
  setPrePayment,
  notas,
  setNotas,
  contrato,
  setContrato,
  mktDate,
  setMktDate,
  errorFields,
  disablePastDate,
}) {
  const hanldeContrato = (e) => {
    const val = e.target.value;
    setContrato(val);
    if (val !== "MKT") setMktDate("");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 items-start">
        <div className="flex flex-wrap w-full gap-2">
          <label className="text-gray-400">
            {equipo === "TD" ? "Financial Partner" : "Supplier"}
          </label>
          <input
            type="text"
            className="flex flex-wrap "
            placeholder="Ej: ALLCOT - Misha"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
          />
          <div className="flex flex-wrap w-1/5">
            <label className="text-gray-400">Misha</label>
            <select value={misha} onChange={(e) => setMisha(e.target.value)}>
              <option value="">-select-</option>
              <option value="YES">YES</option>
            </select>
          </div>
          <div className="flex flex-wrap w-1/5">
            <label className="text-gray-400">Mailing</label>
            <select
              value={mailingList}
              onChange={(e) => setMailingList(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="SEND">SEND</option>
              <option value="NOT SEND">NOT SEND</option>
            </select>
          </div>
          <div className="flex flex-wrap w-1/5">
            <label className="text-gray-400">Broker</label>
            <select
              value={brokerList}
              onChange={(e) => setBrokerList(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="NO BROKER">NO BROKER</option>
            </select>
          </div>
          <div className="flex flex-wrap w-1/5">
            <label className="text-gray-400">PrePayment</label>
            <input
              type="text"
              placeholder="ex: 20%"
              value={prePayment}
              onChange={(e) => setPrePayment(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="text-gray-400">Internal Notes</label>
          <textarea
            placeholder="ex:Some info about prices "
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            maxLength={1200}
          />
        </div>
      </div>

      <label className="text-gray-400">Contract Type</label>
      <select
        className={
          errorFields?.contrato
            ? "input-error"
            : "border border-gray-200 bg-zinc-100/40"
        }
        value={contrato}
        onChange={hanldeContrato}
      >
        <option value="">-no selected-</option>
        <option value="MKT">MKT Agreement</option>
        <option value="Contrato">Contract</option>
        <option value="Contract.3">Contract.3</option>
        <option value="Indicative">Indicative</option>
      </select>

      {contrato === "MKT" && (
        <div className="flex gap-2">
          <label className="text-gray-400">Expiration date</label>
          <input
            type="date"
            className="flex border border-gray-200 bg-zinc-100/40 w-48"
            value={mktDate ? new Date(mktDate).toISOString().slice(0, 10) : ""}
            min={disablePastDate()}
            onChange={(e) => setMktDate(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
