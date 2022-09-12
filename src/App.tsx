import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => (
  <Router>
    <Routes>
      <Route path="/react" element={<>app</>} />
    </Routes>
  </Router>
);

export default App;
