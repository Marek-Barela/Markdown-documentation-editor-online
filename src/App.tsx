import { useState } from "react";
import { Markdown } from "./Markdown";

const App = () => {
  const [value, setValue] = useState("# Hello, world!");

  return (
    <div>
      <Markdown value={value} onChange={setValue} />
    </div>
  );
};

export default App;
