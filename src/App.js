import React from "react";
import "./styles.css";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <>
      {/* Accepts prop theme that take two values dark and light. Defaults to dark theme */}
      <Calendar />
    </>
  );
}
