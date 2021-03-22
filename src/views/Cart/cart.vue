<template>
    <div class="cart">
       <div class="main row">
            <el-table
                ref="multipleTable"
                :data="cartList"
                row-key="1"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="85">
                </el-table-column>
                 <el-table-column v-for="(item, index) in col"
                        :key="`col_${index}`"
                        :prop="dropCol[index].prop"
                        :label="item.label"
                        class-name="allowDrag"
                        > 
                </el-table-column>
                <!-- <el-table-column
                  label="商品名称"
                  prop='productInfo.store_name'
                  width="400"
                  >
                    <template slot-scope="scope">
                        <div class="desc">
                            <img class="banner" :src="'http://m.qlzxb.cn/newapp/get_img/name/'+scope.row.productInfo.store_name">
                            <div>{{scope.row.productInfo.store_name}}
                                {{scope.row.productInfo.attrInfo&&scope.row.productInfo.attrInfo.suk}}
                            </div>
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column
                  label="单价"
                  prop="truePrice"
                  >
                  <template slot-scope="scope">
                    <div class="single-price"> {{scope.row.truePrice|toFixed}}元</div>
                   
                  </template>
                </el-table-column> -->



                <el-table-column
                  prop="number"
                  label="数量"
                  show-overflow-tooltip
                  width="190"
                  class-name='ignore-elements'
                  >
                   <template slot-scope="scope">
                    <div class="number-box">
                        <span class="desc-btn" @click='desc(scope.row.id)'>-</span>
                        <input type="number" min="1" 
                        v-model="scope.row.cart_num" 
                        class="number-value" 
                        @input='handelInput()'>
                        <span class="add-btn" @click='add(scope.row.id)'>+</span>
                    </div>
                   
                  </template>
                </el-table-column>
                <el-table-column
                  prop="allprice"
                  label="小计"
                  width="120"
                  class-name='ignore-elements'
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="total-price"> {{scope.row.truePrice*scope.row.cart_num|toFixed}}元</div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="option"
                  label="操作"
                  class-name='ignore-elements'
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="delete" @click='handelDelete(scope.row.id)'> 删除</div>
                  </template>
                </el-table-column>
              </el-table>

                <div class="all-option">
                    <div class="left">
                        <span class="choose-num">已选<span></span>件商品</span>
                        <span class="delete-all" @click='handelDelete()'>删除选中商品</span>
                    </div>
                    <div class="right">
                        <div class="order-price">
                            <div>合计：<span class="order-price-number">{{orderPrice|toFixed}}</span>元</div>
                            <div>注：合计商品价格不包含运费</div>
                        </div>
                        <div class="pay" @click='handelPay'>立即下单</div>
                    </div>
                </div>
        </div>
        
    </div>
</template>


