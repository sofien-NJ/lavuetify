<template>
    <div class="container">
        <div class="form-row">
            <div class="col-row">
                <input
                    type="text"
                    class="form-control"
                    @keyup="searchTask"
                    v-model="q"
                    placeholder="Rechercher une Tache...."
                />
            </div>
        </div>
        <add-task @task-added="refresh"></add-task>
        <ul class="list-group">
            <li
                class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                "
                v-for="task in tasks.data"
                :key="task.id"
            >
                <a href="#">{{ task.name }}</a>
                <div>
                    <button
                        type="button"
                        class="btn btn-secondary my-3"
                        data-toggle="modal"
                        data-target="#editModal"
                        @click="getTask(task.id)"
                    >
                        éditer
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteTask(task.id)"
                    >
                        Supprimer
                    </button>
                </div>
            </li>
            <edit-task
                v-bind:TaskToEdit="TaskToEdit"
                @task-updated="refresh"
            ></edit-task>
        </ul>
        <pagination
            :data="tasks"
            @pagination-change-page="getResults"
            class="mt-5"
        ></pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: {},
            TaskToEdit: "",
            q: "",
        };
    },

    created() {
        axios
            .get("http://laravel8.test/tasksList")
            .then((response) => (this.tasks = response.data))
            .catch((error) => console.log(error));
    },
    methods: {
        getResults(page = 1) {
            axios
                .get("http://laravel8.test/tasksList?page=" + page)
                .then((response) => {
                    this.tasks = response.data;
                });
        },
        getTask(id) {
            axios
                .get("http://laravel8.test/tasks/edit/" + id)
                .then((response) => (this.TaskToEdit = response.data))
                .catch((error) => console.log(error));
        },
        deleteTask(id) {
            axios
                .delete("http://laravel8.test/tasks/" + id)
                .then((response) => (this.tasks = response.data))
                .catch((error) => console.log(error));
        },

        searchTask() {
            if (this.q.length > 3) {
                axios
                    .get("http://laravel8.test/tasksList/" + this.q)
                    .then((response) => (this.tasks = response.data))
                    .catch((error) => console.log(error));
            } else {
                axios
                    .get("http://laravel8.test/tasksList")
                    .then((response) => (this.tasks = response.data))
                    .catch((error) => console.log(error));
            }
        },

        refresh(tasks) {
            this.tasks = tasks.data;
        },
    },
    mounted() {
        console.log("Component mounted.");
    },
};
</script>
