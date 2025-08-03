import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import useProjectFormStore from "@/store/projectFromStore";

export default function ProjectForm({ _id, existingData }) {
  const { data: session } = useSession();
  const router = useRouter();
  // llamo a Zustand para acceder a las partes del estado que necesitamos
  const {
    sdg,
    equipo,
    sede,
    notasExtra,
    files, 
    sdgSelected,
    sdgImages,
    checkedState,
    showModal,
    error,
    errorFields,
    setEquipo, 
    setNotasExtra,
    setFiles, 
    setSdgSelected,
    setSdgImages,
    setCheckedState,
    setShowModal,
    setError,
    setSede,
    setErrorFields,
    initializeForm, 
    setSdgListLength, 
  } = useProjectFormStore();

  useEffect(() => {
    if (existingData) {
      initializeForm(existingData);
    }
    // Inicializar checkedState según sdgList.length
    setSdgListLength(sdgList.length);
  }, [existingData, initializeForm, setSdgListLength]);

  // Formula para editar el datepicker
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  // Paises para el buyer country
  const countries = ["Japan", "Singapore", "South Korea", "Switzerland"];

  async function saveProject(e) {
    e.preventDefault();

    try {
      const formData = useProjectFormStore.getState();

      let hasError = false;
      let newErrorFields = {};

      // Validación 
      if (!formData.projectID) {
        hasError = true;
        newErrorFields.projectID = true;
      }
      if (!formData.equipo) {
        hasError = true;
        newErrorFields.equipo = true;
      }
      if (!formData.standar) {
        hasError = true;
        newErrorFields.standar = true;
      }
      if (!formData.vintage) {
        hasError = true;
        newErrorFields.vintage = true;
      }
      if (!formData.volumen) {
        hasError = true;
        newErrorFields.volumen = true;
      }
      if (!formData.tech) {
        hasError = true;
        newErrorFields.tech = true;
      }
      if (!formData.pais) {
        hasError = true;
        newErrorFields.pais = true;
      }
      if (!formData.name) {
        hasError = true;
        newErrorFields.name = true;
      }
      if (!formData.stock) {
        hasError = true;
        newErrorFields.stock = true;
      }
      if (!formData.contrato) {
        hasError = true;
        newErrorFields.contrato = true; 
      }

      if (hasError) {
        setError("Important data are missing"); 
        setErrorFields(newErrorFields); 
        return;
      }

      if (_id) {
        //update
        await axios.put("/api/projects", { ...formData, _id });
      } else {
        //create
        const res = await axios.post("/api/projects", formData);
      }

      setError("");
      setErrorFields({});

      router.back();
    } catch (error) {
      console.log(error);
      setError("An error occurred while saving the project.");
    }
  }

  const handleChangeSdg = (e, position) => {
    const { value, checked } = e.target;
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState); 

    let currentSdgSelected = sdgSelected; 
    if (checked) {
      currentSdgSelected = [...currentSdgSelected, value];
    } else {
      currentSdgSelected = currentSdgSelected.filter(
        (sdgItem) => sdgItem !== value
      );
    }
    setSdgSelected(currentSdgSelected); 
    const selectedSdgImg = [];
    updatedCheckedState.forEach((currentState, index) => {
      if (currentState === true) {
        const images = sdgList[index].img;
        selectedSdgImg.push(images);
      }
    });
    setSdgImages(selectedSdgImg); 
  };


  const showAllSdgHandler = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
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
          onChange={(e) => setEquipo(e.target.value)}
        >
          <option value="">-no selected-</option>
          <option value="Commercial">Commercial</option>
          <option value="TD">TD</option>
        </select>
        <ProjectContractSection
          disablePastDate={disablePastDate}
        />
        {/*  si selecciono equipo TD */}
        {equipo === "TD" && (
          <ProjectTdSection/>
        )}
        {equipo === "Commercial" && <></>}

        <ProjectDetailsSection/>
        <ProjectPricingSection/>
        <ProjectDataSection/>

        <ProjectAdditionalSection
          countries={countries}
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
              onClick={showAllSdgHandler}
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
