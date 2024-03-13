const todoCount = document.querySelector('#todo-count span');

const todoForm = document.querySelector('#todo-form');
const inputTodo = document.querySelector('#input-todo');

const todoList = document.querySelector('#todo-list');

const deleteTodo = document.querySelector('.delete');

// Todo Count
function updateCount() {
  todoCount.innerText = document.querySelectorAll('.todo:not(.hidden)').length;
}

// Add Todo
function addTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id.toString();
  li.classList.add('todo');
  li.classList.add('active');

  const label = document.createElement('label');

  const input = document.createElement('input');
  input.type = 'checkbox';

  const content = document.createElement('div');
  content.classList.add('todo-content');
  content.innerText = newTodo.content;

  label.appendChild(input);
  label.appendChild(content);

  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', removeTodo);

  li.appendChild(label);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  updateCount();
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  const newTodo = {
    content: inputTodo.value,
    id: Date.now(),
  };

  addTodo(newTodo);
  inputTodo.value = '';
});

// Remove Todo
function removeTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  updateCount(false);
}

// Todo Toggle
todoList.addEventListener('change', e => {
  if (e.target.matches('.todo label input[type="checkbox"]')) {
    const todoItem = e.target.closest('.todo');
    toggleTodoState(todoItem);
  }
});

function toggleTodoState(todoItem) {
  if (todoItem.classList.contains('completed')) {
    todoItem.classList.remove('completed');
    todoItem.classList.add('active');
  } else {
    todoItem.classList.remove('active');
    todoItem.classList.add('completed');
  }
}

// Todo Filter
document.querySelectorAll('#todo-state input').forEach(radio => {
  radio.addEventListener('change', () => {
    const state = radio.id;

    document.querySelectorAll('.todo').forEach(item => {
      item.classList.add('hidden');
    });

    if (state === 'all') {
      document.querySelectorAll('.todo').forEach(item => {
        item.classList.remove('hidden');
      });
      updateCount();
    } else if (state === 'active') {
      document.querySelectorAll('.todo:not(.completed)').forEach(item => {
        item.classList.remove('hidden');
      });
      updateCount();
    } else if (state === 'completed') {
      document.querySelectorAll('.todo.completed').forEach(item => {
        item.classList.remove('hidden');
        updateCount();
      });
      updateCount();
    }
  });
});

// Clear Completed
document.querySelector('#todo-clear').addEventListener('click', () => {
  document.querySelectorAll('.completed').forEach(el => el.remove());
  updateCount();
});
