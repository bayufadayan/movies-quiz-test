import { Clock } from 'lucide-react'

function Timer({ timeRemaining }) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  
  const isLowTime = timeRemaining <= 60
  
  return (
    <div className={`timer ${isLowTime ? 'timer-warning' : ''}`}>
      <Clock size={20} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}

export default Timer