<script>
import {getCartList,deleteCart} from '@/api/cart'
import Sortable from 'sortablejs'
export default {
    name: 'cart',
    data(){
        return{
            cartList:[],
            selectedArr:[],
            orderPrice:0,
            col : [
                    {prop: "productInfo.store_name", label: "商品名称"},
                    {prop: "truePrice", label: "单价"},
                   
                ],
                dropCol : [
                    {prop: "productInfo.store_name", label: "商品名称"},
                    {prop: "truePrice", label: "单价"},
                ],
            "valid": [
            {
                "id": 12,
                "type": "product",
                "product_id": 125,
                "product_attr_unique": "f2c91c3f",
                "cart_num": 10,
                "tetant_id": 2,
                "cart_type": 1,
                "relation_sys_id": null,
                "relation_sys_desc": null,
                "price_details": {
                    "base_price": {
                        "price_per_piece": 7.86, 
                        "price_per_piece_unit": "片",
                        "price_per_package": 7.86,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 131,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "policy_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "preferential_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "contract_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "apply_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "",
                        "price_per_package": 0,
                        "price_per_package_unit": "",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "approve_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "outwarehouse_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "project_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_finish_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "assistantuomprm": 1,
                    "uomarea": 0.06,
                    "prdgag": 10,
                    "uomweight": 1.33,
                    "spec_price": 0,
                    "specyn": 0,
                    "spec_way": "N"
                },
                "generate_info_flag": 0,
                "customer_id": 40726,
                "productInfo": {
                    "id": 125,
                    "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                    "sales": 0,
                    "store_name": "柏林顿",
                    "tetant_id": "2",
                    "attrInfo": {
                        "product_id": 125,
                        "suk": "K00613736TJX,优等,(1)箱",
                        "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                        "unique": "f2c91c3f",
                        "bar_code": "K00613736TJX",
                        "tetant_id": "2",
                        "id": 16411,
                        "ot_price": "7.86",
                        "width": 100,
                        "length": 600,
                        "huansuanbili": 1
                    }
                },
                "truePrice": 5.146,
                "lineno": 1,
                "item_id": "110362",
                "base_level_id": "1",
                "assistant_uom_id": "52"
            },
            {
                "id": 13,
                "type": "product",
                "product_id": 125,
                "product_attr_unique": "f2c91c3f",
                "cart_num": 14,
                "tetant_id": 2,
                "cart_type": 1,
                "relation_sys_id": null,
                "relation_sys_desc": null,
                "price_details": {
                    "base_price": {
                        "price_per_piece": 7.86,
                        "price_per_piece_unit": "片",
                        "price_per_package": 7.86,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 131,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "policy_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "preferential_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "contract_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "apply_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "",
                        "price_per_package": 0,
                        "price_per_package_unit": "",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "approve_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "outwarehouse_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "project_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_finish_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "assistantuomprm": 1,
                    "uomarea": 0.06,
                    "prdgag": 10,
                    "uomweight": 1.33,
                    "spec_price": 0,
                    "specyn": 0,
                    "spec_way": "N"
                },
                "generate_info_flag": 0,
                "customer_id": 40726,
                "productInfo": {
                    "id": 125,
                    "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                    "sales": 0,
                    "store_name": "柏林顿",
                    "tetant_id": "2",
                    "attrInfo": {
                        "product_id": 125,
                        "suk": "K00613736TJX,优等,(1)箱",
                        "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                        "unique": "f2c91c3f",
                        "bar_code": "K00613736TJX",
                        "tetant_id": "2",
                        "id": 16411,
                        "ot_price": "7.86",
                        "width": 100,
                        "length": 600,
                        "huansuanbili": 1
                    }
                },
                "truePrice": 5.246,
                "lineno": 1,
                "item_id": "110362",
                "base_level_id": "1",
                "assistant_uom_id": "52"
            },
            {
                "id": 14,
                "type": "product",
                "product_id": 125,
                "product_attr_unique": "f2c91c3f",
                "cart_num": 16,
                "tetant_id": 2,
                "cart_type": 1,
                "relation_sys_id": null,
                "relation_sys_desc": null,
                "price_details": {
                    "base_price": {
                        "price_per_piece": 7.86,
                        "price_per_piece_unit": "片",
                        "price_per_package": 7.86,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 131,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "policy_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "preferential_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "contract_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "apply_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "",
                        "price_per_package": 0,
                        "price_per_package_unit": "",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "approve_price": {
                        "price_per_piece": 0,
                        "price_per_piece_unit": "片",
                        "price_per_package": 0,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 0,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "outwarehouse_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "project_price": {
                        "price_per_piece": 4.716,
                        "price_per_piece_unit": "片",
                        "price_per_package": 4.716,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 78.6,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "balance_finish_price": {
                        "price_per_piece": 5.046,
                        "price_per_piece_unit": "片",
                        "price_per_package": 5.046,
                        "price_per_package_unit": "(1)箱",
                        "price_per_quaremetre": 84.1,
                        "price_per_quaremetre_unit": "",
                        "is_show": true
                    },
                    "assistantuomprm": 1,
                    "uomarea": 0.06,
                    "prdgag": 10,
                    "uomweight": 1.33,
                    "spec_price": 0,
                    "specyn": 0,
                    "spec_way": "N"
                },
                "generate_info_flag": 0,
                "customer_id": 40726,
                "productInfo": {
                    "id": 125,
                    "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                    "sales": 0,
                    "store_name": "柏林顿",
                    "tetant_id": "2",
                    "attrInfo": {
                        "product_id": 125,
                        "suk": "K00613736TJX,优等,(1)箱",
                        "image": "http://abc.ql.com/uploads/test/2/attach/20200408/44/44592d298e31d5e03ce7b83453c862cd.jpg",
                        "unique": "f2c91c3f",
                        "bar_code": "K00613736TJX",
                        "tetant_id": "2",
                        "id": 16411,
                        "ot_price": "7.86",
                        "width": 100,
                        "length": 600,
                        "huansuanbili": 1
                    }
                },
                "truePrice": 5.346,
                "lineno": 1,
                "item_id": "110362",
                "base_level_id": "1",
                "assistant_uom_id": "52"
            }
        ],
        }
    },
    methods:{
        rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
            // const currRow = _this.cartList.splice(oldIndex, 1)[0]
            // _this.cartList.splice(newIndex, 0, currRow)
            // console.log(_this.cartList[oldIndex])
            // const oldItem = _this.cartList[oldIndex]
            // const newItem= _this.cartList[newIndex]
            
            // _this.$set(_this.cartList,oldIndex,newItem)
            // _this.$set(_this.cartList,newIndex,oldItem)
        }
      })
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
              this.sortable = Sortable.create(wrapperTr, {
                handle:'.allowDrag',
                animation: 180,
                filter: ".ignore-elements",
                preventOnFilter: true,
                delay: 0,
                onEnd: evt => {
                    // console.log(evt.to)
                    if(evt.newIndex>this.col.length){
                        
                        // console.log(evt.newIndex>this.col.length)
                        return
                    }
                    const oldItem = this.dropCol[evt.oldIndex-1]
                    const newItem= this.dropCol[evt.newIndex-1]
                    this.$set(this.dropCol,evt.oldIndex-1,newItem)
                    this.$set(this.dropCol,evt.newIndex-1,oldItem)
                    
                }
              })
    },
        toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            console.log(val)
            this.selectedArr=val;
            this.getOrderPrice()
            
        },
        getCartList(){
            getCartList().then(res=>{
                // this.cartList=res.data.data.valid
                this.cartList=this.valid
            })
        },
        handelDelete(cartId){
            // console.log(cartId)
            let ids=[];
            if (cartId) {
                ids.push(cartId)
            }else{
                this.selectedArr.forEach(item=>{
                    ids.push(item.id)
                })
            }
            this.$confirm('是否删除选中订单?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.deleteCart(ids)
                
                
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });          
            });
        },
        deleteCart(ids){
            deleteCart({
                ids:ids
            }).then(res=>{
                
                if (res.data.status==200) {
                     for(let i=this.cartList.length-1;i>=0;i--){
                        if (ids.indexOf(this.cartList[i].id)!=-1) {
                            this.cartList.splice(i,1)
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message.error(res.data.msg);
                }
               
            })
        },
        add(cartId){
            let index=this.cartList.findIndex(item=>{
                return  item.id==cartId
            })
            this.cartList[index].cart_num++
            this.getOrderPrice()
        },
        desc(cartId){
            let index=this.cartList.findIndex(item=>{
                return  item.id==cartId
            })
            this.cartList[index].cart_num--
            this.getOrderPrice()
        },
        handelInput(val){   
            this.getOrderPrice()
            console.log(val)
        },
        getOrderPrice(){
            let orderPrice=0;
            let selectedId=[];
            this.selectedArr.forEach(item=>{
                orderPrice=orderPrice+item.truePrice*item.cart_num
                // selectedId.push(item.id)
            })
            this.orderPrice=orderPrice
        },
        handelPay(){
            console.log(1)
            if (this.selectedArr.length==0) {
                 this.$message('请至少选择一个商品');
            }else{
                let ids=[]
                this.selectedArr.forEach(item=>{
                    ids.push(item.id)
                })
                let cartId=ids.join(',')
                this.$router.push({
                    path:'/order',
                    query:{
                        cartId:cartId
                    }
                })
            }
        }

    },
    components: {
      
    },
    mounted(){
        this.getCartList()
        this.rowDrop()
    this.columnDrop()
    }
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    padding: 0 12%;
}
.el-table{
    border: 1px solid #ECECEC;
}
.main /deep/.DisabledSelection .cell .el-checkbox__inner{
  margin-left: -30px;
  position:relative;
}
.main /deep/.DisabledSelection .cell:before{
  content:"全选";
  position:absolute;
  right:11px;
}
.main /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #640f14;
    border-color: #640f14;
}

