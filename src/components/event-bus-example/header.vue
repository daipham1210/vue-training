<template>
  <header>
    <button @click="toggleSidebar">
      toggle
    </button>
  </header>
</template>

<script >
import { defineComponent, toRefs, reactive } from 'vue'
import useEmitter from '@/composables/useEmitter'

export default defineComponent({
  name: 'Header',
  setup() {
    const bus = useEmitter()
    const data = reactive({
      sidebarOpen: true,
    })

    const toggleSidebar = () => {
      data.sidebarOpen = !data.sidebarOpen;
      // event bus, cần có 1 cái key để define event gửi đi
      bus.emit("toggle-sidebar", data.sidebarOpen);
    }

    return {
      ...toRefs(data),
      toggleSidebar,
    }
  }
})
</script>