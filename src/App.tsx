import { Routes, Route } from "react-router-dom";
import { ShowRoom } from "./feature/ShowRoom/components/ShowRoom";
import { CreateRoom } from "./feature/CreateRoom/components/CreateRoom";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowRoom />}></Route>
        <Route path="/create" element={<CreateRoom />}></Route>
      </Routes>
    </div>
  );
};
