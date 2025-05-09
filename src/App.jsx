import styled from "styled-components";
import MainPage from "./pages/MainPage";

function App() {
	return (
		<StyledMain>
			<MainPage />
		</StyledMain>
	);
}

const StyledMain = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 8rem;
	width: 100vw;
`;

export default App;
