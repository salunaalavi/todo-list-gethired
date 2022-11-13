<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Button from "@/components/Button.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import Alert from "@/components/Alert.vue";
const alert = ref(false);

const store = useStore();

const loading = ref(false);

const addActivity = () => {
  store.dispatch("setActivities");
};

const alertValue = () => {
  alert.value = !alert.value;
};

const getActivities = () => {
  loading.value = true;
  store.dispatch("getActivities");
  loading.value = false
};

onMounted(() => {
    getActivities();
})

const activities = computed(() => store.state.activities);
</script>

<template>
  <template v-if="loading">Loading...</template>
  <template v-else>
    <Alert v-if="alert" :alert="alert" :type="'activity'" @close="alertValue" data-cy="alert-activity" />
    <div class="title flex justify-between items-center">
      <h1 data-cy="activity-title">Activity</h1>
      <Button data-cy="activity-add-button" type="primary" @click="addActivity">
        <img src="@/assets/icons/tabler_plus.svg" />
        <span>Tambah</span>
      </Button>
    </div>
    <div v-if="activities.length > 0" class="row flex-wrap">
      <div class="col" v-for="activity in activities" :key="activity.id">
        <ActivityCard :activity="activity" @alert="alertValue" />
      </div>
    </div>
    <div v-else class="flex justify-center">
      <button
        class="bg-transparent pb-[25px]"
        @click="addActivity"
      >
        <img
          data-cy="activity-empty-state"
          src="@/assets/icons/activity-empty-state.svg"
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
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -0.5);
  margin-left: calc(var(--bs-gutter-x) * -0.5);
}
.col {
  flex: 0 0 auto;
  width: 25%;
  padding: 0 20px 0 0;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
