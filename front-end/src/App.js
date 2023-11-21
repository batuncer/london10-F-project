import "./App.css";
import Calendar from "./components/calendarStuff/Calendar";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import MainRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <MainRoutes />
      {/* <Calendar /> */}
      <Footer />
    </div>
  );
}

export default App;
