<script setup>
import Button from "./Button.vue";

const props = defineProps({
  type: String,
  title: String,
  modal: Boolean,
});

const emit = defineEmits(["deleteItem", "close"]);

const deleteComponent = () => {
  emit("deleteItem");
};

const close = () => {
  emit("close");
};
</script>

<template>
  <div
    @click.self="close"
    id="popup-modal"
    tabindex="-1"
    :class="modal ? 'justify-center items-center flex' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
  >
    <div class="relative modal-layout flex items-center md:h-auto" data-cy="modal-delete">
      <div class="relative bg-white modal-content text-center">
        <div class="modal-header flex justify-center items-center">
          <img
            data-cy="modal-delete-icon"
            src="@/assets/icons/modal-delete-icon.svg"
            alt=""
          />
        </div>
        <div class="modal-body">
          <h3 class="mb-5 text-center font-normal" data-cy="modal-delete-icon">
            Apakah anda yakin menghapus {{ type }}
            <strong>"{{ title }}"?</strong>
          </h3>
        </div>
        <div class="buttons flex justify-center">
          <Button
            data-cy="modal-delete-cancel-button"
            :type="'secondary'"
            @click="close"
            >Batal</Button
          >
          <Button
            data-cy="modal-delete-confirm-button"
            :type="'danger'"
            @click="deleteComponent"
            >Hapus</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-layout {
  width: 490px;
  height: 355px;
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
  padding: 40px 17px 17px;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 17px;
}
.buttons {
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  padding: 0 0.75rem 43px;
  gap: 20px;
}
</style>
