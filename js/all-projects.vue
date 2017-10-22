<template>
    <div>
    <h3>Projects List-View</h3>
    <p>See all of your projects and some general information about them. You can also create new projects</p>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Create new</h4>
        </div>
        <div class="panel-body">
                <div>
                  <div class="form-group">
                    <label for="name">Project Name:</label>
                    <input v-model="nameEntered" type="name" placeholder="Name:" class="form-control" id="name">
                  </div>
                  <div class="form-group">
                    <label for="desc">Description:</label>
                    <input v-model="descEntered" class="form-control" placeholder="Description" id="desc">
                  </div>
                  <div class="checkbox">
                    <label><input v-model="isPublicEntered" type="checkbox">Public</label>
                  </div>
                  <button v-on:click ="createNewProject(nameEntered,descEntered,isPublicEntered) " class="btn btn-default">Create</button>
                </div>
        </div>
    </div>
   <hr>
    <h3>All projects:</h3>
    <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Date-created</th>
        <th>Date-modified</th>
        <th>Info</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pro in projects">
        <td>{{pro.name}}</td>
        <td>{{pro.name}}</td>
        <td>{{pro.name}}</td>
        <td>{{pro.name}}</td>
        <td><a class="mouse" v-on:click="viewProject(pro.name)" >View</a></td>
      </tr>
    </tbody>
  </table>
    </div>
</template>
<script>
    import AllProjects from './all-projects.vue';
    export default {
        data() {
            return {
                projects: [],
                nameEntered: '',
                descEntered: '',
                isPublicEntered: ''
            }
        },
        created() {
            this.projects.push({
                name: "ArffPar"
            });
            this.projects.push({
                name: "Mandelbrot"
            });
            this.projects.push({
                name: "ProManager"
            })
        },
        methods: {
            createNewProject(name, desc, _public) {
                //console.log(name + ", " + desc + "," + _public);
                this.projects.push({
                    name: name,
                    desc: desc
                });
            },
            viewProject(name) {
                this.$emit("show-project", name)
            }
        }
    }

</script>

<style>


</style>
