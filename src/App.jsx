import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetails from "./components/MovieDetails";



function App() {
  

  return (
    <Router>
    <div className="flex flex-col min-h-screen">
       <Nav/>

       <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/favorites" element={<FavoritesPage />}></Route>
          <Route path="/movie/:id" element={<MovieDetails />} />
       </Routes>

    <Footer/>
    </div>
    </Router>
  )
}

export default App
