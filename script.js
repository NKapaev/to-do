// Переменные
const addTaskBtn = document.querySelector(".addBtn")
const taskInput = document.querySelector(".new-task")
const taskList = document.querySelector(".task-list")


const storage = []


// Функции

// Создаёт разметку одной задачи
function makeItemMarkup(text){
    return `<li class="task-item">
        <svg class="task-indicator" width="20" height="20">
            <use href="./sprite.svg#icon-checkmark"></use>
        </svg>
    <a class="task-link" href="">${text}</a>
    <button class="deleteTask">
        <svg class="trash-icon" width="20" height="20">
            <use href="./sprite.svg#icon-trash" aria-label="Удалить задачу"></use>
        </svg>
    </button>
    </li>`
}
// Отрисовывает задачу
function renderTask(text){
    const markup = makeItemMarkup(text)
    const taskList = document.querySelector(".task-list")
    taskList.insertAdjacentHTML("afterbegin", markup)
}

function linkClickHandle (event){
    event.preventDefault();
}
// Колбэки слушателей
function addTaskBtnClickHandle (event){
    if(taskInput.value === ""){
        return
    }

    // USE BOTH =========================================
    
    renderTask((taskInput.value).trim())
    const task = {
        name: (taskInput.value).trim(),
        checked: false,
    }

    const taskLinks = document.querySelectorAll(".task-link")
    taskLinks.forEach(item=>{
        item.removeEventListener("click", linkClickHandle)
    })

    storage.push(task);
    localStorage.setItem("tasks", JSON.stringify(storage));
    console.log(storage);

    taskInput.value = '';

    // Отменят перезагрузку страницы при клике по ссылке
    
    taskLinks.forEach(item=>{
        item.addEventListener("click", linkClickHandle)
    })
    // USE BOTH =========================================

    taskInput.focus()
}

function taskInputHandle (event){
    if(event.keyCode !== 13 || taskInput.value === "" ){
        return
    }

    // USE BOTH =========================================
    

    renderTask((taskInput.value).trim())
    const task = {
        name: (taskInput.value).trim(),
        checked: false,
    }
    const taskLinks = document.querySelectorAll(".task-link")
    taskLinks.forEach(item=>{
        item.removeEventListener("click", linkClickHandle)
    })

    storage.push(task);
    localStorage.setItem("tasks", JSON.stringify(storage));
    console.log(storage);

    taskInput.value = '';

    // Отменят перезагрузку страницы при клике по ссылке
    taskLinks.forEach(item=>{
        item.addEventListener("click", linkClickHandle)
    })

    // USE BOTH =========================================
}

// Слушатели

// Клик по кнопке добавитьзадачу
addTaskBtn.addEventListener("click", addTaskBtnClickHandle)
// Нажатие Enter в поле ввода
taskInput.addEventListener("keydown", taskInputHandle)
// Клик по задаче ЧЕК/АНЧЕК
taskList.addEventListener("click", (event)=>{

    if(event.target.nodeName === "UL"){
        return
    }

    if(event.target.nodeName === "A"){
        event.target.parentNode.classList.toggle("checked")

        for(let i = 0; i < storage.length; i += 1){
            if(storage[i].name === (event.target.textContent).trim()){
                if(storage[i].checked === true){
                    storage[i].checked = false;
                } else {
                    storage[i].checked = true;
                }
            }
        }
        localStorage.setItem("tasks", JSON.stringify(storage))
        return
    }

    event.target.classList.toggle("checked")
    
    for(let i = 0; i < storage.length; i += 1){
        if(storage[i].name === (event.target.textContent).trim()){
            if(storage[i].checked === true){
                storage[i].checked = false;
            } else {
                storage[i].checked = true;
            }
        }
    }
    localStorage.setItem("tasks", JSON.stringify(storage))
})

window.addEventListener("load", ()=>{
    storage.push(...JSON.parse(localStorage.getItem("tasks")));

    

    for (const item of storage) {
        renderTask(item.name)
    }
    const taskItems = document.querySelectorAll(".task-item")

    for(let i = 0; i < storage.length; i += 1){
        if(storage[i].checked === true){
            taskItems[taskItems.length - i - 1].classList.add("checked")
        }
    }

    const taskLinks = document.querySelectorAll(".task-link")
    
    taskLinks.forEach(item=>{
        item.addEventListener("click", linkClickHandle)
    })
})

taskList.addEventListener("click", (event)=>{

    
    if(event.target.nodeName !== "BUTTON"){
        return
    }

    for(let i = 0; i < storage.length; i += 1){
        if(storage[i].name === (event.target.parentNode.textContent).trim()){
            console.log("it is");
            storage.splice(i, 1)
        }
    }
    localStorage.setItem("tasks", JSON.stringify(storage))

    

    event.target.parentNode.remove();
})

const btnClear = document.querySelector(".clearBtn")

btnClear.addEventListener("click", (event)=>{
    console.log("clear");
    storage.splice(0)
    localStorage.clear();

    taskList.innerHTML = ""
})