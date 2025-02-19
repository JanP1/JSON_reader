import "./App.css";
import JsonDisplayBox from "./ReactComponents/JsonDisplayBox";

function App() {  

  return (
    <div className="page-grid">
      <div className="page-title"> Json Loading In Chunks</div>
      <div className="container">
        <JsonDisplayBox/>
      </div>
    </div>
  );
}

export default App;
