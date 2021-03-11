<template>
    <div class="number-box">
        <span class="desc-btn" @click='desc'>-</span>
        <input type="number" min="1" name="" v-model='numeber' class="number-value">
        <span class="add-btn" @click='add'>+</span>
    </div>
</template>


<script>
  export default {
    name: 'searchBar',
    data(){
        return{
            numeber:1
        }
    },
    methods:{
        desc(){
            if (this.numeber<=1) {
                return
            }
            --this.numeber
            this.$emit('desc',this.numeber)
            
        },
        add(){
            ++this.numeber
            this.$emit('add',this.numeber)
        }
    },
    props:{
        num:{
            type:Number,
            default:1
        }
    },
    components: {
      
    },
    watch:{
        num:{
            handler(newVal,oldVal){
                this.numeber=this.num
            },
            immediate: true
        }
    }
  }
</script>
<style lang="scss" scoped>
.number-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220px;
    height: 40px;
    border: 1px solid #EEEEEE;
    overflow: hidden;
}
.number-box>span{
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    background-color: #F9FAFB;
    border: 1px solid #EEEEEE;
    cursor: pointer;
}
.number-box>input{
    width: 100px;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 18px;
    color: #535353
}
.number-box>input:focus{
    border: none;
    outline: 0;
}
</style>
