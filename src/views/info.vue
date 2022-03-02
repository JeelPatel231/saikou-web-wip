<template>
<h1>{{id}}</h1>
</template>

<script>
export default {
  name: "Info",
  data(){
      return{
          id:this.$route.params.id
      }
  },
}
</script>

<style>
</style>