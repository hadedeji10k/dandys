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
  ArcElement
} from "chart.js";
import dayjs from "dayjs";
import * as isLeapYear from "dayjs/plugin/isLeapYear";
import Routings from "./routing";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";


dayjs.extend(isLeapYear) 


ChartJS.register(
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
