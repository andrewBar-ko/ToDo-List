'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    headerBtn = document.querySelector('.header-button'),
    todoList = document.querySelector('.todo-list'),
    textTodo = document.querySelector('.text-todo'),
    todoCompleted = document.querySelector('.todo-completed');

// Массив с получеными данными о планах
const todoData = [];

let jsonToDo = JSON.stringify(todoData);

// Добавление дел на страницу
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        let li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        // Метка о выполнении
        const btnComplete = li.querySelector('.todo-complete');

        // Добавление в выполненые(не выполненые)
        btnComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

    });
};

// LocalStorage
headerBtn.addEventListener('click', function() {
    localStorage.textTodo = headerInput.value;
});


// К форме todoControl навешиваем событие submit
todoControl.addEventListener('submit', function(e) {
    e.preventDefault();  // Отмена перезагрузки страницы

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };

    todoData.push(newTodo);

    render();
});

render();