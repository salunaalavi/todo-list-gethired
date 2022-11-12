<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
import TodoCard from "@/components/TodoCard.vue";
import ModalForm from "@/components/ModalForm.vue";
import SortModal from "@/components/SortModal.vue";
import Alert from "@/components/Alert.vue";
import down from "../assets/icons/-.svg";
import up from "../assets/icons/- (2).svg";
import az from "../assets/icons/- (4).svg";
import za from "../assets/icons/- (3).svg";
import updown from "../assets/icons/- (1).svg";
const alert = ref(false);

const store = useStore();
const route = useRoute();

const loading = ref(false);
const showInput = ref(false);
const modal = ref(false);
const sort = ref(false);
const todo = ref({
  title: "Very High",
  priority: "very-high",
});
const filters = ref([
  { icon: down, text: "Terbaru", data: "sort-latest" },
  { icon: up, text: "Terlama", data: "sort-oldest" },
  { icon: az, text: "A-Z", data: "todo-az" },
  { icon: za, text: "Z-A", data: "todo-za" },
  { icon: updown, text: "Belum selesai", data: "sort-unfinished" },
]);
const id = ref();

const addActivity = () => {
  store.dispatch("setActivities");
};

const alertValue = () => {
  alert.value = !alert.value;
};

const modalValue = () => {
  modal.value = !modal.value;
  id.value = route.params.id;
};

const sortValue = () => {
  sort.value = !sort.value;
};

const openInput = () => {
  showInput.value = !showInput.value;
};

const getTodos = () => {
  loading.value = true;
  store
    .dispatch("getTodos", route.params.id)
    .finally(() => (loading.value = false));
};

getTodos();

const todos = computed((text) => {
  if (text == "Terbaru") {
    return store.state.todos.sort((a, b) => b.id - a.id);
  } else if (text == "Terlama") {
    return store.state.todos.sort((a, b) => a.id - b.id);
  } else if (text == "A-Z") {
    return store.state.todos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (text == "Z-A") {
    return store.state.todos.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    return store.state.todos.sort((a, b) => b.is_active - a.is_active);
  }
});

const currentTodo = computed(() => store.state.todo);

const selectPriority = (title) => {
  sort.value = !sort.value;
};

const updateTitle = () => {
  store.dispatch("updateActivities", {
    id: route.params.id,
    title: currentTodo.value.title,
  });
  showInput.value = false;
};
</script>

<template>
  <template v-if="loading">Loading...</template>
  <template v-else>
    <ModalForm
      v-if="modal"
      data-cy="activity-modal-delete"
      :modal="modal"
      :todo="todo"
      :id="id"
      @close="modalValue"
    />
    <Alert v-if="alert" :alert="alert" :type="'activity'" @close="alertValue" data-cy="alert-activity" />
    <div class="title flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <router-link to="/">
          <img data-cy="todo-back-button" src="../assets/icons/todo-back-button.svg" alt="" />
        </router-link>
        <input
          ref="inputTitle"
          data-cy="update-title"
          v-if="showInput"
          @focusout="updateTitle"
          @keyup.enter="updateTitle"
          tabindex="0"
          type="text"
          v-model="currentTodo.title"
          class="font-bold"
        />
        <h1 v-else data-cy="todo-title" @click="openInput">
          {{ currentTodo.title }}
        </h1>
        <button
          data-cy="todo-title-edit-button"
          class="bg-transparent pr-[11px]"
          @click.prevent="openInput"
        >
          <img src="../assets/icons/todo-title-edit-button.svg" alt="" />
        </button>
      </div>
      <div class="relative flex gap-4 items-center">
        <button
          data-cy="todo-sort-button"
          class="bg-transparent pr-[11px]"
          @click.prevent="sortValue"
        >
          <img src="../assets/icons/tabler_arrows-sort.svg" alt="" />
        </button>
        <SortModal
          v-if="sort"
          data-cy="todo-sort-button"
          :dropdown="sort"
          :filters="filters"
          @select="selectPriority"
          @close="sortValue"
        />
        <Button
          data-cy="todo-add-button"
          type="primary"
          @click.prevent="modalValue"
        >
          <img src="@/assets/icons/tabler_plus.svg" />
          <span>Tambah</span>
        </Button>
      </div>
    </div>
    <div v-if="todos.length > 0" class="detail-content">
      <div
        class="content-item flex justify-between bg-white"
        v-for="todo in todos"
        :key="todo.id"
        data-cy="todo-item"
      >
        <TodoCard :todo="todo" @alert="alertValue" />
      </div>
    </div>

    <div v-else class="flex justify-center">
      <button
        class="bg-transparent pb-[25px]"
        @click="modalValue"
      >
        <img
          data-cy="todo-empty-state"
          src="@/assets/icons/todo-empty-state.svg"
          alt="empty"
        />
      </button>
    </div>
  </template>
</template>

<style scoped>
.title {
  margin-bottom: 55px;
}
.content-item {
  margin-bottom: 10px;
  padding: 27px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
}
input {
  display: block;
  width: 100%;
  font-size: 36px;
  line-height: 54px;
  border: 1px solid #e5e5e5;
  background-clip: padding-box;
  appearance: none;
  border-radius: 0.25rem;
  height: 52px;
}
input:focus {
  border: 1px solid #16abf8;
}
input:focus-visible {
  outline: 0;
}
</style>
