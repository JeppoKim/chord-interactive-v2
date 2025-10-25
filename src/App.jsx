import { useState } from 'react'
import Intro from './components/Intro'
import EmotionInput from './components/EmotionInput'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro') // 'intro', 'input', 'visualization', etc.
  const [emotionData, setEmotionData] = useState(null)

  const handleStartExperience = () => {
    setCurrentScreen('input')
  }

  const handleEmotionSubmit = (data) => {
    setEmotionData(data)
    // 나중에 시각화 화면으로 전환
    console.log('감정 데이터:', data)
  }

  return (
    <div className="app">
      {currentScreen === 'intro' && (
        <Intro onStart={handleStartExperience} />
      )}
      
      {currentScreen === 'input' && (
        <EmotionInput onSubmit={handleEmotionSubmit} />
      )}
    </div>
  )
}

export default App
