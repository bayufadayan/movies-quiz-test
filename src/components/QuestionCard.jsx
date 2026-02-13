import { decode } from 'he'
import { useState } from 'react'

function shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

function QuestionCard({ question, onAnswer }) {
    const allAnswers = [
        question.correct_answer,
        ...question.incorrect_answers
    ]

    const [answers] = useState(() => shuffleArray(allAnswers))
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    function handleAnswerClick(answer) {
        setSelectedAnswer(answer)
        const isCorrect = answer === question.correct_answer

        setTimeout(() => {
            onAnswer(isCorrect)
        }, 500)
    }

    return (
        <div className="question-card">
            <div className="question-category">
                {decode(question.category)}
            </div>

            <h2 className="question-text">
                {decode(question.question)}
            </h2>

            <div className="question-difficulty">
                Difficulty: <span className={`diff-${question.difficulty}`}>
                    {question.difficulty}
                </span>
            </div>

            <div className="answers-grid">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={selectedAnswer !== null}
                        className={`answer-btn ${selectedAnswer === answer ? 'selected' : ''
                            }`}
                    >
                        {decode(answer)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
