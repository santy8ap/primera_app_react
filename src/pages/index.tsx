import { CgAdidas } from "react-icons/cg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notofication } from "../helpears/utilis";
import { MiButton } from "@/componentes/button/Button";



export default function Home() {
  const notificationTime: number = 1000;
  const notoficationTime2: number = 3000;

  const handleSuccess = () => {
    notofication("eso Tilin :) ", notificationTime, "success");
  };

  const handleError = () => {
    notofication("Oh no Tilin :(", notoficationTime2, "error");
  };

  return (
    <div>
      <h1>Inicio</h1>
      <button onClick={handleSuccess}>Mostrar Success</button>
      <br />
      <button onClick={handleError}>Mostrar Error</button>
      <br />
  
      <div className="flex gap-2">
      <MiButton text={"guardar"} icon={"S"}/>
      <MiButton text={"cancelar"} icon={"X"}/>
      <MiButton text={"siguiente"} icon={"Y"}/>
      </div>
      <ToastContainer />
      
    </div>
  );
}
