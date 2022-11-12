<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Button from "./Button.vue";
import PriorityDropdown from "./PriorityDropdown.vue";

const store = useStore();

const dropdown = ref(false);
const input = ref("");
const select = ref("very-high");
const priorities = ref([
  {
    title: "Very High",
    value: "very-high",
    data: "modal-add-priority-very-high"
  },
  {
    title: "High",
    value: "high",
    data: "modal-add-priority-high"
  },
  {
    title: "Medium",
    value: "normal",
    data: "modal-add-priority-medium"
  },
  {
    title: "Low",
    value: "low",
    data: "modal-add-priority-low"
  },
  {
    title: "Very Low",
    value: "very-low",
    data: "modal-add-priority-very-low"
  },
]);

const props = defineProps({
  title: String,
  modal: Boolean,
  todo: Object,
  id: String,
});

const emit = defineEmits(["close"]);

const saveTodo = () => {
  if (props.title) {
    const data = {
      id: props.id,
      title: input.value,
      priority: select.value,
    };
    store.dispatch("updateTodos", data);
  } else {
    const data = {
      id: props.id,
      title: input.value,
      priority: select.value,
    };
    store.dispatch("setTodos", data);
  }
};

const close = () => {
  emit("close");
};

const dropdownValue = () => {
  dropdown.value = !dropdown.value;
};

const selectPriority = (title, priority) => {
  dropdown.value = !dropdown.value;
  select.value = priority;
  props.todo.title = title;
  props.todo.priority = priority;
};

const isDisabled = computed(() => {
  return !input.value;
});

computed(() => {
  if (props.title) {
    input.value = props.title;
  }
});
</script>

<template>
  <div
    @click.self="close"
    id="popup-modal"
    tabindex="-1"
    :class="modal ? 'justify-center items-center flex' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
  >
    <div
      class="relative modal-layout flex items-center md:h-auto"
      data-cy="todo-modal-delete"
    >
      <div
        class="relative bg-white modal-content text-center"
        data-cy="modal-add"
      >
        <div class="modal-header flex justify-between items-center">
          <h3
            data-cy="modal-add-title"
            class="font-semibold"
          >
            Tambah List Item
          </h3>
          <button class="bg-transparent pr-[11px]" @click.prevent="close">
            <img
              data-cy="modal-add-close-button"
              src="@/assets/icons/modal-add-close-button.svg"
              alt=""
            />
          </button>
        </div>
        <div class="modal-body text-left">
          <div class="mb-6">
            <label
              data-cy="modal-add-name-title"
              for="username-success"
              class="block font-semibold"
            >
              NAMA LIST ITEM
            </label>
            <input
              data-cy="modal-add-name-input"
              v-model="input"
              type="text"
              id="username-success"
              placeholder="Bonnie Green"
            />
          </div>
          <div class="relative">
            <label
              for="username-error"
              class="block font-semibold"
              data-cy="modal-add-priority-title"
              >PRIORITY</label
            >
            <button id="priorityButton" @click.prevent="dropdownValue" data-cy="modal-add-priority-dropdown">
              <div v-if="!dropdown" class="flex items-center">
                <div
                  data-cy="todo-item-priority-indicator"
                  class="label-indicator"
                  :class="
                    todo.priority === 'very-high'
                      ? 'bg-red'
                      : todo.priority === 'high'
                      ? 'bg-yellow'
                      : todo.priority === 'normal'
                      ? 'bg-pink'
                      : todo.priority === 'low'
                      ? 'bg-aqua'
                      : todo.priority === 'very-low' && 'bg-navy'
                  "
                ></div>
                {{
                  todo.priority === "very-high"
                    ? "Very High"
                    : todo.priority === "high"
                    ? "High"
                    : todo.priority === "normal"
                    ? "Medium"
                    : todo.priority === "low"
                    ? "Low"
                    : todo.priority === "very-low" && "Very Low"
                }}
              </div>
              <div v-if="dropdown">pilih priority</div>
              <img
                :class="dropdown && 'rotate-180'"
                src="@/assets/icons/tabler_chevron-down.svg"
                alt=""
              />
            </button>
            <PriorityDropdown
              data-cy="modal-add-priority-dropdown"
              v-if="dropdown"
              :dropdown="dropdown"
              :priorities="priorities"
              @select="selectPriority"
              @closeDropdown="dropdownValue"
            />
          </div>
        </div>
        <div class="modal-footer flex justify-end">
          <Button
            data-cy="modal-add-save-button"
            :type="'primary'"
            :disabled="isDisabled"
            @click="saveTodo"
            >Simpan</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal-layout {
  width: 830px;
  height: 100%;
}
.modal-content {
  border-radius: 12px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  background-clip: padding-box;
}
.modal-header {
  flex-shrink: 0;
  padding: 24px 30px;
  border-bottom: 1px solid #dee2e6;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 38px 30px 23px;
}
.modal-footer {
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  padding: 15px 40px 19px;
  border-top: 1px solid #dee2e6;
}
#priorityButton {
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
label {
  margin-bottom: 9px;
  font-size: 12px;
  line-height: 18px;
}
input {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border: 1px solid #e5e5e5;
  background-clip: padding-box;
  appearance: none;
  border-radius: 0.25rem;
  height: 52px;
  margin-bottom: 26px;
}
input:focus {
  border: 1px solid #16abf8;
}
input:focus-visible {
  outline: 0;
}
</style>
