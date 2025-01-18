// router config

// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './layout';
import { NotFoundPage } from './pages/404';
import { SamplePage } from './pages/sample';
import { DashboardPage } from './pages/dashboard';
// import 'antd/dist/antd.css';

function App() {
	return <Router>
		<Navbar children={
			<Routes>
				<Route path="/" element={<SamplePage text='home' />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		} />
	</Router>
}

export default App
