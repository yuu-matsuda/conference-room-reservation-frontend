import { Routes, Route } from "react-router-dom";
import { ShowRoom } from "./feature/ShowRoom/components/ShowRoom";
import { CreateRoom } from "./feature/CreateRoom/components/CreateRoom";
import { EditRoom } from "./feature/ShowRoom/components/EditRoom";

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
