import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./api/context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  BarController,
  LineController
} from "chart.js";
import Routings from "./routing";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <ToastContainer />
          <Routings />
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
