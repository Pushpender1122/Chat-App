import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Join from "./component/join";
import Chat from "./component/chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
