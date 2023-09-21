<template class="bg-danger">
  <div class="m-4 text-center">
    <div class="py-2 mb-6 w-full mx-8 flex items-center">
      <img class="mx-0 mb-2" src="/icons/taskIcon.svg" alt="task" width="30" />
      <!-- Zentrieren und Schriftgröße erhöhen -->
      <h1 class="mx-6 mb-2 text-3xl text-center font-bold text-lime-500">Meine Todo-Liste</h1>
      <!-- Schriftgröße erhöhen und fett machen -->
    </div>
    <!-- AddTaskCard dings -->
    <AddTaskCard @add-todo="addTodo"/>
    <!-- Überschrift -->
    <h2
      class="mr-2 mt-4 mb-16 text-2xl font-bold text-center text-GREY-700 inline-block"
      placeholder="Schreibe hier deine Notiz..."
    >
      <img src="/icons/filesIcon.svg" alt="files" class="inline-block" />
      Geplant
    </h2>
    <!-- Array für die Checkliste -->
    <div v-if="todos.length >= 1" class="text-2xl bg-gray-100 p-4 rounded-lg">
      <ul v-for="todo in todos" :key="todo.title" class="mb-4 py-2">
        <!-- Array wird ausgegeben -->
        <li class="flex justify-between mb-5 px-5">
          {{ todo.title }}
          <img
            class="mr-12 inline-block cursor-pointer"
            src="/icons/dateIcon.svg"
            alt="Date"
            @click.prevent="setDate(todo)"
          />

          <img
            class="inline-block cursor-pointer"
            src="/icons/deleteIcon.svg"
            alt="Delete"
            @click.prevent="deleteTodo(todo)"
          />
        </li>
        <textarea
          id="demo"
          v-model="todo.note"
          placeholder="Schreibe hier deine Notiz..."
          class="p-2 border rounded-md focus:ring focus:ring-lime-500 focus:outline-none mb-2"
          style="width: 100%"
        ></textarea>
        <!--         <img src="/icons/repeatIcon.svg" alt="repeat" class="cursor-pointer" /> -->
        <button
          v-if="!todo.buttonClicked && !todo.noteVisible"
          class="bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600 transition duration-300 ease-in-out"
          type="button"
          @click="showNoteInput(todo)"
        >
          Notiz speichern
        </button>
        <div v-if="todo.todoDate">
          <!--Bei mir kam das herraus: Fällig am: Thu Sep 21 2023 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)-->
          <!--Chatgpt hat mir gesagt wenn ich: toLocaleDateString noch hinzufüge, verschwindet das!-->
          Fällig am: {{ todo.todoDate.toLocaleDateString() }}
        </div>
      </ul>
    </div>
    <div v-else>Es gibt keine Todos</div>
  </div>
</template>

<script setup lang="ts">
// Importiert den Type "ToDo" (todo.type.ts)
import { ToDo } from '../core/todo.type'

// Das layout wird auf default definiert, warum auch immer.
definePageMeta({
  layout: 'default',
})
// Erstellung des "const" Arrays der einen Objekt(ToDo) enthählt.
const todos: ToDo[] = reactive([
  // Idee ein Beispiel zu erstellen (mit ChatGPT)
  { title: 'Beispiel: ', note: '', buttonClicked: false, noteVisible: false },
])

const state = reactive({
  input: '',
  noteText: '',
})
// Es wird eine Funktion addTodo erstellt die keine Argumente erwartet "()" und kein Rückgabewert gibt "void"
function addTodo(title: string): void {
  // Ein neues Objekt wird erstellt, der einen title trägt. Eigenschaften wie Note, buttonClicked und noteVisible werden initalisert.
  todos.push({ title, note: '', buttonClicked: false, noteVisible: false })
}
// Funktion, löscht erledigte Aufgaben. (todo: ToDo) Das hiesst das todo, den Typ ToDo hat
function deleteTodo(todo: ToDo): void {
  // indexOf sucht im Array todos nach der Aufgabe todo und definiert das Objekt index.
  const index = todos.indexOf(todo)
  // splice ist eine Methode um Arrays zu ändern. Es wird genau um 1 verkleinert, also 0. Somit wird das Objekt index gelöscht und es verschwindet.
  todos.splice(index, 1)
}
// Die Funktion saveNote speichert die Notiz ab.
function saveNote(): void {
  // promt = Abfrage (console.ReadLine)
  const note = prompt
  // hier wird der Inhalt des "noteText" gelöscht.
  state.noteText = ''
  // nur für die Konsole um zu überprüfen ob es sitmmt.
  console.log('Deine Notiz:', note)
}

// aktiviert die Sichtbarkeit der Notiz und ändert den status von buttonClicked. --> verstehe ich nicht
function showNoteInput(todo: ToDo): void {
  todo.noteVisible = true
  todo.buttonClicked = true
}
// wir erstellen nun eine Funktion setDate um das Fälligkeitsdatum einer Aufgabe setzen zu könne
function setDate(todo: ToDo) {
  // Abfrage nach dem Fälligkeitsdatum
  const todoDate = prompt('Geben sie das Fälligkeitsdatum ein (YYYY-MM-DD): )')
  // ChatGPT, um sicherzustellen das nur wenn das Fälligkeitsdatum güktig ist, bevor es im Objekt todo gehen darf
  if (todoDate) {
    todo.todoDate = new Date(todoDate)
  }
  sortDate(todos)
}

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

// Funktion, wiederholende Aufgabe
/* function repetitiveTodo(todo: ToDo): void{
  var weekly = new Date();
  weekly.setDate(weekly.getDate() + 7);

} */
</script>

<style>
.input-container {
  display: flex;
  align-items: center; /* Zentriert die Elemente vertikal */
}

.icon {
  margin-right: 10px; /* Abstand zwischen dem Icon und dem Input-Feld */
  /* Stilen Sie Ihr SVG-Icon hier nach Bedarf */
  /* z.B., ändern Sie die Farbe oder die Größe des Icons */
}
</style>
