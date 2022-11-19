const todoInput = document.querySelector('[data-input]')
const addBtn = document.querySelector('[data-add-btn]')
const todoList = document.querySelector('[data-todo-list]')
const prevBtn = document.querySelector('[data-prev-btn]')
const nextBtn = document.querySelector('[data-next-btn]')
const headerValue = document.querySelector('[data-header-value]')

let mainList = []

let historyIdx = mainList.length - 1

// added feature
const displayHeaderValue = (index = 0) => {
  if (mainList.length) {
    headerValue.textContent = mainList[index].todo
  }
}

prevBtn.addEventListener('click', () => {
  if (historyIdx > 0) {
    historyIdx--
    displayHeaderValue(historyIdx)
  }
})

nextBtn.addEventListener('click', () => {
  if (historyIdx < mainList.length - 1) {
    historyIdx++
    displayHeaderValue(historyIdx)
  }
})

// CRD create - read - delete

//create
const addTodo = (todo = '') => {
  const data = {
    id: new Date().getTime(),
    todo
  }
  mainList.push(data)
  displayTodoList(mainList)

  historyIdx = mainList.length - 1
  displayHeaderValue(historyIdx)

  todoInput.value = ''
  todoInput.focus()
}

//delete
const deleteTodo = (id = -1) => {
  if (id > -1) {
    const filteredList = mainList.filter((item) => {
      return item.id !== id
    })

    mainList = filteredList
    displayTodoList(mainList)
  }
}

// read
const displayTodoList = (list = []) => {
  todoList.innerHTML = ''
  list.forEach((item) => {
    // <li>Test 1<span><button>Delete<button></span></li>
    const li = document.createElement('li')
    li.append(item.todo) // <li>Test 1</li>

    const span = document.createElement('span')
    const button = document.createElement('button')

    button.textContent = 'Delete' //<button>Delete</button>
    button.addEventListener('click', () => {
      deleteTodo(item.id)
    })

    span.appendChild(button) // <span><button>
    li.appendChild(span) // <li><span><button>

    todoList.appendChild(li) //<ul><li><span><button>
  })
}

addBtn.addEventListener('click', () => {
  addTodo(todoInput.value)
})

displayHeaderValue(historyIdx)
displayTodoList(mainList)
