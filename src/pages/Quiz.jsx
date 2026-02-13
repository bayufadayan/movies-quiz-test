import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchQuizQuestions } from '../utils/quizApi'
import { saveQuizSession, getQuizSession, clearQuizSession } from '../utils/quizStorage'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import QuizProgress from '../components/QuizProgress'

function Quiz() {
  const navigate = useNavigate()
  
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [loading, setLoading] = useState(true)

  const finishQuiz = useCallback((finalAnswers = answers) => {
    clearQuizSession()
    
    const correctCount = finalAnswers.filter(a => a).length
    const wrongCount = finalAnswers.filter(a => !a).length
    
    navigate('/quiz-result', {
      state: {
        total: questions.length,
        correct: correctCount,
        wrong: wrongCount,
        answered: finalAnswers.length
      }
    })
  }, [answers, navigate, questions.length])

  const initializeQuiz = useCallback(async () => {
    const savedSession = getQuizSession()
    
    if (savedSession) {
      setQuestions(savedSession.questions)
      setCurrentIndex(savedSession.currentIndex)
      setAnswers(savedSession.answers)
      setTimeRemaining(savedSession.timeRemaining)
      setLoading(false)
      return
    }

    const defaultConfig = {
      amount: 10,
      category: '11',
      difficulty: '',
      duration: 600
    }

    try {
      const data = await fetchQuizQuestions(
        defaultConfig.amount,
        defaultConfig.category,
        defaultConfig.difficulty
      )
      
      if (!data || data.length === 0) {
        console.error('No questions received from API')
        alert('Gagal memuat soal quiz. Silakan coba lagi.')
        navigate('/')
        return
      }
      
      setQuestions(data)
      setTimeRemaining(defaultConfig.duration)
      setAnswers([])
      setCurrentIndex(0)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching quiz:', error)
      alert('Terjadi kesalahan saat memuat quiz. Silakan coba lagi.')
      navigate('/')
    }
  }, [navigate])

  function handleAnswer(isCorrect) {
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (currentIndex + 1 >= questions.length) {
      finishQuiz(newAnswers)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  useEffect(() => {
    let mounted = true
    
    async function loadQuiz() {
      if (mounted) {
        await initializeQuiz()
      }
    }
    
    loadQuiz()
    
    return () => {
      mounted = false
    }
  }, [initializeQuiz])

  useEffect(() => {
    if (questions.length === 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          finishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [questions.length, finishQuiz])

  useEffect(() => {
    if (questions.length === 0) return
    
    saveQuizSession({
      questions,
      currentIndex,
      answers,
      timeRemaining
    })
  }, [currentIndex, answers, timeRemaining, questions])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Quiz...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="loading-container">
        <p>No questions available</p>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Timer timeRemaining={timeRemaining} />
        <QuizProgress 
          current={currentIndex + 1}
          total={questions.length}
          answered={answers.length}
        />
      </div>

      <QuestionCard 
        key={currentIndex}
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  )
}

export default Quiz
