
<template>
  <form class="mb-4 flex flex-col items-center">
    <!-- Margin hinzufügen -->
    <label for="subject" class="mb-2"></label>
    <div class="bg-gray-500 py-2 rounded-lg mb-4 w-full mx-8 flex items-center focus:ring focus:ring-lime-500 focus:outline-none border border-gray-600 hover:border-lime-500">
      <div class="flex grow justify-start">
        <!-- Eingabefeld anpassen -->
        <img
          src="/icons/addTaskIcon.svg"
          alt="files"
          class="inline-block px-4 cursor-pointer"
          @click.prevent="emitAndClearInput()"
        />
        <input
          id="subject"
          v-model="state.title"
          type="text"
          name="subject"
          class="py-2 rounded-md focus:outline-none mb-2 bg-gray-500 font-bold text-white"
          placeholder="+ Aufgabe hinzufügen"
          @keypress.prevent.enter="emitAndClearInput()"
        />
        <!-- <input 
          type="date"
          > -->
      </div>
      <div class="px-2">
        <!-- img Input-Leiste -->
        <img 
        class="inline-block cursor-pointer" 
        src="/icons/dateIcon.svg" 
        alt="Date" 
        @click="setDate(todo)"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ToDo } from '../core/todo.type'
    const state = reactive({
        title: ''
    })

const emit = defineEmits(['add-todo'])

function emitAndClearInput() {
  emit("add-todo", state.title)
  state.title = ''
}
//NEU
function setDate(todo: ToDo) {
  const todoDate = prompt('Geben sie das Fälligkeitsdatum ein (YYYY-MM-DD): )')
  if (todoDate) {
    todo.todoDate = new Date(todoDate)
  }
/*   sortDate(todos) */
}
//NEU
const todos: ToDo[] = reactive([
  { title: 'Beispiel: ', note: '', buttonClicked: false, noteVisible: false },
])

</script>
