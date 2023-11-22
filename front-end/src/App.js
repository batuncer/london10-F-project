import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <MainRoutes />
      <Footer />
    </div>
  );
}

export default App;
