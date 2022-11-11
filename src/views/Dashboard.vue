<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useStore, mapState, mapActions } from "vuex";
import Button from "@/components/Button.vue";
import ActivityCard from "@/components/ActivityCard.vue";

const store = useStore();

const loading = ref(false);

const addActivity = () => {
  store.dispatch("setActivities");
};

const getActivities = () => {
  loading.value = true;
  store.dispatch("getActivities").finally(() => (loading.value = false));
};

getActivities();

const activities = computed(() => store.state.activities);

// console.log(activities.value);

// export default {
//   components: {
//     Button,
//     ActivityCard,
//   },
//   setup() {
//     const store = useStore();

//     const getActivities = onMounted(() => {
//       store.dispatch("getActivities");
//     });

//     const activities = computed(() => store.state.activities);

//     const addActivity = () => {
//       store.dispatch("setActivities");
//     };

//     return {
//       activities,
//       getActivities,
//       addActivity,
//     };
//   },
// };

// export default {
//   components: {
//     Button,
//     ActivityCard,
//   },
//   computed: mapState(["activities"]),
//   created() {
//     this.getActivities();
//   },
//   methods: {
//     ...mapActions(["setActivities", "getActivities"]),
//   },
// };
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="wrapper">
    <!-- <Alert v-show="showAlert" :message="'Activity berhasil dihapus'" /> -->
    <div class="title flex justify-between items-center">
      <h1 data-cy="activity-title">Activity</h1>
      <Button data-cy="activity-add-button" type="primary" @click="addActivity">
        <img src="@/assets/icons/tabler_plus.svg" />
        <span>Tambah</span>
      </Button>
    </div>
    <div v-if="activities.length > 0" class="row flex-wrap">
      <div class="col" v-for="activity in activities" :key="activity.id">
        <ActivityCard :activity="activity" />
      </div>
    </div>
    <img
      v-else
      data-cy="activity-empty-state"
      @click="addActivity"
      src="@/assets/vue.svg"
      alt="empty"
    />
  </div>
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
