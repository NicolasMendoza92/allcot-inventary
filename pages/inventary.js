// import ExportInventKarbon from "@/components/ExportInventKarbon";
import ExportInventKarbon from "@/components/ExportInventKarbon";
import ExportInventary from "@/components/ExportInventary";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import isEnableUser from "@/lib/enableUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { useEffect, useState } from "react";

export default function Projects() {
  const { data: session } = useSession();
  const enable = isEnableUser(session);
  function goToLogin() {
    router.push("/login");
  }

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectFinded, setProjectFinded] = useState([]);

  const [mktVencido, setMktVencido] = useState(false);

  useEffect(() => {
    if (mktVencido) {
      console.log("Algunos proyectos están vencidos");
    }
  }, [mktVencido]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() <= today.getDate() &&
      date.getMonth() <= today.getMonth() &&
      date.getFullYear() <= today.getFullYear()
    );
  };

  useEffect(() => {
    getProjects();
  }, []);

  function getProjects() {
    setIsLoading(true);
    axios.get("/api/projects").then((res) => {
      setProjects(res.data.projectsOk);
      setIsLoading(false);
    });
  }


  // para el filtro
  const { projectSearched, setProjectSearched } =
    useContext(ProjectSearchContext);

  useEffect(() => {
    let searchedProjects = [];
    if (projectSearched.length !== "") {
      searchedProjects = projects.filter((proj) => {
        return (
          proj.name.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.projectID
            .toLowerCase()
            .includes(projectSearched.toLowerCase()) ||
          proj.standar.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.vintage.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.tech.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.disponible
            .toLowerCase()
            .includes(projectSearched.toLowerCase()) ||
          proj.contrato.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.stock.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.projectType
            .toLowerCase()
            .includes(projectSearched.toLowerCase()) ||
          proj.proveedor
            .toLowerCase()
            .includes(projectSearched.toLowerCase()) ||
          proj.ccp.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.equipo.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.pais.toLowerCase().includes(projectSearched.toLowerCase())
        );
      });
      setProjectFinded(searchedProjects);
    }
  }, [projectSearched, projects]);

  if (!session) {
    return (
      <div className="flex justify-center">
        <div className="shadow-md p-3 bg-zinc-300/10 flex items-center gap-2 m-3">
          <h1>You must be logged in to see the inventory</h1>
          <button
            className="bg-green-600 rounded-lg text-white font-bold px-6 py-2"
            onClick={goToLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center m-auto">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-between content-center">
            {enable === false && (
              <div className="flex justify-end">
                <div className="flex justify-start items-center">
                  <input
                    value={projectSearched}
                    className="flex w-96 max-md:w-32"
                    onChange={(e) => setProjectSearched(e.target.value)}
                    placeholder="Look up your project by ID, STD, Name..."
                    autoFocus
                  />
                </div>
                <Link
                  className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200"
                  href={"/searchProjects"}
                >
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
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                    />
                  </svg>
                </Link>
                {session?.user.email === "mdo@karbon-x.com" ? (
                  <ExportInventKarbon />
                ) : (
                  <ExportInventary />
                )}
              </div>
            )}
            {enable === true && (
              <>
                {session?.user?.email !== "mdo@karbon-x.com" ? (
                  <>
                    <Link
                      className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 "
                      href={"/projects/new"}
                    >
                      New project
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                <div className="flex justify-end">
                  <div className="flex justify-start items-center">
                    <input
                      value={projectSearched}
                      className="flex w-96 max-md:w-32"
                      onChange={(e) => setProjectSearched(e.target.value)}
                      placeholder="Look up your project by ID, STD, Name..."
                      autoFocus
                    />
                  </div>
                  <Link
                    className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200"
                    href={"/searchProjects"}
                  >
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
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      />
                    </svg>
                  </Link>
                  {session?.user.email === "mdo@karbon-x.com" ? (
                    <ExportInventKarbon />
                  ) : (
                    <ExportInventary />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="relative overflow-x-auto">
            <table className="basic my-3">
              <thead>
                <tr>
                  <td>Source</td>
                  <td>Type</td>
                  {session?.user.email === "mdo@karbon-x.com" ? (
                    <></>
                  ) : (
                    <td>Supplier</td>
                  )}
                  {session?.user.email === "mdo@karbon-x.com" ? (
                    <td>Pre Payment</td>
                  ) : (
                    <td>Minimun selling price(USD)</td>
                  )}
                  <td>Name</td>
                  <td>Standard</td>
                  <td>ID</td>
                  <td>Vintage</td>
                  <td>Tech</td>
                  <td>Country</td>
                  <td>Corsia</td>
                  <td>Volume</td>
                  <td>Trading Price(USD)</td>
                  <td>Corp. Price(USD)</td>
                  <td>KarbonX. Price(USD)</td>
                  {session?.user.email === "mdo@karbon-x.com" ? (
                    <></>
                  ) : (
                    <td>Purch. Price(USD)</td>
                  )}
                  <td>CCP</td>
                  <td>Availability</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={18}>
                      <div className="w-full flex justify-center py-4">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                )}
                {projectFinded.map((project) => {
                  const mktDate = new Date(project.mktDate);
                  const isVencido =
                    project.contrato === "MKT" && isToday(mktDate);

                  if (isVencido && !mktVencido) {
                    setMktVencido(true); // Activar estado "vencido"
                  }

                  return (
                    <tr key={project._id}>
                      <td className="text-xs">{project.equipo}</td>
                      <td>
                        {project.contrato}
                        {project.contrato === "MKT" ? (
                          <span
                            className={`text-xs ${
                              isVencido ? "text-red-500 font-bold" : ""
                            }`}
                          >
                            - (
                            {mktDate.toLocaleString("GB-English", {
                              dateStyle: "short",
                            })}
                            )
                          </span>
                        ) : null}
                      </td>
                      {session?.user.email === "mdo@karbon-x.com" ? (
                        <></>
                      ) : (
                        <td>{project.proveedor}</td>
                      )}
                      {session?.user.email === "mdo@karbon-x.com" ? (
                        <td>{project.prePayment}</td>
                      ) : (
                        <td>{project.floorPrice}</td>
                      )}
                      <td className="text-xs">{project.name.slice(0, 25)}</td>
                      <td>
                        {project.standar}
                        {project.ccb === "YES" ? (
                          <span className="text-xs"> CCB </span>
                        ) : null}
                        {project.ccp === "Eligible" ||
                        project.ccp === "Approved" ? (
                          <span className="ms-1 border rounded-md bg-gray-300 text-xs">
                            {" "}
                            CCP - {project.ccp}
                          </span>
                        ) : null}
                      </td>
                      <td>{project.projectID}</td>
                      <td>{project.vintage}</td>
                      <td>{project.tech}</td>
                      <td>{project.pais}</td>
                      <td>{project.corsia}</td>
                      <td>{project.volumen}</td>
                      <td>{project.precioVenta}</td>
                      <td>{project.precioCorp}</td>
                      <td>{project.thirdPartPrice}</td>
                      {session?.user.email === "mdo@karbon-x.com" ? (
                        <></>
                      ) : (
                        <td>{project.purchasePrice}</td>
                      )}
                      <td>{project.ccp}</td>
                      <td className="hidden">{project.stock}</td>
                      <td className="hidden">{project.projectType}</td>
                      {/* <td>
                      {project.sdgSelected.map(ods => <React.Fragment key={ods}>{ods}-</React.Fragment>)}
                    </td> */}
                      <td>{project.disponible}</td>
                      {enable === false && <></>}
                      {session?.user.email === "demo@gmail.com" && (
                        <td className="flex py-2">
                          {/* aca le paso el id del proyecto, y por ende va a editar el volumen con ese id */}
                          <Link
                            className="bg-green-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-green-500"
                            href={"/projects/operation/" + project._id}
                          >
                            <div className="group relative w-max">
                              <button>
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
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                              <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                New operation
                              </span>
                            </div>
                          </Link>
                          <Link
                            className="bg-gray-300 text-white px-1  ms-1 rounded shadow-sm hover:bg-gray-200"
                            href={"/projects/edit/" + project._id}
                          >
                            <div className="group relative w-max">
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                Edit
                              </span>
                            </div>
                          </Link>
                        </td>
                      )}
                      {enable === true && (
                        <td className="flex py-2">
                          {/* aca le paso el id del proyecto, y por ende va a editar el volumen con ese id */}
                          <Link
                            className="bg-green-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-green-500"
                            href={"/projects/operation/" + project._id}
                          >
                            <div className="group relative w-max">
                              <button>
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
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                              <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                New operation
                              </span>
                            </div>
                          </Link>
                          {session?.user.email === "mdo@karbon-x.com" ? (
                            <></>
                          ) : (
                            <Link
                              className="bg-gray-300 text-white px-1  ms-1 rounded shadow-sm hover:bg-gray-200"
                              href={"/projects/edit/" + project._id}
                            >
                              <div className="group relative w-max">
                                <button>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </button>
                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                  Edit
                                </span>
                              </div>
                            </Link>
                          )}
                          <Link
                            className="bg-orange-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-orange-500"
                            href={"/projects/reservation/" + project._id}
                          >
                            <div className="group relative w-max">
                              <button>
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
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                  />
                                </svg>
                              </button>
                              <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                Reserve
                              </span>
                            </div>
                          </Link>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}
