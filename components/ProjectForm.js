import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import Swal from "sweetalert2";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";
import { sdgList } from "./SdgOptions";
import SdgSelected from "./SdgSelected";
import CountryPFSelect from "./CountryPFSelect";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProjectForm({
  _id,
  projectID: existingProjectID,
  standar: existingStandar,
  vintage: existingVintage,
  volumen: existingVolumen,
  name: existingName,
  projectLink: existingProjectLink,
  tech: existingTech,
  corsia: existingCorsia,
  sdg: existingSdg,
  pais: existingPais,
  continente: existingContinente,
  disponible: existingDisponible,
  stock: existingStock,
  precioVenta: existingPrecioVenta,
  precioCorp: existingPrecioCorp,
  floorPrice: existingFloorPrice,
  purchasePrice: existingPurchasePrice,
  thirdPartPrice: existingThirdPartPrice,
  contrato: existingContrato,
  mktDate: existingMktDate,
  proveedor: existingProveedor,
  sede: existingSede,
  misha: existingMisha,
  mailingList: existingMailingList,
  brokerList: existingBrokerList,
  equipo: existingEquipo,
  tdService: existingTdService,
  typeOfContract: existingTypeOfContract,
  actualDataVolume: existingActualDataVolume,
  netVolume: existingNetVolume,
  sectorTD: existingSectorTD,
  status: existingStatus,
  stage: existingStage,
  rpStartDate: existingRpStartDate,
  rpEndDate: existingRpEndDate,
  firstCPDate: existingFirstCPDate,
  notas: existingNotas,
  notasExtra: existingNotasExtra,
  ccb: existingCcb,
  ccp: existingCcp,
  projectType: existingProjectType,
  icroa: existingIcroa,
  methodology: existingMethodology,
  registrationDate: existingRegistrationDate,
  buyerCountry: existingBuyerCountry,
  doubleCountingRisk: exisitngDoubleCountingRisk,
  prePayment: existingPrePayment,
  regulatedMarket: existingRegulatedMarket,
  sdgSelected: existingSdgSelected,
  sdgImages: existingSdgImages,
  tdInfo: existingTdInfo,
  files: existingFiles,
}) {
  // creamos los usestate para manejar las variables y los inputs. (los estados pueden tomar el valor, del existente o vacio, en el caso de que toque edit)
  const [projectID, setProjectId] = useState(existingProjectID || "");
  const [standar, setStandar] = useState(existingStandar || "");
  const [vintage, setVintage] = useState(existingVintage || "");
  const [volumen, setVolumen] = useState(existingVolumen || "");
  const [name, setName] = useState(existingName || "");
  const [projectLink, setProjectLink] = useState(existingProjectLink || "");
  const [tech, setTech] = useState(existingTech || "");
  const [corsia, setCorsia] = useState(existingCorsia || "");
  const [sdg, setSdg] = useState(existingSdg || "");
  const [pais, setPais] = useState(existingPais || "");
  const [continente, setContinente] = useState(existingContinente || "");
  const [disponible, setDisponible] = useState(existingDisponible || "");
  const [stock, setStock] = useState(existingStock || "");
  const [precioVenta, setPrecioVenta] = useState(existingPrecioVenta || "");
  const [precioCorp, setPrecioCorp] = useState(existingPrecioCorp || "");
  const [floorPrice, setFloorPrice] = useState(existingFloorPrice || "");
  const [purchasePrice, setPurchasePrice] = useState(
    existingPurchasePrice || ""
  );
  const [thirdPartPrice, setThirdPartPrice] = useState(
    existingThirdPartPrice || ""
  );
  const [contrato, setContrato] = useState(existingContrato || "");
  const [mktDate, setMktDate] = useState(existingMktDate || "");
  const [proveedor, setProveedor] = useState(existingProveedor || "");
  const [mailingList, setMailingList] = useState(existingMailingList || "");
  const [brokerList, setBrokerList] = useState(existingBrokerList || "");
  const [misha, setMisha] = useState(existingMisha || "");
  const [equipo, setEquipo] = useState(existingEquipo || "");
  // CAMPOS DE TD
  const [tdService, setTdService] = useState(existingTdService || "");
  const [typeOfContract, setTypeOfContract] = useState(
    existingTypeOfContract || ""
  );
  const [actualDataVolume, setActualDataVolume] = useState(
    existingActualDataVolume || ""
  );
  const [netVolume, setNetVolume] = useState(existingNetVolume || "");
  const [sectorTD, setSectorTD] = useState(existingSectorTD || "");
  const [status, setStatus] = useState(existingStatus || "");
  const [stage, setStage] = useState(existingStage || "");
  const [rpStartDate, setRpStartDate] = useState(existingRpStartDate || "");
  const [rpEndDate, setRpEndDate] = useState(existingRpEndDate || "");
  const [firstCPDate, setFirstCPDate] = useState(existingFirstCPDate || "");
  const [ccb, setCcb] = useState(existingCcb || "");
  const [ccp, setCcp] = useState(existingCcp || "");
  const [icroa, setIcroa] = useState(existingIcroa || "");
  const [prePayment, setPrePayment] = useState(existingPrePayment || "");
  const [projectType, setProjectType] = useState(existingProjectType || "");
  const [regulatedMarket, setRegulatedMarket] = useState(
    existingRegulatedMarket || ""
  );
  const [methodology, setMethodology] = useState(existingMethodology || "");
  const [registrationDate, setRegistrationDate] = useState(
    existingRegistrationDate || ""
  );
  const [doubleCountingRisk, setDoubleCountingRisk] = useState(
    exisitngDoubleCountingRisk || ""
  );
  const [buyerCountry, setBuyerCountry] = useState(existingBuyerCountry || []);
  const [sede, setSede] = useState(existingSede || "");
  const [notas, setNotas] = useState(existingNotas || "");
  const [notasExtra, setNotasExtra] = useState(existingNotasExtra || "");
  const [files, setFiles] = useState(existingFiles || []);
  const [tdInfo, setTdInfo] = useState(existingTdInfo || "");
  // SDG states to handle
  const [sdgSelected, setSdgSelected] = useState(existingSdgSelected || []);
  const [sdgImages, setSdgImages] = useState(existingSdgImages || []);
  const [checkedState, setCheckedState] = useState(
    new Array(sdgList.length).fill(false)
  );


  const { data: session } = useSession();

  const [isUploading, setIsUploading] = useState(false);

  // Modal y estados para mostrar SDGs
  const [showModal, setShowModal] = useState(false);
  const showAllSdg = (e) => {
    e.preventDefault(e);
    setShowModal((prev) => !prev);
  };

  // handle errors
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState({});
  const router = useRouter();

  async function saveProject(e) {
    e.preventDefault();

    try {
      const data = {
        projectID,
        cretorUser: session?.user?.email,
        standar,
        vintage,
        volumen,
        name,
        projectLink,
        tech,
        corsia,
        sdg,
        sede,
        sdgSelected,
        sdgImages,
        pais,
        continente,
        disponible,
        stock,
        firstCPDate,
        precioVenta,
        precioCorp,
        floorPrice,
        purchasePrice,
        contrato,
        mktDate,
        proveedor,
        equipo,
        tdService,
        typeOfContract,
        actualDataVolume,
        netVolume,
        brokerList,
        status,
        stage,
        rpStartDate,
        rpEndDate,
        mailingList,
        sectorTD,
        ccb,
        ccp,
        projectType,
        misha,
        regulatedMarket,
        notas,
        files,
        notasExtra,
        tdInfo,
        icroa,
        methodology,
        registrationDate,
        buyerCountry,
        doubleCountingRisk,
        prePayment,
        thirdPartPrice,
      };

      let hasError = false;
      let newErrorFields = {};

      // Validación
      if (!projectID) {
        hasError = true;
        newErrorFields.projectID = true;
      }
      if (!equipo) {
        hasError = true;
        newErrorFields.equipo = true;
      }
      if (!standar) {
        hasError = true;
        newErrorFields.standar = true;
      }
      if (!vintage) {
        hasError = true;
        newErrorFields.vintage = true;
      }
      if (!volumen) {
        hasError = true;
        newErrorFields.volumen = true;
      }
      if (!tech) {
        hasError = true;
        newErrorFields.tech = true;
      }
      if (!pais) {
        hasError = true;
        newErrorFields.pais = true;
      }
      if (!name) {
        hasError = true;
        newErrorFields.name = true;
      }
      if (!stock) {
        hasError = true;
        newErrorFields.stock = true;
      }
      if (!contrato) {
        hasError = true;
        newErrorFields.stock = true;
      }

      if (hasError) {
        setError("Important data are missing");
        setErrorFields(newErrorFields);
        return;
      }

      if (_id) {
        //update
        await axios.put("/api/projects", { ...data, _id });
      } else {
        //create
        const res = await axios.post("/api/projects", data);
      }

      // Limpiar errores si la validación es exitosa
      setError("");
      setErrorFields({});

      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  // CONEXION CON API PARA SUBIR IMAGENES
  async function uploadFiles(e) {
    e.preventDefault();
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setFiles((oldFiles) => {
        return [...oldFiles, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  // solo saco la imagen del array images usando filter, y si el valor link es igual al del click, entonces seteo las imagenes, con la nueva lista
  function deleteFile(e, link) {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Quiere borrar este archivo?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, borrar!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      }).then(async (result) => {
        // hacemos console log del result y vemos que opcion es cada una.
        if (result.isConfirmed) {
          const newOnesFiles = files.filter((value) => value !== link);
          setFiles(newOnesFiles);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeSdg = (e, position) => {
    const { value, checked } = e.target;
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    if (checked) {
      setSdgSelected([...sdgSelected, value]);
    } else {
      setSdgSelected(sdgSelected.filter((sdg) => sdg !== value));
    }
    setCheckedState(updatedCheckedState);

    const selectedSdgImg = [];
    updatedCheckedState.map((currentState, index) => {
      if (currentState === true) {
        const images = sdgList[index].img;
        selectedSdgImg.push(images);
      }
    });
    setSdgImages(selectedSdgImg);
  };

  const hanldeSdg = (e) => {
    const ods = e.target.value;
    if (ods === "NO" || ods === "N/A") {
      setSdgImages([]);
      setSdgSelected([]);
      setSdg(ods);
    } else {
      setSdg(ods);
    }
  };

  const hanldeContrato = (e) => {
    const contrato = e.target.value;
    if (contrato === "MKT") {
      setContrato(contrato);
    } else {
      setContrato(contrato);
      setMktDate("");
    }
  };

  const hanldeEquipo = (e) => {
    const equipo = e.target.value;
    if (equipo === "TD") {
      setEquipo(equipo);
    } else {
      setEquipo(equipo);
    }
  };

  const hanldeStatus = (e) => {
    const status = e.target.value;
    if (status === "Ongoing") {
      setStatus(status);
    } else {
      setStatus(status);
    }
  };

  const hanldeTdService = (e) => {
    const tdService = e.target.value;
    if (tdService !== "") {
      setTdInfo("Yes");
      setTdService(tdService);
    } else {
      setTdService(tdService);
      setTdInfo("");
    }
  };

  const hanldeSectorTd = (e) => {
    const sectorTD = e.target.value;
    if (sectorTD !== "") {
      setTdInfo("Yes");
      setSectorTD(sectorTD);
    } else {
      setSectorTD(sectorTD);
      setTdInfo("");
    }
  };

 
  // Formula para seleccionar varios countries
  const countries = ["Japan", "Singapore", "South Korea", "Switzerland"];
  const handleBuyCountrySelectionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBuyerCountry((prev) => [...prev, value]); // Añade el país seleccionado
    } else {
      setBuyerCountry((prev) => prev.filter((country) => country !== value)); // Elimina el país deseleccionado
    }
  };

  // Formula para editar el datepicker
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div>
      <form onSubmit={saveProject} className="grid gap-3 mb-3">
        <label className="text-gray-400">Team *</label>
        <select
          className={
            errorFields.equipo
              ? "input-error"
              : "border border-gray-200 bg-zinc-100/40"
          }
          value={equipo}
          onChange={(e) => hanldeEquipo(e)}
        >
          <option value="">-no selected-</option>
          <option value="Commercial">Commercial</option>
          <option value="TD">TD</option>
        </select>
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
            <div className="flex flex-wrap  w-1/5 ">
              <label className="text-gray-400">Misha</label>
              <select value={misha} onChange={(e) => setMisha(e.target.value)}>
                <option value="">-select-</option>
                <option value="YES">YES</option>
              </select>
            </div>
            <div className="flex flex-wrap w-1/5 ">
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
            <div className="flex flex-wrap w-1/5 ">
              <label className="text-gray-400">Broker</label>
              <select
                value={brokerList}
                onChange={(e) => setBrokerList(e.target.value)}
              >
                <option value="">-select-</option>
                <option value="NO BROKER">NO BROKER</option>
              </select>
            </div>
            <div className="flex flex-wrap w-1/5 ">
              <label className="text-gray-400">PrePayment</label>
              <input
                type="text"
                placeholder="ex: 20%"
                value={prePayment}
                onChange={(e) => setPrePayment(e.target.value)}
              />
            </div>
          </div>

            <div className=" w-full">
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
            errorFields.contrato
              ? "input-error"
              : "border border-gray-200 bg-zinc-100/40"
          }
          value={contrato}
          onChange={(e) => hanldeContrato(e)}
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
              value={
                mktDate ? new Date(mktDate).toISOString().slice(0, 10) : mktDate
              }
              min={disablePastDate()}
              onChange={(e) => setMktDate(e.target.value)}
            />
          </div>
        )}
        {contrato === "Contrato" && <></>}
        {/*  si selecciono equipo TD */}
        {equipo === "TD" && (
          <>
            <label className="text-sm text-green-600 font-bold">TD Filds</label>
            <div className="flex flex-wrap gap-2 border border-green-600 p-2">
              <div>
                <label className="text-gray-400">Sector TD</label>
                <select
                  className="border border-gray-200 bg-zinc-100/40"
                  value={sectorTD}
                  onChange={(e) => hanldeSectorTd(e)}
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
                  onChange={(e) => hanldeTdService(e)}
                >
                  <option value="">-no seleccionado-</option>
                  <option value="CONS">CONS</option>
                  <option value="CPR">CPR</option>
                  <option value="Feasibility">Feasibility</option>
                  <option value="Implementation">Implementation</option>
                  <option value="Implementation + VAL">
                    Implementation + VAL
                  </option>
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
                  <option value="Consultancy + Trading">
                    Consultancy + Trading
                  </option>
                  <option value="Project Development">
                    Project Development
                  </option>
                  <option value="Technical Financial">
                    Technical Financial
                  </option>
                  <option value="Technical Investment">
                    Technical Investment
                  </option>
                  <option value="Trading">Trading</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400">Status</label>
                <select
                  className=" border border-gray-200 bg-zinc-100/40"
                  value={status}
                  onChange={(e) => hanldeStatus(e)}
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
                    <option value="Under implementation">
                      Under implementation
                    </option>
                    <option value="Feasibility Study">Feasibility Study</option>
                  </select>
                </div>
              )}
              {status != "Ongoing" && <></>}
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
        )}
        {equipo === "Commercial" && <></>}

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
          <div>
            <label className="text-gray-400">Methodology</label>
            <input
              type="text"
              placeholder="ex:Methane emission "
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
            />
            {/* <select
              className=" border border-gray-200 bg-zinc-100/40"
              value={ccp}
              onChange={(e) => setCcp(e.target.value)}
            >
              <option value="">-no seleccionado-</option>
              <option value="Eligible">Eligible</option>
              <option value="Approved">Approved</option>
            </select> */}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 ">
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
          <div className="w-auto">
            <label className="text-gray-400">KarbonX Price (USD)</label>
            <input
              type="number"
              placeholder="ej: 3.00"
              value={thirdPartPrice}
              onChange={(e) => setThirdPartPrice(e.target.value)}
            />
          </div>
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
          <option value="">-no selected-</option>
          <option value="ALM">Agricultural land management</option>
          <option value="Any transportation project">
            Any transportation project
          </option>
          <option value="ARR">ARR</option>
          <option value="Biomass to Electricity">Biomass to Electricity</option>
          <option value="Biomass to heat">Biomass to heat</option>
          <option value="Biogas">Biogas</option>
          <option value="Cogeneration">Cogeneration</option>
          <option value="Combined cycle">Combined cycle</option>
          <option value="Cookstove">Cookstove</option>
          <option value="Energy Efficiency - Agriculture Sector">
            Energy Efficiency - Agriculture Sector
          </option>
          <option value="Energy Efficiency - Commercial Sector">
            Energy Efficiency - Commercial Sector
          </option>
          <option value="Energy Efficiency - Domestic">
            Energy Efficiency - Domestic
          </option>
          <option value="Energy Efficiency - Industrial">
            Energy Efficiency - Industrial
          </option>
          <option value="Energy Efficiency - Public Sector">
            Energy Efficiency - Public Sector
          </option>
          <option value="Gheotermal">Gheotermal</option>
          <option value="HFC">HFC</option>
          <option value="Hydro">Hydro</option>
          <option value="IFM">Improved Forest Managment</option>
          <option value="ILM">Improved Land Management</option>
          <option value="Landfill gas">Landfill gas</option>
          <option value="Landfill to energy">Landfill to energy</option>
          <option value="Mangroves">Mangroeves</option>
          <option value="Manufacturing industries">
            Manufacturing industries
          </option>
          <option value="Manure management">Manure management</option>
          <option value="Methane Recovery">Methane recovery</option>
          <option value="Mine Methane Utilization Project">
            Mine Methane Utilization Project
          </option>
          <option value="N20 destrutction">N2O Destruction</option>
          <option value="Non mine Methane Porject">
            Non mine Methane Porject
          </option>
          <option value="Oil Management">Oil Management</option>
          <option value="Run of river">Run of river</option>
          <option value="REDD">REDD</option>
          <option value="REDD+">REDD+</option>
          <option value="SF6">SF6</option>
          <option value="Small Renewable energy projects">
            Small Renewable energy projects
          </option>
          <option value="Small Hydro">Small Hydro</option>
          <option value="Solar">Solar</option>
          <option value="Solar Cookstove">Solar Cookstove</option>
          <option value="Waste">Waste</option>
          <option value="Waste to compost">Waste to compost</option>
          <option value="Wind">Wind</option>
        </select>
        {/* Pongo los paises en un componente por que son muchos */}
        <CountryPFSelect
          pais={pais}
          setPais={setPais}
          continente={continente}
          setContinente={setContinente}
          errorFields={errorFields}
        />
        {/* AÑADO EL SELECT BUYER COUNTRY */}
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

        <SdgSelected sdgImages={sdgImages} />
        {sdg === "YES" && (
          <>
            <span className="nota-imp">
              If you have already selected the SDGs and you want to change or
              add any of them, you must tap the &apos;Clean&apos; option and add
              them again.
            </span>
            <button
              onClick={showAllSdg}
              className="flex flex-wrap align-center w-fit bg-zinc-100/40 text-black px-3 py-1 ms-1 mt-1 rounded  "
            >
              Select which ones {showModal ? <ArrowUp /> : <ArrowDown />}
            </button>
            {showModal ? (
              <>
                <div className="flex flex-wrap">
                  {sdgList.map(({ name, img }, index) => {
                    return (
                      <>
                        <div className="flex items-center gap-2" key={index}>
                          <input
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                            type="checkbox"
                            name={name}
                            value={name}
                            checked={checkedState[index]}
                            onChange={(e) => handleChangeSdg(e, index)}
                          />
                          <label className="ms-2 text-sm font-medium text-gray-800">
                            <Image
                              src={img}
                              alt=""
                              className="flex p-2 h-28 rounded-lg"
                              width={92}
                              height={24}
                            />
                          </label>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : null}
          </>
        )}
        {sdg === "NO" || (sdg === "N/A" && <></>)}
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
        <label className="text-gray-400">Notes</label>
        <textarea
          placeholder="ex: Split 50/50 "
          value={notasExtra}
          onChange={(e) => setNotasExtra(e.target.value)}
        />
          <>
            <label className="text-gray-400">Storage location (SAP)</label>
            <select
              className=" border border-gray-200 bg-zinc-100/40"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
            >
              <option value="">-no selected-</option>
              <option value="ALLCOT AG">ALLCOT AG</option>
              <option value="ALLCOT COLOMBIA">ALLCOT COLOMBIA</option>
              <option value="ALLCOT MEXICO">ALLCOT MEXICO</option>
              <option value="ALLCOT SPAIN">ALLCOT SPAIN</option>
              <option value="ALLCOT CENTRO-AMERICA">
                ALLCOT CENTRO-AMERICA
              </option>
            </select>
          </>
        {session.user.email === "demo@gmail.com" ? (
          <> </>
        ) : (
          <>
            <label className="text-gray-400">Files</label>
            <div className="mb-2 flex flex-wrap gap-1 items-center">
              {!!files?.length &&
                files.map((link) => (
                  <div
                    key={link}
                    className="flex h-20 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                  >
                    <a href={link} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      <span
                        onClick={(e) => deleteFile(e, link)}
                        className="swym-delete-img"
                      >
                        x
                      </span>
                    </a>
                  </div>
                ))}
              {isUploading && (
                <div className="h-24 flex items-center">
                  <Spinner />
                </div>
              )}
              <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 rounded-sm bg-white shadow-sm border text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Upload file</div>
                <input type="file" onChange={uploadFiles} className="hidden" />
              </label>
              {!files?.length && (
                <div className="text-gray-400"> No attached files </div>
              )}
            </div>
          </>
        )}

        {session.user.email === "demo@gmail.com" ? (
          <h1 className="bg-red-300 text-center">
            you are not enabled to save changes{" "}
          </h1>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400"
          >
            Save
          </button>
        )}

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
