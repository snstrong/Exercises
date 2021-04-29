import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import VendingMachine from "./VendingMachine";
import GlazedPecans from "./GlazedPecans";
import FigBars from "./FigBars";
import KettleChips from "./KettleChips";
import PiratesBooty from "./PiratesBooty";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/glazed-pecans">
          <GlazedPecans />
        </Route>
        <Route exact path="/fig-bars">
          <FigBars />
        </Route>
        <Route exact path="/kettle-chips">
          <KettleChips />
        </Route>
        <Route exact path="/pirates-booty">
          <PiratesBooty />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
