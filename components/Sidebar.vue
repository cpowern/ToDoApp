<template>
  <div id="mySideBar" class="bg-gray-500 w-1/3">
    <div>
      <div
        class="text-1xl bg-gray-500 p-2 text-justify ml-3 mr-3 h-28 focus:ring focus:ring-lime-500 focus:outline-none border border-gray-600 hover:border-lime-500 cursor-pointer"
      >
        <textarea
          id="editTitle"
          v-model="form.title"
          name="Title"
          class="w-full"
          placeholder="Title"
          @keypress.prevent.enter="emitAndClearInput()"
        ></textarea>
      </div>
      <div
        class="mt-16 text-1xl bg-gray-500 p-2 text-justify ml-3 mr-3 h-28 focus:ring focus:ring-lime-500 focus:outline-none border border-gray-600 hover:border-lime-500 cursor-pointer"
      >
      <input 
      id="editDate" 
      v-model="form.date"
      type="date"
      class="w-full"
      @keypress.prevent.enter="emitAndClearInput()"
      >
      </div>
      <div
        class="mt-16 text-1xl bg-gray-500 p-2 text-justify ml-3 mr-3 h-28 focus:ring focus:ring-lime-500 focus:outline-none border border-gray-600 hover:border-lime-500 cursor-pointer"
      >
        <textarea 
        id="editNote" 
        v-model="form.note"
        name="Notiz" 
        class="w-full" 
        placeholder="Notiz"
        @keypress.prevent.enter="emitAndClearInput()"
        ></textarea>
      </div>
      <div class="flex justify-center items-center h-[220px]">
        <img 
        id="sidebarImage" 
        src="/icons/taskImage.svg" 
        alt="sidebarImage" 
        class="h-40 w-26 object-center" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    required: false,
  },
  note: {
    type: String,
    required: false,
  }
})

const form = reactive({
  title: props.title,
  date: props.date,
  note: props.note,
})

const emit = defineEmits(['push-todo'])

function emitAndClearInput() {
  emit('push-todo', form.title, props.id, form.date, form.note)
  console.log('Test: :', form.date, form.note)
}

</script>

<style>
#mySideBar {
  color: #84cc16;
  background-color: #4F5A69;
  height: 100vh;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

#mySideBar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

#mySideBar a:hover {
  color: #84cc16;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}
#editNote {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  background: #6b7280;
}

#editTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  background: #6b7280;
}

#editDate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  background: #6b7280;
}

#sidebarImage {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

