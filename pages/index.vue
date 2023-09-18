<template>
  <div class="m-4 text-center">
    <!-- Zentrieren und Schriftgröße erhöhen -->
    <h1 class="mb-4 text-2xl font-bold">Meine Todo-Liste</h1>
    <!-- Schriftgröße erhöhen und fett machen -->
    <h2 class="text-lg font-semibold">Todo hinzufügen:</h2>
    <form class="mb-4 flex flex-col items-center">
      <!-- Margin hinzufügen -->
      <label for="subject" class="mb-2"></label> 
        <!-- Eingabefeld anpassen -->
      <input v-model="state.input" id="subject" type="text" name="subject" class="w-full p-2 border rounded-md focus:ring focus:ring-lime-500 focus:outline-none mb-2">
        <!-- Button anpassen -->
      <button class="bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600 transition duration-300 ease-in-out" @click.prevent="addTodo()">Todo hinzufügen</button>
    </form>
    <!-- Überschrift -->
    <h2 class="mt-12 mb-5 text-2xl font-bold text-center text-GREY-700">To-Dos</h2>
    <!-- Array für die Checkliste -->
    <div class="bg-gray-200 p-4 rounded-lg" v-if="state.todos.length >= 1"> 
      <ul v-for="todo in state.todos" :key="todo" class="py-2">
        <!-- Array wird ausgegeben -->
      <li class="flex justify-between">{{ todo }} <img class="inline-block cursor-pointer" src="/icons/deleteIcon.svg" alt="Delete"></li>
    </ul>
    </div>
    <div v-else>
      Es gibt keine Todos
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const state: { [key: string]: any } = reactive({
  input: '',
  todos: []
})

function addTodo(): void {
  state.todos.push(state.input)
}
</script>