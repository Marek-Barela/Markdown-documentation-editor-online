import { useState } from "react";
import { Markdown } from "./Markdown";
import { Sidebar } from "./Sidebar";

const App = () => {
  const [value, setValue] = useState("# Hello, world!");

  return (
    <div className="grid">
      <Sidebar />
      <Markdown value={value} onChange={setValue} />
    </div>
  );
};

export default App;
