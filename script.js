const onDomContentLoaded = () => {
  window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []
    const nameInput = document.querySelector('.name')
    const newTodoForm = document.querySelector('.todo__create-form')

    const userName = localStorage.getItem('userName') || ''

    nameInput.value = userName

    nameInput.addEventListener('change', (e) => {
      localStorage.setItem('userName', e.target.value)
    })

    newTodoForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        creatdAt: new Date().getTime(),
      }

      todos.push(todo)
      localStorage.setItem('todos', JSON.stringify(todos))

      e.target.reset()

      createTodos()
    })
    createTodos()
  })

  function createTodos() {
    const todoList = document.querySelector('#todo-list')
    todoList.innerHTML = ''

    todos.forEach((todo) => {
      const todoItem = document.createElement('div')
      todoItem.classList.add('todo-item')

      const label = document.createElement('label')
      const input = document.createElement('input')
      const span = document.createElement('span')
      const content = document.createElement('div')
      const actions = document.createElement('div')
      const edit = document.createElement('button')
      const deleteButton = document.createElement('button')

      input.type = 'checkbox'
      input.checked = todo.done
      span.classList.add('circle')
      if (todo.category == 'personal') {
        span.classList.add('personal')
      } else {
        span.classList.add('business')
      }
      content.classList.add('todo-content')
      actions.classList.add('actions')
      edit.classList.add('edit')
      deleteButton.classList.add('delete')

      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
      edit.innerHTML = 'Edit'
      deleteButton.innerHTML = 'Delete'

      label.appendChild(input)
      label.appendChild(span)
      actions.appendChild(edit)
      actions.appendChild(deleteButton)
      todoItem.appendChild(label)
      todoItem.appendChild(content)
      todoItem.appendChild(actions)

      todoList.appendChild(todoItem)

      if (todo.done) {
        todoItem.classList.add('done')
      }

      input.addEventListener('change', (e) => {
        todo.done = e.target.checked
        localStorage.setItem('todos', JSON.stringify(todos))

        if (todo.done) {
          todoItem.classList.add('done')
        } else {
          todoItem.classList.remove('done')
        }

        createTodos()
      })

      edit.addEventListener('click', (e) => {
        const input = content.querySelector('input')
        input.removeAttribute('readonly')
        input.focus()
        input.addEventListener('blur', (e) => {
          input.setAttribute('readonly', true)
          todo.content = e.target.value
          localStorage.setItem('todos', JSON.stringify(todos))
          createTodos()
        })
      })

      deleteButton.addEventListener('click', (e) => {
        todos = todos.filter((t) => t != todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        createTodos()
      })
    })
  }

  const radioButtonPersonal = document.querySelector(
    '.form__check-category-personal'
  )
  const radioButtonBusiness = document.querySelector(
    '.form__check-category-business'
  )

  const businessButtonClicked = () => {
    radioButtonBusiness.classList.add('businessActive')
    radioButtonPersonal.classList.remove('personalActive')
  }
  radioButtonBusiness.addEventListener('click', businessButtonClicked)

  const personalButtonClicked = () => {
    radioButtonPersonal.classList.add('personalActive')
    radioButtonBusiness.classList.remove('businessActive')
  }
  radioButtonPersonal.addEventListener('click', personalButtonClicked)
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded)
