<template>
  <div>
      <div class="blog-header">
        <h1 class="blog-title">{{currentPoject}}</h1>
        <p class="lead blog-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      
      
      
      <ul class="nav nav-pills nav-justified" role="tablist">
        <li role="presentation" class="active"><a href="#General" aria-controls="General" role="tab" data-toggle="tab">General</a></li>
        <li role="presentation"><a href="#Tasks" aria-controls="Tasks" role="tab" data-toggle="tab">Tasks</a></li>
        <li role="presentation"><a href="#Dash" aria-controls="Dash" role="tab" data-toggle="tab">Dash</a></li>
        <li role="presentation"><a href="#Notes" aria-controls="Notes" role="tab" data-toggle="tab">Notes</a></li>
        <li role="presentation"><a href="#Custom-Variables" aria-controls="Custom-Variables" role="tab" data-toggle="tab">Custom-Variables</a></li>
      </ul>

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="General">
            <hr>    
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem quod, ab voluptates voluptatum distinctio maxime facere ipsa, eveniet similique modi quisquam perferendis ducimus enim dolore voluptate, hic assumenda possimus. Voluptate.   
            
            
        </div>
        <div role="tabpanel" class="tab-pane" id="Tasks">Tasks</div>
        <div role="tabpanel" class="tab-pane" id="Dash">Dash</div>
        <div role="tabpanel" class="tab-pane" id="Notes"></div>
        <div role="tabpanel" class="tab-pane" id="Custom-Variables"></div>
      </div>
      
      
      
  </div>
</template>

<script>
    export default {
        props: ['currentPoject'],
        data() {
            return {
                msg: 'One projects!'
            }
        },

        created() {



        },
        methods: {




        }
    }

</script>

<style>


</style>
