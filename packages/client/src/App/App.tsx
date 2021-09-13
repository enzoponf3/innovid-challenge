import * as React from "react";

import styles from "./App.module.scss";
import Server from "./components/Server";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <Server id={1} />
      <Server id={2} />
      <Server id={3} />
      <Server id={4} />
    </main>
  );
};

export default App;
