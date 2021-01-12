<template>
    <div class="search-bar">
        
        <div class="logo">
            <img src="@/assets/images/logo.png">
        </div>
        <div class='center'>
            <slot name="center"></slot>
        </div>
        
        <div class="search">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">        
                <el-button slot="append" class="search-btn" @click='search'>搜索</el-button>
            </el-input>
        </div>
        
    </div>
</template>


<script>
  export default {
    name: 'searchBar',
    data(){
        return{
            input:''
        }
    },
    methods:{
        search(){
           this.$router.push({
               path:'/productList',
               query:{
                   keyword:this.input
               }
           })
        }
    },
    components: {
      
    }
  }
</script>
<style lang="scss" scoped>
.search-bar{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15%;
    margin: 25px 0;
}
.center{
    flex: 1;
}
.logo>img{
    height: 25px;
    width: auto;
}
.search{
    display: flex;
    justify-content: flex-end;
}

.right-bar{
    position: fixed;
    right: 0;
    top: 40%;
    border: 1px solid #EEEEEE;
    border-right: none;
}
.right-bar>div{
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    color: #9A9A9A;
    border-bottom: 1px solid #EEEEEE;
}
.right-bar>div img{
    margin-bottom: 5px;
    width: 18px;
    height: 18px;
}
.el-input {
    width:400px;

}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.search{
    
}
.search/deep/.el-input__inner{
    border: 2px solid #A5242A;
}
.search/deep/.el-button{
    background-color: #A5242A;
    color: #fff;
    border-radius: 0px 4px 4px 0px;
    height: 40px;
}
</style>
