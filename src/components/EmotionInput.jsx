import { useState, useEffect } from 'react'
import './EmotionInput.css'

function EmotionInput({ onSubmit }) {
  const [selectedSituation, setSelectedSituation] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [selectedIntensity, setSelectedIntensity] = useState('')
  const [customSituation, setCustomSituation] = useState('')
  const [customEmotion, setCustomEmotion] = useState('')
  const [showCustomSituation, setShowCustomSituation] = useState(false)
  const [showCustomEmotion, setShowCustomEmotion] = useState(false)

  // 선택지 데이터
  const situations = [
    '혼자 있으면서',
    '친구 만나면서',
    '가족이랑 있으면서',
    '일하면서',
    '공부하면서',
    '쉬면서',
    '밥 먹으면서',
    '음악 들으면서'
  ]

  const emotions = [
    { text: '행복했', vad: { v: 0.8, a: 0.6, d: 0.5 } },
    { text: '우울했', vad: { v: -0.6, a: -0.3, d: -0.4 } },
    { text: '화났', vad: { v: -0.7, a: 0.8, d: 0.6 } },
    { text: '불안했', vad: { v: -0.5, a: 0.7, d: -0.6 } },
    { text: '외로웠', vad: { v: -0.4, a: -0.2, d: -0.5 } },
    { text: '뿌듯했', vad: { v: 0.7, a: 0.4, d: 0.7 } },
    { text: '설렜', vad: { v: 0.6, a: 0.8, d: 0.3 } },
    { text: '짜증났', vad: { v: -0.5, a: 0.5, d: 0.3 } },
    { text: '피곤했', vad: { v: -0.3, a: -0.7, d: -0.2 } },
    { text: '후련했', vad: { v: 0.5, a: -0.2, d: 0.4 } },
    { text: '기뻤', vad: { v: 0.7, a: 0.5, d: 0.4 } },
    { text: '슬펐', vad: { v: -0.7, a: -0.4, d: -0.3 } }
  ]

  const intensities = [
    { text: '살짝', multiplier: 0.3 },
    { text: '좀', multiplier: 0.5 },
    { text: '되게', multiplier: 0.8 },
    { text: '엄청', multiplier: 1.0 },
    { text: '진짜', multiplier: 1.2 },
    { text: '미치도록', multiplier: 1.5 }
  ]

  // 문장 생성
  const generateSentence = () => {
    const sit = customSituation || selectedSituation
    const emo = customEmotion || selectedEmotion
    const int = selectedIntensity

    if (!sit && !emo) return '____하면서 ____어'
    if (!sit) return `____하면서 ${int ? int + ' ' : ''}${emo}어`
    if (!emo) return `${sit} ____어`
    
    return `${sit} ${int ? int + ' ' : ''}${emo}어`
  }

  // 완성 여부 체크
  const isComplete = () => {
    return (customSituation || selectedSituation) && (customEmotion || selectedEmotion)
  }

  // 제출 핸들러
  const handleSubmit = () => {
    if (!isComplete()) return

    const situation = customSituation || selectedSituation
    const emotionText = customEmotion || selectedEmotion
    const intensity = selectedIntensity || '보통'
    
    // VAD 값 계산
    const emotionObj = emotions.find(e => e.text === emotionText)
    const intensityObj = intensities.find(i => i.text === intensity)
    
    let vad = emotionObj ? { ...emotionObj.vad } : { v: 0, a: 0, d: 0 }
    
    if (intensityObj) {
      vad.v *= intensityObj.multiplier
      vad.a *= intensityObj.multiplier
      vad.d *= intensityObj.multiplier
    }

    const data = {
      sentence: generateSentence(),
      situation,
      emotion: emotionText,
      intensity,
      vad
    }

    onSubmit(data)
  }

  return (
    <div className="emotion-input">
      <div className="emotion-input-container">
        {/* 헤더 */}
        <div className="emotion-header">
          <h1 className="emotion-title">Chord</h1>
          <p className="emotion-subtitle">오늘 어땠어요?</p>
        </div>

        {/* 실시간 문장 미리보기 */}
        <div className="sentence-preview">
          <div className={`sentence-text ${isComplete() ? 'complete' : ''}`}>
            {generateSentence()}
          </div>
        </div>

        {/* 선택 영역 */}
        <div className="selection-area">
          {/* ① 뭐 하면서? */}
          <div className="selection-group">
            <label className="selection-label">① 뭐 하면서?</label>
            <div className="tags-container">
              {situations.map((sit) => (
                <button
                  key={sit}
                  className={`tag ${selectedSituation === sit ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedSituation(sit)
                    setCustomSituation('')
                    setShowCustomSituation(false)
                  }}
                >
                  {sit}
                </button>
              ))}
              <button
                className={`tag custom-tag ${showCustomSituation ? 'selected' : ''}`}
                onClick={() => setShowCustomSituation(!showCustomSituation)}
              >
                + 직접 쓰기
              </button>
            </div>
            {showCustomSituation && (
              <input
                type="text"
                className="custom-input"
                placeholder="직접 입력... (예: 산책하면서)"
                value={customSituation}
                onChange={(e) => {
                  setCustomSituation(e.target.value)
                  setSelectedSituation('')
                }}
              />
            )}
          </div>

          {/* ② 어떤 기분? */}
          <div className="selection-group">
            <label className="selection-label">② 어떤 기분이었어?</label>
            <div className="tags-container">
              {emotions.map((emo) => (
                <button
                  key={emo.text}
                  className={`tag ${selectedEmotion === emo.text ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedEmotion(emo.text)
                    setCustomEmotion('')
                    setShowCustomEmotion(false)
                  }}
                >
                  {emo.text}
                </button>
              ))}
              <button
                className={`tag custom-tag ${showCustomEmotion ? 'selected' : ''}`}
                onClick={() => setShowCustomEmotion(!showCustomEmotion)}
              >
                + 직접 쓰기
              </button>
            </div>
            {showCustomEmotion && (
              <input
                type="text"
                className="custom-input"
                placeholder="직접 입력... (예: 울컥함)"
                value={customEmotion}
                onChange={(e) => {
                  setCustomEmotion(e.target.value)
                  setSelectedEmotion('')
                }}
              />
            )}
          </div>

          {/* ③ 강도 조절 (선택) */}
          <div className="selection-group optional">
            <label className="selection-label">
              ③ 얼마나 강하게? <span className="optional-label">(선택)</span>
            </label>
            <div className="tags-container">
              {intensities.map((int) => (
                <button
                  key={int.text}
                  className={`tag intensity-tag ${selectedIntensity === int.text ? 'selected' : ''}`}
                  onClick={() => setSelectedIntensity(selectedIntensity === int.text ? '' : int.text)}
                >
                  {int.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          className={`submit-button ${isComplete() ? 'active' : 'disabled'}`}
          onClick={handleSubmit}
          disabled={!isComplete()}
        >
          기록하기 →
        </button>

        <p className="input-hint">
          {isComplete() 
            ? '완성! 클릭하여 감정을 기록하세요' 
            : '상황과 기분을 선택해주세요'}
        </p>
      </div>
    </div>
  )
}

export default EmotionInput
