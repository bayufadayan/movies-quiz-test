const BASE_URL = 'https://opentdb.com'

export async function fetchQuizQuestions(amount = 10, category = '', difficulty = '') {
    let url = `${BASE_URL}/api.php?amount=${amount}`

    if (category) url += `&category=${category}`
    if (difficulty) url += `&difficulty=${difficulty}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions')
    }

    return data.results
}

export async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/api_category.php`)
    const data = await response.json()
    return data.trivia_categories
}
