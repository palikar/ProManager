import UserManager from './userMangement.js'
import AllProjects from './all-projects.vue'
import Project from './project.vue'
//main application


var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        currentView: "project",
        currentProjectId: 'Pog1'
    },
    components: {
        'all-projects': AllProjects,
        'project': Project
    },
    methods: {
        selectProject: function (name) {
            this.currentView = "project";
            this.currentProjectId = name;
        }
    },
    computed: {
        currentViewProperties: function () {
            return {
                currentPoject: this.currentProjectId
            }
        }
    },
    created: function () {
        //init
    }
});
