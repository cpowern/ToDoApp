<template>
  <div id="body" class="text-center bg-gray-600 p-4 w-full h-full">
    <div class="py-2 mb-6 w-full mx-8 flex items-center">
      <img class="mx-0 mb-2" src="/icons/taskIcon.svg" alt="task" width="30" />
      <h1 class="mx-6 mb-2 text-3xl text-center font-bold text-lime-500">Meine Todo-Liste</h1>
      <button @click="state.authentificated = false" style="width:auto;"
        class="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded ml-auto order-last mr-10">Logout</button>

      <div v-show="!state.authentificated" id="id01" class="modal bg-gray-500" style="display: block;">

        <form class="modal-content animate" method="post">
          <div class="container">
            <label for="uname" class="text-lime-500"><b>Username</b></label>
            <input v-model="state.userName" type="text" placeholder="Enter Username" name="uname" id="usernameInput" class="bg-gray-500"
              required />

            <label for="psw" class="text-lime-500"><b>Password</b></label>
            <input v-model="state.password" type="password" placeholder="Enter Password" name="psw" id="passwordInput" class="bg-gray-500"
              required @keypress.prevent.enter="login()" />

            <button type="button" class="text-white font-bold bg-lime-500 mt-5" id="loginButton"
              @click.prevent="login()">Login</button>
          </div>
          <div class="container">
            <span class="psw">Forgot <a href="#">password?</a></span>
          </div>
          <div id="errorText" style="color: red; display: none;">Function name is incorrect. Please enter 'CPowerN'.</div>
        </form>
      </div>
    </div>
    <AddTaskCard @add-todo="addToDo" />
    <h2 class="mr-2 mt-4 mb-16 text-2xl font-bold text-center text-lime-500 inline-block"
      placeholder="Schreibe hier deine Notiz...">
      <img src="/icons/coloredFiles.svg" alt="files" class="inline-block" />
      Geplant
    </h2>
    <div class="text-2xl bg-gray-600 p-4 rounded-lg text-justify" v-if="state.authentificated && todos && todos.length >= 1" v-click-away="hideSideBar">
      <ul>
        <li v-for="todo in todos.filter((todo: any) => {
          return todo.todofinished === false
        })" :key="todo.id">
          <Sidebar2 v-show="todo.id === state.activeSideBarId" :id="todo.id" :title="todo.title"
            :date="todo.todoDate !== undefined ? formatDate(new Date(todo.todoDate)) : ''" :note="todo.note"
            @push-todo="updateToDo" />
          <div
            class="flex items-center mb-2 px-4 mb-4 py-2 bg-gray-500 p-4 rounded-lg text-justify font-bold text-lime-500 cursor-pointer"
            @click="state.activeSideBarId = todo.id">
            <img src="/icons/circleIcon.svg" alt="lol" class="mr-5" @click="finishToDo(todo)" />
            {{ todo.title }}
            <img class="cursor-pointer ml-auto order-last" src="/icons/deleteIcon.svg" alt="Delete"
              @click="deleteToDo(todo.id)" />
            <div v-if="todo.todoDate" class="ml-auto">
              {{ printDate(new Date(todo.todoDate)) }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="text-center">
      <h2 class="mr-2 mt-10 mb-16 text-2xl font-bold text-lime-500 inline-block"
        placeholder="Schreibe hier deine Notiz...">
        <img src="/icons/finishedIcon.svg" alt="files" class="inline-block h-8" />
        Erledigt
      </h2>
    </div>
    <div v-if="state.authentificated && todos && todos.length >= 1">
      <ul v-for="todo in todos?.filter((todo) => {
      return todo.todofinished === true
    })" :key="todo.id">
      <li>
        <div
          class="flex items-center mb-2 px-4 mb-4 py-2 bg-gray-500 p-4 rounded-lg text-justify font-bold text-lime-500 cursor-pointer">
          <img src="/icons/checkedIcon.svg" alt="checked" class="mr-5" />
          <div class="line-through">
            {{ todo.title }}
          </div>
          <img class="cursor-pointer ml-auto order-last" src="/icons/deleteIcon.svg" alt="Delete"
              @click="deleteToDo(todo.id)" />
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToDo } from '../core/todo.type'

const { data: todos } = await useAsyncData('todos', async (): Promise<ToDo[]> => {
  const todos =  await $fetch('/api/read-todo')
  return sortByDate(todos as ToDo[])
})

definePageMeta({
  layout: 'default',
})

const state: { [key: string]: any } = reactive({
  input: '',
  noteText: '',
  activeSideBarId: undefined,
  title: '',
  userName: '',
  password: '',
  authentificated: ''
})

function generateNewID() { // @ts-ignore
  let ids = []
  const { data: todosArray } = useNuxtData('todos')
  for (const todo of todosArray.value) {
    ids.push(todo.id)
  }
  const max: number = Math.max(...ids);

  const newId = max + 1

  return newId
}

async function addToDo(title: string, date: string) {
  await $fetch('/api/create-todo', {
    method: 'POST',
    body: {
      id: generateNewID(),
      title,
      note: '',
      noteVisible: false,
      todoDate: date !== '' ? new Date(date) : undefined,
      todofinished: false,
    }
  })
  await refreshNuxtData('todos')
}

async function updateToDo(newTitle: string, objectId: number, newNote: string, newDate: string) {
  await $fetch('/api/update-todo', {
    method: 'POST',
    body: {
      id: objectId,
      title: newTitle,
      note: newNote,
      noteVisible: false,
      todoDate: newDate,
      todofinished: false,
    }
  })
  await refreshNuxtData()
}

async function deleteToDo(objectId: number) {
  await $fetch('/api/delete-todo', {
    method: 'POST',
    body: {
      id: objectId,
    }
  })
  await refreshNuxtData()
}

async function finishToDo(todo: ToDo) {
  await $fetch('/api/update-todo', {
    method: 'POST',
    body: {
      id: todo.id,
      title: todo.title,
      note: todo.note,
      noteVisible: false,
      todoDate: todo.todoDate,
      todofinished: true,
    }
  })
  await refreshNuxtData()

}

function hideSideBar(event: any): void {
  state.activeSideBarId = undefined
}

function login() {
  if (state.userName === "CPowerN" && state.password === "123") {
    state.authentificated = true
    state.userName = ''
    state.password = ''

  }
}
</script>
<style>
.hidden {
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s 2s,
    opacity 2s linear;
}

.input-container {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 10px;
}

.sepia-filter {
  filter: sepia(100%) grayscale(100%);
}

.sepia-filter.active {
  filter: sepia(0%) grayscale(0%);
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

/* Set a style for all buttons */
button {
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #4f5a69;
  margin: 5% auto 15% auto;
  /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0)
  }

  to {
    -webkit-transform: scale(1)
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0)
  }

  to {
    transform: scale(1)
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }

  .cancelbtn {
    width: 100%;
  }
}
</style>
