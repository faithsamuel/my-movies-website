import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Movie from "./components/movie";
import Nav from "./components/Nav";



function App() {
  

  return (
    <div>
      
       <Nav/>
       <Hero/>
       <section className="bg-gray-900 text-white py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </div>
    </section>
    <Footer/>
    </div>
  )
}

export default App
