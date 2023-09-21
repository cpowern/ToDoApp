
<template>
  <form class="mb-4 flex flex-col items-center">
    <!-- Margin hinzufügen -->
    <label for="subject" class="mb-2"></label>
    <div class="bg-gray-100 py-2 rounded-lg mb-4 w-full mx-8 flex items-center">
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
          class="py-2 rounded-md focus:outline-none mb-2 bg-gray-100"
          placeholder="+ Aufgabe hinzufügen"
          @keypress.prevent.enter="emitAndClearInput()"
        />
        <!-- <input 
          type="date"
          > -->
      </div>
      <div class="px-2">
        <!-- img Input-Leiste -->
        <img class="inline-block cursor-pointer" src="/icons/dateIcon.svg" alt="Date" />
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
    const state = reactive({
        title: ''
    })

const emit = defineEmits(['add-todo'])

function emitAndClearInput() {
  emit("add-todo", state.title)
  state.title = ''
}
</script>
