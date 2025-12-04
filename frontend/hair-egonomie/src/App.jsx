import { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState("splash");
  const [mode, setMode] = useState(null);

  if (step === "splash") return <SplashScreen next={() => setStep("mode")} />;
  if (step === "mode") return <ModeSelector onSelect={(m) => { setMode(m); setStep("questions"); }} />;
  if (step === "questions") return <QuestionCard mode={mode} />;

  return null;
}

export default App