.main /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #640f14;
    border-color: #640f14;
}

.main /deep/.el-checkbox__inner:hover{
    border-color: #640f14;
}

/deep/ .el-table__header-wrapper .el-checkbox__input::after {
    content: '全选';
    position: absolute;
    margin-left: 5px;
}
/deep/ .el-table th>.cell{
    text-align: center;
}
/deep/ .el-table-column--selection .cell{
    text-align: center;
}
.banner{
    width: 108px;
    height: 77px;
    margin-right: 15px;
}
.desc{
    display: flex;
    align-items: center;
    font-size: 16px;
    text-align: center;
}
.single-price{
    font-size: 16px;
    text-align: center;
}
.number-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    border: 1px solid #EEEEEE;
    overflow: hidden;
}
.number-box>span{
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    background-color: #F9FAFB;
    border: 1px solid #EEEEEE;
    cursor: pointer;
    font-size: 20px;
}
.number-box>input{
    width: 80px;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 14px;
    color: #535353
}
.number-box>input:focus{
    border: none;
    outline: 0;
}
.total-price{
    font-size: 16px;
    color: #A5242A; 
    text-align: center;
}
.delete{
    text-align: center;
    font-size: 14px;
    color: #535353;
    cursor: pointer;
}
.all-option{
    width: 100%;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    border: 1px solid #D9D9D9;
    padding-left: 10px;
}
.choose-num{
    font-size: 18px;
    color: #B41D28;
    margin-right: 34px;
}
.delete-all{
    cursor: pointer;
    font-size: 14px;
    color: #535353;
}
.right{
    display: flex;
    font-size: 14px;
    height: 100%;
    align-items: center;
}
.order-price{
    margin-right: 35px;
    color: #535353;

}
.order-price>div:first-child{
    font-size: 24px;
    color: #A5242A;
    margin-bottom: 10px;
}
.pay{
    width: 220px;
    height: 100%;
    background-color: #A5242A;
    font-size: 20px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
