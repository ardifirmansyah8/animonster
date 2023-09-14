import { RouterProvider } from "react-router-dom";
import { Provider } from "urql";

import router from "./router";
import client from "./services/client";
import "./styles/index.css";

const App = () => {
  return (
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
