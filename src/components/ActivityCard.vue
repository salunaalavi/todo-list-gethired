<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ModalDelete from "@/components/ModalDelete.vue";

const store = useStore();

const modal = ref(false);

const props = defineProps({
  activity: Object,
});

const emit = defineEmits(["alert"]);

const formattedDate = computed(() =>
  new Date(props.activity.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);

const modalValue = () => {
  modal.value = !modal.value;
};

const deleteActivity = async () => {
  store.dispatch("deleteActivity", props.activity.id).then(() => {
    modal.value = !modal.value;
    emit("alert");
  });
};
</script>

<template>
  <ModalDelete
    v-if="modal"
    data-cy="activity-modal-delete"
    :modal="modal"
    :type="'activity'"
    :title="activity.title"
    @close="modalValue"
    @deleteItem="deleteActivity"
  />
  <div data-cy="activity-item" class="activity-item bg-white">
    <h3
      class="font-bold"
      data-cy="activity-item-title"
      @click="$router.replace({ name: 'detail', params: { id: activity.id } })"
    >
      {{ activity.title }}
    </h3>
    <div class="footer">
      <p
        data-cy="activity-item-date"
        class="activity-item-title text-grey text-start font-medium"
      >
        {{ formattedDate }}
      </p>
      <button
        data-cy="activity-item-delete-button"
        class="bg-transparent"
        @click.prevent="modalValue"
      >
        <img
          data-cy="modal-delete"
          src="@/assets/icons/activity-item-delete-button.svg"
        />
      </button>
    </div>
  </div>
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
h3 {
  height: 158px;
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
