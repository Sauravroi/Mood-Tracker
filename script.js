const moodButtons = document.querySelectorAll(".mood-btn")
const moodTimeline = document.querySelector(".mood-timeline")
document.addEventListener('DOMContentLoaded', loadMoodFromLocalStorage)
    
moodButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const moodId = event.target.id
        //console.log(mood);
        addMood(moodId)
    })
})

function addMood(moodId){
    const date = new Date().toLocaleString()
    //console.log(date);

    const input = document.getElementById(`${moodId}`)
    console.log(input.textContent)

    const moodElement = createMoodElement(date, input)
    moodTimeline.appendChild(moodElement)
    addMoodToLocalStorage(moodId,input, date)
}

function createMoodElement(date, input){
    const element = document.createElement('li')
    element.innerHTML= `<span>${input.textContent}</span><br><small>${date}</small>`
    return element
}

function addMoodToLocalStorage(moodId,input, date){
    const moodData = JSON.parse(localStorage.getItem(moodId)) || []
    moodData.push({text:input.textContent, date:date})
    localStorage.setItem(moodId, JSON.stringify(moodData))
}

function loadMoodFromLocalStorage(){
    ["happy-btn", "sad-btn", "neutral-btn","excited-btn","fear-btn","angry-btn"].forEach((moodId) => {
        const moodData = JSON.parse(localStorage.getItem(moodId)) || []
        moodData.forEach(({text, date}) => {
            const element = document.createElement('li')
            element.innerHTML = `<span>${text}</span><br><small>${date}</small>`
            moodTimeline.appendChild(element)
        } )
    })
}

