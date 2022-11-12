<script setup>
import { ref } from "vue";
import Button from "./Button.vue";

const props = defineProps({
  priorities: Array,
  dropdown: Boolean,
});

const title = ref("");

const emit = defineEmits(["closeDropdown", "select"]);

const closeDropdown = () => {
  emit("closeDropdown");
};

const select = (title, value) => {
  emit("select", title, value);
};

const selectPriority = (str) => {
  title.value = str;
};
</script>

<template>
  <div
    @click.self="closeDropdown"
    id="dropdown"
    :class="dropdown ? '' : 'hidden'"
    class="absolute w-44 bg-white rounded shadow dark:bg-gray-700"
  >
    <ul
      class="py-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefault"
    >
      <li v-for="priority in priorities" :key="priority.title">
        <button
          @click="select(priority.title, priority.value)"
          :data-cy="priority.data"
          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-blue"
        >
          <div class="flex items-center">
            <div
              data-cy="todo-item-priority-indicator"
              class="label-indicator"
              :class="
                priority.value === 'very-high'
                  ? 'bg-red'
                  : priority.value === 'high'
                  ? 'bg-yellow'
                  : priority.value === 'normal'
                  ? 'bg-pink'
                  : priority.value === 'low'
                  ? 'bg-aqua'
                  : priority.value === 'very-low' && 'bg-navy'
              "
            ></div>
            {{ priority.title }}
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#dropdown {
  z-index: 55;
  top: 79px;
  width: 100%;
  width: 205px;
}
button {
  width: 205px;
  height: 52px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 38px;
  position: relative;
  transition: all 100ms ease 0s;
  box-sizing: border-box;
  padding: 0 17px;
  outline: 0px !important;
}
img {
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: 100%;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
</style>
