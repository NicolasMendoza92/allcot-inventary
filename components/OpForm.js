import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import { useSession } from "next-auth/react";
import FileUploaderSection from "./FileUpleaderSection";

export default function OpForm({
  _id,
  transaction: existingTransaction,
  equipo: existingEquipo,
  cliente: existingCliente,
  precio: existingPrecio,
  versusPrice: existingVersusPrice,
  quantity: existingQuantity,
  delivery: existingDelivery,
  deliveryDate: existingDeliveryDate,
  payment: existingPayment,
  paymentDate: existingPaymentDate,
  detalles: existingDetalles,
  projectID: existingProjectID,
  standar: existingStandar,
  vintage: existingVintage,
  volumen: existingVolumen,
  name: existingName,
  pais: existingPais,
  tech: existingTech,
  archivos: existingArchivos,
  relatedProjectID,
}) {
  // VALORES DEL PROYECTO SELECCIONADO CUANDO SE VA A HACER UNA NUEVA OPERACION
  const [projectID, setProjectId] = useState(existingProjectID || "");
  const [standar, setStandar] = useState(existingStandar || "");
  const [vintage, setVintage] = useState(existingVintage || "");
  const [volumen, setVolumen] = useState(existingVolumen || "");
  const [tech, setTech] = useState(existingTech || "");
  const [pais, setPais] = useState(existingPais || "");
  const [name, setName] = useState(existingName || "");

  const { data: session } = useSession();

  // DEFINO ESTADO PARA MANJEAR EL PROYECTO RELACIONADO CUANDO EDITO UNA OPERACION
  const [relatedProjectInfo, setRelatedProjectInfo] = useState("");

  const [allClients, setAllClients] = useState([]);
  // necesito usar useefect para traer los clientes de otro lugar, guardarlas en un estado con useState y poder plasmarlas en el select del project form
  useEffect(() => {
    axios.get("/api/clientes").then((result) => {
      setAllClients(result.data.clients);
    });
  }, []);

  // SI HAY UN PROYECTO RELACIONADO, HAGO USE EFECT Y TRAIGO DE LA BASE DE DATOS LA INFO DE ESE PROYECTO
  useEffect(() => {
    if (!relatedProjectID) {
      return;
    }
    axios.get("/api/projects?id=" + relatedProjectID).then((response) => {
      setRelatedProjectInfo(response.data);
    });
  }, [relatedProjectID]);

  // VALORES VIEJOS DEL FORMULARIO DE OPERACION - CUANDO SE EDITA
  const [transaction, setTransaction] = useState(existingTransaction || "");
  const [equipo, setEquipo] = useState(existingEquipo || "");
  const [cliente, setCliente] = useState(existingCliente || "");
  const [precio, setPrecio] = useState(existingPrecio || "");
  const [versusPrice, setVersusPrice] = useState(existingVersusPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [delivery, setDelivery] = useState(existingDelivery || "");
  const [deliveryDate, setDeliveryDate] = useState(existingDeliveryDate || "");
  const [payment, setPayment] = useState(existingPayment || "");
  const [paymentDate, setPaymentDate] = useState(existingPaymentDate || "");
  const [detalles, setDetalles] = useState(existingDetalles || "");
  const [archivos, setArchivos] = useState(existingArchivos || []);

  // handle errors
  const [error, setError] = useState("");
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);

  const handleTrasnsaction = (e) => {
    const { value } = e.target;
    const transactionType = value;
    if (transactionType === "Sale") {
      setTransaction("Sale");
    } else if (transactionType === "Purchase") {
      setTransaction("Purchase");
    }
  };

  const handleDelivery = (e) => {
    const deliver = e.target.value;
    if (deliver === "Pending") {
      setDelivery(deliver);
    } else {
      setDelivery(deliver);
      setDeliveryDate("");
    }
  };

  const handlePayment = (e) => {
    const pay = e.target.value;
    if (pay === "Pending") {
      setPayment(pay);
    } else {
      setPayment(pay);
      setPaymentDate("");
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

  async function newSale(e) {
    e.preventDefault();
    if (!transaction || !quantity || !cliente || !precio) {
      setError("Important data are missing");
      return;
    }
    // EDITAR OPERACION
    if (relatedProjectID) {
      Swal.fire({
        icon: "warning",
        title: "Watch out",
        text: "If you modified the VOLUME of the operation, you MUST change the inventory to adjust it.",
      });
      try {
        const operation = {
          transaction,
          equipo,
          cliente,
          precio,
          versusPrice,
          quantity,
          delivery,
          deliveryDate,
          payment,
          paymentDate,
          proyecto: relatedProjectID,
          detalles,
          archivos,
        };
        await axios.put("/api/operations", { ...operation, _id });
      } catch (error) {
        console.log(error);
      }
    } else {
      // NEW OPERATION - el_id que trae es el del proyecto y puede editarlo tranquilamente.
      try {
        const newOperation = {
          transaction,
          equipo,
          cliente,
          precio,
          versusPrice,
          quantity,
          delivery,
          deliveryDate,
          payment,
          paymentDate,
          proyecto: _id,
          projectData: {
            idProject: projectID,
            standardOp: standar,
            vintageOp: vintage,
            nameProject: name,
            countryProject: pais,
            techProject: tech,
          },
          detalles,
          archivos,
        };
        if (transaction === "Sale") {
          const total = Number(volumen) - Number(quantity);
          const data = {
            projectID,
            standar,
            vintage,
            pais,
            volumen: total,
            name,
          };
          await axios.put("/api/projects", { ...data, _id });
          await axios.post("/api/operations", newOperation);
        } else if (transaction === "Purchase") {
          const total = Number(volumen) + Number(quantity);
          const data = {
            projectID,
            standar,
            vintage,
            pais,
            volumen: total,
            name,
          };
          await axios.put("/api/projects", { ...data, _id });
          await axios.post("/api/operations", newOperation);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const form = e.target;
    form.reset();
    router.push("/operations");
  }

  return (
    <div>
      {!relatedProjectID && (
        <div className="shadow-lg   bg-zince-300/10 flex flex-col items-start gap-2 m-3">
          <div>
            {" "}
            {standar} {projectID} {name} - {pais}
          </div>
          <div>Vintage: {vintage}</div>
          <div>
            Volume available: <b>{volumen}</b>{" "}
          </div>
        </div>
      )}
      {relatedProjectID && <></>}
      <form onSubmit={newSale}>
        <div className="flex-wrap">
          <label className="text-gray-400">Transaction</label>
          <select
            className="flex border border-gray-200 bg-zinc-100/40"
            value={transaction}
            onChange={(e) => handleTrasnsaction(e)}
          >
            <option value="">-no selected-</option>
            <option value="Sale">Sale</option>
            <option value="Purchase">Purchase</option>
          </select>
        </div>
        <div className="flex-wrap">
          <label className="text-gray-400">Team</label>
          <select
            className="flex border border-gray-200 bg-zinc-100/40"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
          >
            <option value="">-no selected-</option>
            <option value="Trading">Trading</option>
            <option value="Corporate">Corporate</option>
            <option value="Sourcing">Sourcing</option>
            <option value="External">External</option>
          </select>
        </div>
        <div className="flex-wrap">
          <label className="text-gray-400">Client</label>
          <select
            className="flex border border-gray-200 bg-zinc-100/40"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          >
            <option value="">-no selected-</option>
            {allClients.length > 0 &&
              allClients.map((cli) => (
                <option key={cli._id} value={cli.nombreCliente}>
                  {cli.nombreCliente}
                </option>
              ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-2 items-center">
          <div>
            {transaction === "Sale" && (
              <label className="text-gray-400">Sell price (USD)</label>
            )}
            {transaction === "Purchase" && (
              <label className="text-gray-400">Purchase price (USD)</label>
            )}
            <input
              type="number"
              placeholder="ex: 3.20 "
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          {transaction === "Sale" && (
            <div>
              <label className="text-gray-400">Vs price (USD)</label>
              <input
                type="number"
                placeholder="Place here the purchase price, ex: 1.60 "
                value={versusPrice}
                onChange={(e) => setVersusPrice(e.target.value)}
              />
              <span className="text-gray-400 text-xs">
                To calculate the net profit, place here, the price at which this
                project was purchased.
              </span>
            </div>
          )}
        </div>
        <div className="flex-wrap">
          <label className="text-gray-400">Volume</label>
          <input
            type="number"
            placeholder="ej: 4512"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-wrap">
            <label className="text-gray-400">Delivery Status</label>
            <select
              className="flex border border-gray-200 bg-zinc-100/40"
              value={delivery}
              onChange={(e) => handleDelivery(e)}
            >
              <option value="">-no selected-</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            {delivery === "Pending" && (
              <>
                <label className="text-gray-400">Delivery date</label>
                <input
                  type="date"
                  className="flex border border-gray-200 bg-zinc-100/40"
                  value={
                    deliveryDate
                      ? new Date(deliveryDate).toISOString().slice(0, 10)
                      : deliveryDate
                  }
                  min={disablePastDate()}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </>
            )}
            {delivery === "Done" && <></>}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-wrap">
            <label className="text-gray-400">Payment Status</label>
            <select
              className="flex border border-gray-200 bg-zinc-100/40"
              value={payment}
              onChange={(e) => handlePayment(e)}
            >
              <option value="">-no selected-</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            {payment === "Pending" && (
              <>
                <label className="text-gray-400">Payment date</label>
                <input
                  type="date"
                  className="flex border border-gray-200 bg-zinc-100/40"
                  value={
                    paymentDate
                      ? new Date(paymentDate).toISOString().slice(0, 10)
                      : paymentDate
                  }
                  min={disablePastDate()}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </>
            )}
            {payment === "Done" && <></>}
          </div>
        </div>
        <label className="text-gray-400">Notes</label>
        <textarea
          placeholder="ej: creditos de Misha "
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
        />
        <FileUploaderSection
          files={archivos} 
          setFiles={setArchivos} 
          session={session}
        />
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
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
      </form>
    </div>
  );
}
