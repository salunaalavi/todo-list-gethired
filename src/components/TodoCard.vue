<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import ModalDelete from "@/components/ModalDelete.vue";
import ModalForm from "@/components/ModalForm.vue";

const store = useStore();

const modal = ref(false);
const modalEdit = ref(false);

const props = defineProps({
  todo: Object,
});

const emit = defineEmits(["alert"]);

const modalValue = () => {
  modal.value = !modal.value;
};

const modalEditValue = () => {
  modalEdit.value = !modalEdit.value;
};

const updateActiveItem = async () => {
  store.dispatch("updateTodos", {
    id: props.todo.id,
    is_active: !props.todo.is_active,
  });
};

// console.log(modal.value);

const deleteActivity = async () => {
  store.dispatch("deleteTodo", props.todo.id).then(() => {
    modal.value = !modal.value;
    emit("alert");
  });
};
</script>

<template>
  <ModalDelete
    v-if="modal"
    data-cy="delete-list-item"
    :modal="modal"
    :type="'item'"
    :title="todo.title"
    @close="modalValue"
    @deleteItem="deleteActivity"
  />
  <ModalForm
    v-if="modalEdit"
    data-cy="tambah-list-item"
    :modal="modalEdit"
    :todo="todo"
    :id="String(todo.id)"
    :title="todo.title"
    @close="modalEditValue"
  />
  <div class="flex gap-3 items-center">
    <input
      data-cy="todo-item-checkbox"
      @change="updateActiveItem"
      :checked="!todo.is_active"
      class="check"
      type="checkbox"
      name=""
      id=""
    />
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
    <h3
      data-cy="todo-item-title"
      class="todo-title font-medium"
      :class="todo.is_active ? '' : 'line-through text-grey'"
    >
      {{ todo.title }}
    </h3>
    <button
      data-cy="activity-item-edit-button"
      class="bg-transparent pr-[11px]"
      @click="modalEditValue"
    >
      <img
        data-cy="todo-edit"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        src="@/assets/icons/todo-item-edit-button.svg"
        alt=""
      />
    </button>
  </div>
  <button
    data-cy="activity-item-delete-button"
    class="bg-transparent"
    @click.prevent="modalValue"
  >
    <img
      src="../assets/icons/activity-item-delete-button.svg"
      alt=""
    />
  </button>
</template>

<style scoped>
.activity-item {
  height: 234px;
  border-radius: 12px;
  padding: 22px 27px;
  margin-bottom: 26px;
  position: relative;
  box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
}
.check {
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border: 1px solid #c7c7c7;
  margin-top: 0;
  border-radius: 0;
}
.label-indicator {
  height: 9px;
  width: 9px;
  border-radius: 50%;
  margin: 0 19px 0 7px;
}
.footer {
  position: absolute;
  bottom: 25px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 0;
  width: calc(100% - 54px);
  padding: 0;
}
</style>
