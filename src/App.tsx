import {useState} from "react";
import {RouterProvider} from "react-router-dom";

import {router} from "@global/router/router.tsx";


function App() {

    const [authed, _] = useState(false);

    const currentRouter = router(authed);

    return <RouterProvider router={currentRouter} />;
}

export default App
