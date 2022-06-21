const inputEl = document.querySelector(".new-task");
const taskList = document.querySelector(".task-list");
const taskLinks = taskList.querySelectorAll(".task-link")

let inputText = ""

            // Функции

// Создание разметки с нужным текстом
function makeTaskMarkup (taskText){
    return `<li class="task-item">
    <svg class="task-indicator" width="20" height="20">
    <use href="./sprite.svg#icon-checkmark"></use>
    </svg>
    <a class="task-link" href="">${taskText}</a>
    </li>`
}

// Отрисовка задачи на странице
function renderTask (markup){
    taskList.insertAdjacentHTML("afterbegin", markup)
}

// Слушатель клика по элементу списка
function itemClickHandle (event){
    event.currentTarget.classList.toggle("checked")
    console.log(event.currentTarget)
}
                // Слушатели

// Получение такста из инпута при нажатии "Enter"
inputEl.addEventListener("keydown", (event)=>{

    if(event.code !== "Enter"){
        return
    }
   
    
    // Отрисовка задачи
    renderTask(makeTaskMarkup(inputEl.value));
    // Сброс поля ввода инпута
    inputEl.value = ''

    // Очищает слушателей
    const taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(item => {
    item.removeEventListener("click", itemClickHandle)
    })
    
   
    // Отменят перезагрузку при клике на ссылку
    const taskLinks = taskList.querySelectorAll(".task-link")
    taskLinks.forEach(item => {
        item.addEventListener("click", (event)=>{
            event.preventDefault();
        })
        
    })

    
    taskItems.forEach(item => {
        item.addEventListener("click", itemClickHandle)
    })
})






// ==========================================================================


