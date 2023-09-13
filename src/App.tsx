import { Provider } from "urql";

import Genres from "./components/Genres";
import client from "./services/client";

import "./styles/index.css";
import HomePage from "./pages/Home";

const App = () => {
  return (
    <Provider value={client}>
      <HomePage />
    </Provider>
  );
};

export default App;
