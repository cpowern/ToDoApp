<template>
  <div id="body" class="text-center bg-gray-600 p-4 w-full h-full">
    <button @click="test()">
      TEST
    </button>
    <div class="py-2 mb-6 w-full mx-8 flex items-center">
      <img class="mx-0 mb-2" src="/icons/taskIcon.svg" alt="task" width="30" />
      <h1 class="mx-6 mb-2 text-3xl text-center font-bold text-lime-500">Meine Todo-Liste</h1>
    </div>
    <AddTaskCard @add-todo="addTodo" />
    <h2
      class="mr-2 mt-4 mb-16 text-2xl font-bold text-center text-lime-500 inline-block"
      placeholder="Schreibe hier deine Notiz..."
    >
      <img src="/icons/coloredFiles.svg" alt="files" class="inline-block" />
      Geplant
    </h2>
    <div
      v-if="todos.length >= 1"
      v-click-away="hideSideBar"
      class="text-2xl bg-gray-600 p-4 rounded-lg text-justify"
    >
      <ul>
        <li v-for="todo in todos.filter((todo) => {
        return todo.todofinished === false
      })"
      :key="todo.title">
          <Sidebar
            v-show="todo.id === state.activeSideBarId"
            :id="todo.id"
            :title="todo.title"
            :date="todo.todoDate"
            :note="todo.note"
            @push-todo="changeTodo"
          />
          <div
            class="flex items-center mb-2 px-4 mb-4 py-2 bg-gray-500 p-4 rounded-lg text-justify font-bold text-lime-500 cursor-pointer"
            @click="state.activeSideBarId = todo.id"
          >
            <img src="/icons/circleIcon.svg" alt="lol" class="mr-5" @click="finishTodo(todo)" />
            {{ todo.title }}
            <img
              class="cursor-pointer ml-auto order-last"
              src="/icons/deleteIcon.svg"
              alt="Delete"
              @click="deleteTodo(todo)"
            />
            <div v-if="todo.todoDate" class="ml-auto">
              {{ printDate(todo.todoDate) }}
            </div>
          </div>
        </li>
      </ul>
      <div></div>
    </div>
    <div v-else>Es gibt keine Todos</div>
    <div class="text-center">
      <h2
        class="mr-2 mt-10 mb-16 text-2xl font-bold text-lime-500 inline-block"
        placeholder="Schreibe hier deine Notiz..."
      >
        <img src="/icons/finishedIcon.svg" alt="files" class="inline-block h-8" />
        Erledigt
      </h2>
    </div>
    <ul
      v-for="todo in todos.filter((todo) => {
        return todo.todofinished === true
      })"
      :key="todo.title"
    >
      <li>
        <div
          class="flex items-center mb-2 px-4 mb-4 py-2 bg-gray-500 p-4 rounded-lg text-justify font-bold text-lime-500 cursor-pointer"
        >
          <img src="/icons/checkedIcon.svg" alt="checked" class="mr-5" />
          <div class="line-through">
            {{ todo.title }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { set } from 'nuxt/dist/app/compat/capi'
import { ToDo } from '../core/todo.type'
import { MongoClient } from 'mongodb'

definePageMeta({
  layout: 'default',
})

/* const deletedTodo = todo.title
console.log('Finsihed todo: ', deletedTodo) */

const todos: ToDo[] = reactive([
  { id: 1, title: 'Beispiel: ', note: '', noteVisible: false, todofinished: false },
])

const state: { [key: string]: any } = reactive({
  input: '',
  noteText: '',
  activeSideBarId: undefined,
  title: '',
  lastId: 1,
})

const deletedTodo = state.title
console.log('Test: ', deletedTodo)

function test() {
  
}

function addTodo(title: string, date: string): void {
  todos.push({
    id: generateID(),
    title,
    note: '',
    noteVisible: false,
    todoDate: date !== '' ? new Date(date) : undefined,
    todofinished: false,
  })
}
function finishTodo(todo: ToDo) {
  const index = todos.findIndex((element) => {
    return element.id === todo.id
  })
  todos[index].todofinished = true
}

function generateID(): number {
  state.lastId += 1
  return state.lastId
}

function deleteTodo(todo: ToDo): void {
  const index = todos.indexOf(todo)
  const deletedTodo = todo.title
  todos.splice(index, 1)
  console.log('deletedTodo: ', deletedTodo)
}

function saveNote(): void {
  const note = prompt
  state.noteText = ''
  console.log('Deine Notiz:', note)
}

onBeforeMount(() => {
  sortDate(todos)
})

onBeforeUpdate(() => {
  sortDate(todos)
})

function sortDate(todos: ToDo[]): void {
  todos.sort((a: ToDo, b: ToDo) => {
    if (a.todoDate === undefined) {
      return 1
    } else if (b.todoDate === undefined) {
      return -1
    } else if (a.todoDate <= b.todoDate) {
      return -1
    } else {
      return 1
    }
  })
}

function changeTodo(title: string, id: number, note: string, date: string) {
  console.log('received emit push todo', title, id, note, date)
  const index = todos.findIndex((todo) => todo.id === id)
  todos[index].title = title
  todos[index].note = note
  const newTodoDate = new Date(date)
  todos[index].todoDate = newTodoDate
}

function hideSideBar(event: any): void {
  state.activeSideBarId = undefined
  console.log('Dings')
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
</style> -->
