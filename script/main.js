'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    headerBtn = document.querySelector('.header-button'),
    todo = document.querySelector('.todo'),
    todoList = document.querySelector('.todo-list'),
    textTodo = document.querySelector('.text-todo'),
    todoCompleted = document.querySelector('.todo-completed');

// Массив с получеными данными о планах
let todoData = localStorage.getItem('item') ?
 JSON.parse(localStorage.getItem('item')) : [];

// Добавление дел на страницу
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        let li = document.createElement('li');
        li.classList.add('todo-item');
        
        li.innerHTML += '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        // Метка о выполнении
        const btnComplete = li.querySelector('.todo-complete');

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        // Добавление в выполненые(не выполненые)
        btnComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            localStorage.setItem('item', JSON.stringify(todoData));
            render();
        });

        // Удаление дел
        const btnRemove = li.querySelector('.todo-remove');

        btnRemove.addEventListener('click', function(e) {

            todoData.forEach(function() {
                for (let i = todoData.length; i--;) {
                    if (todoData[i] === item) {
                        todoData.splice(i, 1);
                    }
                }
            });
            
            localStorage.setItem('item', JSON.stringify(todoData));
             
            render();
        });

    });
 
};

// К форме todoControl навешиваем событие submit
todoControl.addEventListener('submit', function(e) {
    e.preventDefault();  // Отмена перезагрузки страницы

    const newTodo = {
        value: headerInput.value,
        completed: false, 
    };
    
    // Проверка на пустоту и добавление в массив
    if(headerInput.value.trim() !== '') {
        todoData.push(newTodo);
    }
    
    localStorage.setItem('item', JSON.stringify(todoData));
    headerInput.value = '';
     
    render();
 
});

render();
