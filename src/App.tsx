import clsx from "clsx";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { CreateRoom } from "./feature/ConferenceRooms/components/CreateRoom";
import { EditRoom } from "./feature/ConferenceRooms/components/EditRoom";
import { ShowRoom } from "./pages/ShowRoom";

export const App = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="min-h-screen">
      <header className="">
        <p className="m-4 text-center font-bold text-xl">会議室予約システム</p>
        {/* <div className="flex justify-end gap-2">
          <button
            type="button"
            className={clsx(
              "rounded-md border px-4 py-2",
              path === "/" && "bg-green-600 text-white",
            )}
          >
            <Link to="/">一覧画面に遷移</Link>
          </button>
          <button
            type="button"
            className={clsx(
              "rounded-md border px-4 py-2",
              path === "/create" && "bg-green-600 text-white",
            )}
          >
            <Link to="/create">作成画面に遷移</Link>
          </button>
        </div> */}
      </header>
      <main className="min-h-screen bg-slate-100">
        <Routes>
          <Route path="/" element={<ShowRoom />}></Route>
          <Route path="/:id" element={<EditRoom />}></Route>
          <Route path="/create" element={<CreateRoom />}></Route>
        </Routes>
      </main>
    </div>
  );
};
