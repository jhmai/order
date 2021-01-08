<template>
  <div id="app">
    <navbar v-if="isshow"></navbar>
    <searchbar v-if="isshow"></searchbar>
    <keep-alive :include="cached">
        <router-view/>
    </keep-alive>
  </div>
</template>


<script>
  import navbar from './components/NavBar/NavBar'
  import searchbar from './components/SearchBar/SearchBar'
  export default {
    name: 'app',
    data(){
      return{
        isshow:true
      }
    },
    components: {
      navbar,
      searchbar
    },
    watch:{
      $route(to, from) {
        if (to.name=='login') {
          this.isshow=false
        }else{
          this.isshow=true
        }
        console.log(to.name)
      }
    },
    computed:{
        cached(){
          return this.$store.state.cacheArr
        }
    }

  }
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}
ul{

}
</style>
