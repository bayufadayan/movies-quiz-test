function QuizProgress({ current, total, answered }) {
  const progress = (current / total) * 100
  
  return (
    <div className="quiz-progress">
      <div className="progress-info">
        <span>Soal {current} dari {total}</span>
        <span>Terjawab: {answered}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default QuizProgress
