import { Route, Routes } from "react-router-dom";
import { CreateRoom } from "./feature/CreateRoom/components/CreateRoom";
import { EditRoom } from "./feature/ShowRoom/components/EditRoom";
import { ShowRoom } from "./feature/ShowRoom/components/ShowRoom";

export const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<ShowRoom />}></Route>
				<Route path="/:id" element={<EditRoom />}></Route>
				<Route path="/create" element={<CreateRoom />}></Route>
			</Routes>
		</div>
	);
};
