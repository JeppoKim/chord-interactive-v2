import { useState, useEffect } from 'react'
import './Intro.css'

function Intro({ onStart }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 페이드인 애니메이션
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className={`intro ${isVisible ? 'visible' : ''}`}>
      <div className="intro-content">
        {/* 로고/타이틀 */}
        <div className="intro-header">
          <h1 className="intro-title">Chord</h1>
          <p className="intro-subtitle">감정을 기억하는 반려 로봇</p>
        </div>

        {/* 중앙 메시지 */}
        <div className="intro-main">
          <div className="floating-shape">
            {/* 간단한 도형 애니메이션 */}
            <div className="shape-inner"></div>
          </div>
          
          <h2 className="intro-question">오늘 어땠어요?</h2>
          <p className="intro-description">
            당신의 감정을 입력하면<br />
            Chord가 기억하고 함께 성장합니다
          </p>
        </div>

        {/* CTA 버튼 */}
        <button className="start-button" onClick={onStart}>
          감정 기록하기
          <span className="button-arrow">→</span>
        </button>

        {/* 하단 안내 */}
        <p className="intro-hint">클릭하여 체험 시작</p>
      </div>

      {/* 배경 그리드 패턴 */}
      <div className="background-grid"></div>
    </div>
  )
}

export default Intro
