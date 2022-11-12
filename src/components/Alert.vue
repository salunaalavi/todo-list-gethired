<script setup>
import Button from "./Button.vue";

const props = defineProps({
  type: String,
  alert: Boolean,
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <div
    @click.self="close"
    id="popup-modal"
    tabindex="-1"
    :class="alert ? 'justify-center items-center flex' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
  >
    <div
      class="relative modal-layout flex items-center md:h-auto"
      data-cy="alert-activity"
    >
      <div class="relative bg-white modal-content text-center">
        <div class="modal-body flex items-center" data-cy="modal-information">
          <img
            data-cy="modal-information-icon"
            src="@/assets/icons/modal-information-icon.svg"
            alt=""
          />
          <h5
            data-cy="modal-information-title"
            class="text-center font-normal"
          >
            <span class="capitalize">{{ type }}</span> berhasil dihapus
          </h5>
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
  height: 150px;
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
  gap: 10px;
  padding: 20px 30px;
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
.buttons {
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  padding: 0 0.75rem 43px;
  gap: 20px;
}
</style>
