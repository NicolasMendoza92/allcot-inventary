import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";
import { sdgList } from "./ProjectForm/SdgOptions";
import SdgSelected from "./ProjectForm/SdgSelected";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProjectDetailsSection from "./ProjectForm/ProjectDetailsSection";
import ProjectPricingSection from "./ProjectForm/ProjectPricingSection";
import ProjectDataSection from "./ProjectForm/ProjectDataSection";
import ProjectAdditionalSection from "./ProjectForm/ProjectAdditionalSection";
import ProjectContractSection from "./ProjectForm/ProjectContractSection";
import FileUploaderSection from "./FileUpleaderSection";
import ProjectTdSection from "./ProjectForm/ProjectTdSection";

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

      setError("");
      setErrorFields({});

      router.back();
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
        <ProjectContractSection
          equipo={equipo}
          proveedor={proveedor}
          setProveedor={setProveedor}
          misha={misha}
          setMisha={setMisha}
          mailingList={mailingList}
          setMailingList={setMailingList}
          brokerList={brokerList}
          setBrokerList={setBrokerList}
          prePayment={prePayment}
          setPrePayment={setPrePayment}
          notas={notas}
          setNotas={setNotas}
          contrato={contrato}
          setContrato={setContrato}
          mktDate={mktDate}
          setMktDate={setMktDate}
          errorFields={errorFields}
          disablePastDate={disablePastDate}
        />
        {/*  si selecciono equipo TD */}
        {equipo === "TD" && (
          <ProjectTdSection
            sectorTD={sectorTD}
            hanldeSectorTd={hanldeSectorTd}
            tdService={tdService}
            hanldeTdService={hanldeTdService}
            typeOfContract={typeOfContract}
            setTypeOfContract={setTypeOfContract}
            status={status}
            hanldeStatus={hanldeStatus}
            stage={stage}
            setStage={setStage}
            rpStartDate={rpStartDate}
            setRpStartDate={setRpStartDate}
            rpEndDate={rpEndDate}
            setRpEndDate={setRpEndDate}
            actualDataVolume={actualDataVolume}
            setActualDataVolume={setActualDataVolume}
            netVolume={netVolume}
            setNetVolume={setNetVolume}
          />
        )}
        {equipo === "Commercial" && <></>}

        <ProjectDetailsSection
          projectID={projectID}
          setProjectId={setProjectId}
          vintage={vintage}
          setVintage={setVintage}
          standar={standar}
          setStandar={setStandar}
          ccb={ccb}
          setCcb={setCcb}
          corsia={corsia}
          setCorsia={setCorsia}
          ccp={ccp}
          setCcp={setCcp}
          errorFields={errorFields}
        />
        <ProjectPricingSection
          volumen={volumen}
          setVolumen={setVolumen}
          precioVenta={precioVenta}
          setPrecioVenta={setPrecioVenta}
          precioCorp={precioCorp}
          setPrecioCorp={setPrecioCorp}
          floorPrice={floorPrice}
          setFloorPrice={setFloorPrice}
          // thirdPartPrice={thirdPartPrice}
          // setThirdPartPrice={setThirdPartPrice}
          purchasePrice={purchasePrice}
          setPurchasePrice={setPurchasePrice}
          errorFields={errorFields}
        />
        <ProjectDataSection
          name={name}
          setName={setName}
          projectLink={projectLink}
          setProjectLink={setProjectLink}
          tech={tech}
          setTech={setTech}
          pais={pais}
          setPais={setPais}
          continente={continente}
          setContinente={setContinente}
          disponible={disponible}
          setDisponible={setDisponible}
          methodology={methodology}
          setMethodology={setMethodology}
          stock={stock}
          setStock={setStock}
          errorFields={errorFields}
        />

        <ProjectAdditionalSection
          countries={countries}
          buyerCountry={buyerCountry}
          handleBuyCountrySelectionChange={handleBuyCountrySelectionChange}
          projectType={projectType}
          setProjectType={setProjectType}
          icroa={icroa}
          setIcroa={setIcroa}
          firstCPDate={firstCPDate}
          setFirstCPDate={setFirstCPDate}
          registrationDate={registrationDate}
          setRegistrationDate={setRegistrationDate}
          doubleCountingRisk={doubleCountingRisk}
          setDoubleCountingRisk={setDoubleCountingRisk}
          regulatedMarket={regulatedMarket}
          setRegulatedMarket={setRegulatedMarket}
          sdg={sdg}
          hanldeSdg={hanldeSdg}
        />
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
            <option value="ALLCOT CENTRO-AMERICA">ALLCOT CENTRO-AMERICA</option>
          </select>
        </>
        <FileUploaderSection
          files={files}
          setFiles={setFiles}
          session={session}
        />

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
