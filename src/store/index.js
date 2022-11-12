import axios from 'axios'
import { createStore } from 'vuex'
import router from '../router'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const store = createStore({
    state: {
        activities: [],
        todos: [],
        todo: {},
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

        storeTodos(state, payload) {
            state.todos = payload.todo_items;
            state.todo = payload;
        },

        storeTodo(state, payload) {
            const arrayIndex = state.todos.findIndex(
                (todo) => todo.id === payload.id
            );

            if (arrayIndex >= 0) {
                state.todos.splice(arrayIndex, 1, payload);

                return;
            }

            state.todos.unshift(payload);
        },

        unstoreTodo(state, id) {
            const arrayIndex = state.todos.findIndex((todo) => todo.id === id);

            if (arrayIndex >= 0) {
                state.todos.splice(arrayIndex, 1);
            }
        },
    },
    actions: {
        async getActivities({ commit }) {
            const { data } = await axios.get('activity-groups', { params: { email: import.meta.env.VITE_EMAIL } });
            commit("storeActivites", data);
        },

        async setActivities({ commit }) {
            const { data } = await axios.post('activity-groups', { email: import.meta.env.VITE_EMAIL, title: 'New Activity' });
            commit("storeActivity", data);
        },

        async updateActivities({ commit }, { id, ...data }) {
            const { data: data_1 } = await axios.patch(`activity-groups/${id}`, data);
            commit("storeActivity", { id, ...data_1 });
        },

        deleteActivity({ commit }, id) {
            axios.delete(`activity-groups/${id}`).then(() => {
                commit("unstoreActivity", id);
            });
        },

        async getTodos({ commit }, id) {
            const { data } = await axios.get(`activity-groups/${id}`);
            commit("storeTodos", data);
        },

        async setTodos({ commit }, passed) {
            const { data } = await axios.post(`todo-items`, { activity_group_id: passed.id, title: passed.title, priority: passed.priority });
            commit("storeTodo", data);
        },

        async updateTodos({ commit }, { id, ...data }) {
            const { data: data_1 } = await axios.patch(`/todo-items/${id}`, data);
            commit("storeTodo", { id, ...data_1 });
        },

        deleteTodo({ commit }, id) {
            axios.delete(`todo-items/${id}`).then(() => {
                commit("unstoreTodo", id);
            });
        },
    },
    getters: {},
    modules: {},
});

export default store;
