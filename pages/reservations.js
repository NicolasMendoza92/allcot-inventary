import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function reservations() {

    const [pageNumber, setPageNumber] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    // esti actualiza la tabla - es la consulta get a las categorias. 
    useEffect(() => {
        fetchReservations();
    }, [])

    function fetchReservations() {
        setIsLoading(true);
        axios.get(`/api/reservations?page=${pageNumber}`).then(result => {
            setReservations(result.data.reservationDoc);
            setNumberOfPages(result.data.totalPages);
            setIsLoading(false);
        });
    }

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };


    return (
        <Layout>
            <div className="relative overflow-x-auto">
                <table className=" basic my-3">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Team</td>
                            <td>Client</td>
                            <td>Project</td>
                            <td>Vintage</td>
                            <td>Volume</td>
                            <td>Price</td>
                            <td>Status</td>
                            <td>Expiration date</td>
                            <td>Comments</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={12}>
                                    <div className="w-full flex justify-center py-4">
                                        <Spinner />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {reservations.map(r => (
                            <tr key={r._id}>
                                <td>{(new Date(r.createdAt)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{r.team}</td>
                                <td>{r.customer}</td>
                                <td>{r.projectRelated?.standar} {r.projectRelated?.projectID} {r.projectRelated?.name}</td>
                                <td> {r.projectRelated?.vintage}</td>
                                <td>{r.quantity}</td>
                                <td>{r.price}</td>
                                <td>{r.status}</td>
                                <td>{(new Date(r.expiration)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{r.comments}</td>
                                <td>
                                    <div className="flex gap-1">
                                        {/* aca le paso el id de la operacion para poder traers los datos */}
                                        <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/reservation/edit/' + r._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex  justify-center py-4 gap-2">
                    <button className="bg-gray-300 text-white p-2" onClick={gotoPrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {pages.map((pageIndex) => (
                        <button className="btn-default" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </button>
                    ))}
                    <button className="bg-gray-300 text-white p-2" onClick={gotoNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-center">Page {pageNumber + 1} of {numberOfPages}</h1>
            </div>
        </Layout>
    )
}