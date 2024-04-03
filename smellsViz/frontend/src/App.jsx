import "./App.css";
import NavBar from "./components/NavBar";
import Visualization from "./pages/Visualization";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Visualization />
      </div>
      <Footer />
    </>
  );
}
