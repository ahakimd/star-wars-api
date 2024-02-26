import React from "react";
import styles from "./App.module.css";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className={styles.app}>
      <SearchInput />
    </div>
  );
}

export default App;
