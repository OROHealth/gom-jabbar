import {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AboutView, HomeView} from "views";

import {Spinner} from "@patternfly/react-core";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Spinner/>}>
                            <HomeView/>
                        </Suspense>
                    }
                />
                <Route
                    path="/about"
                    element={<AboutView/>}
                />
            </Routes>
        </Router>
    );
}

export default App;
