import axios from 'axios'
import { createStore } from 'vuex'
import router from '../router'

const BASE_URL = "https://todo.api.devcode.gethired.id/";
axios.defaults.baseURL = BASE_URL;

const email = "salunaalavi@gmail.com";

const store = createStore({
    state: {
        activities: [],
    },
    mutations: {
        storeActivites(state, payload) {
            state.activities = payload.data;
        },

        storeActivity(state, payload) {
            const arrayIndex = state.activities.findIndex(
                (activity) => activity.id === payload.id
            );

            if (arrayIndex >= 0) {
                state.activities.splice(arrayIndex, 1, payload);

                return;
            }

            state.activities.unshift(payload);
        },

        unstoreActivity(state, id) {
            const arrayIndex = state.activities.findIndex((activity) => activity.id === id);

            if (arrayIndex >= 0) {
                state.activities.splice(arrayIndex, 1);
            }
        },
    },
    actions: {
        async getActivities({ commit }) {
            const { data } = await axios.get('activity-groups', { params: { email: email } });
            commit("storeActivites", data);
        },

        async setActivities({ commit }) {
            const { data } = await axios.post('activity-groups', { email, title: 'New Activity' });
            commit("storeActivity", data);
        },

        async updateActivities({ commit }, { id, ...data }) {
            const { data: data_1 } = await axios.patch(`/api/activities/${id}`, data);
            commit("storeActivity", { id, ...data_1 });
        },

        async deleteActivity({ commit }, id) {
            await axios.delete(`activity-groups/${id}`);
            commit("unstoreActivity", id);
        },
    },
    getters: {},
    modules: {},
});

// const ACTIVITY = {
//     async findActivity({ state, dispatch }, id) {
//         const data = await dispatch('API', { type: 'get', url: 'activity-groups/' + id })
//         state.activity = data.data
//     },
//     async fetchActivities({ state, dispatch }) {
//         const data = await dispatch('API', { type: 'get', url: 'activity-groups?email=salunaalavi@gmail.com' })
//         state.activities = data.data.data
//     },
//     async addActivity({ dispatch }) {
//         const newActivity = {
//             title: 'New Activity',
//             email: 'salunaalavi@gmail.com'
//         }

//         await dispatch('API', { type: 'post', url: 'activity-groups', requestData: newActivity })
//         await dispatch('fetchActivities')
//     },
//     async updateTitle({ dispatch }, title) {
//         await dispatch('API', { type: 'patch', url: 'activity-groups/' + router.currentRoute.value.params.id, requestData: { title } })
//         await dispatch('fetchActivities')
//     },
//     async removeActivity({ dispatch, state }, id) {
//         await dispatch('API', { type: 'delete', url: 'activity-groups/' + id })
//         await dispatch('fetchActivities')
//         state.selectedDelete = {}
//     },
// }

// const TODO = {
//     async findTodo({ state, dispatch }, todo) {
//         const data = await dispatch('API', { type: 'get', url: 'todo-items/' + todo.id })
//         state.selectedTodo = data.data
//         await dispatch('toggleModal')
//     },
//     async fetchTodos({ state, dispatch, commit }, activityId) {
//         const data = await dispatch('API', { type: 'get', url: 'todo-items?activity_group_id=' + activityId })
//         state.todos = data.data.data
//         commit('sortBy', state.selectedSort)
//     },
//     async addTodo({ dispatch }, todo) {
//         await dispatch('API', { type: 'post', url: 'todo-items', requestData: todo })
//         await dispatch('fetchTodos', router.currentRoute.value.params.id)
//         await dispatch('toggleModal')
//     },
//     async updateTodo({ dispatch, state }, todo) {
//         await dispatch('API', { type: 'patch', url: 'todo-items/' + todo.id, requestData: todo })
//         await dispatch('fetchTodos', router.currentRoute.value.params.id)
//         await dispatch('toggleModal')
//         state.selectedTodo = null
//     },
//     async updateTodoStatus({ dispatch }, { id, is_active }) {
//         await dispatch('API', { type: 'patch', url: 'todo-items/' + id, requestData: { is_active } })
//         await dispatch('fetchTodos', router.currentRoute.value.params.id)
//     },
//     async removeTodo({ dispatch, state }, id) {
//         await dispatch('API', { type: 'delete', url: 'todo-items/' + id })
//         await dispatch('fetchTodos', router.currentRoute.value.params.id)
//         state.selectedDelete = {}
//     },
// }

// const store = createStore({
//     state: () => ({
//         activities: [],
//         activity: {},
//         todos: [],
//         showModal: false,
//         deleteModal: false,
//         selectedTodo: null,
//         selectedSort: 'Terbaru',
//         selectedDelete: {},
//         showAlert: false,
//     }),
//     mutations: {
//         sortBy(state, filter) {
//             state.selectedSort = filter

//             switch (filter) {
//                 case 'Terbaru':
//                     state.todos.sort((a, b) => b.id - a.id)
//                     break;
//                 case 'Terlama':
//                     state.todos.sort((a, b) => a.id - b.id)
//                     break;
//                 case 'A-Z':
//                     state.todos.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
//                     break;
//                 case 'Z-A':
//                     state.todos.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0))
//                     break;
//                 case 'Belum Selesai':
//                     state.todos.sort((a, b) => b.is_active - a.is_active)
//                     break;
//                 default:
//                     state.todos.sort((a, b) => a.id - b.id)
//                     break;
//             }
//         },
//     },
//     actions: {
//         async API({ }, { type, url, requestData }) {
//             try {

//                 var response;

//                 if (type == 'get') {
//                     response = await axios.get(BASE_URL + url)
//                 } else if (type == 'post') {
//                     response = await axios.post(BASE_URL + url, requestData)
//                 } else if (type == 'patch') {
//                     response = await axios.patch(BASE_URL + url, requestData)
//                 } else if (type == 'delete') {
//                     response = await axios.delete(BASE_URL + url)
//                 }

//                 return response
//             } catch (error) {
//                 console.log(error)
//             }
//         },
//         toggleModal({ state }) {
//             state.showModal = !state.showModal
//         },
//         toggleDeleteModal({ state }) {
//             state.deleteModal = !state.deleteModal
//         },
//         ...ACTIVITY,
//         ...TODO,
//         selectDelete({ state }, item) {
//             state.selectedDelete = item
//         },
//         toggleAlert({ state }) {
//             state.showAlert = !state.showAlert
//         },
//     }
// })

export default store;
