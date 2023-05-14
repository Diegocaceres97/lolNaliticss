import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './public/Index';
import { DatosProvider } from './shared/contexts/contextChamps';

function App() {
	return (
		<DatosProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Index />}></Route>
				</Routes>
			</Router>
		</DatosProvider>
	);
}

export default App;
