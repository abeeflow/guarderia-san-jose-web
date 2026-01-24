import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Enrollment from './pages/Enrollment';

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light text-[#111118] pt-[81px]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enrollment" element={<Enrollment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
