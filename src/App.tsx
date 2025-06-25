import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow md:pl-20">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;