import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./styles.css";

registerSW({ immediate: true });

const raiz = document.getElementById("root");
if (raiz) {
  createRoot(raiz).render(<App />);
}
