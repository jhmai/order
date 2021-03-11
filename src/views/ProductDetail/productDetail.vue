<template>
    <div class="productDetail">
        <div class="main row">
            <el-row :gutter="20">
              <el-col :span="12">
                  <div class="detail-left col-md-6">
                    <div class="banner-box">
                        <div class="banner">
                            <img :src="storeInfo.image">
                        </div>
                        <!-- <div class="banner-list">
                            <div class="scroll-left scroll-icon">
                                <img src="./images/left.png">
                            </div>
                            <div class="scroll-right scroll-icon">
                                <img src="./images/right.png">
                            </div>
                            <div class="photo">
                                <img src="./images/banner.png">
                                <img src="./images/banner.png">
                                <img src="./images/banner.png">
                                <img src="./images/banner.png">
                                <img src="./images/banner.png">
                                <img src="./images/banner.png">
                            </div>
                        </div> -->
                    </div>
                    
                </div>
              </el-col>
              <el-col :span="12">
                  <div class="detail-right col-md-6">
                        <div class="detail-title">{{storeInfo.store_name}}</div>
                        <span class="detail-size"></span>
                        <div class="price-list">
                            <div>
                                <span>折扣</span>
                                <span class="discount">{{price.reRate}}</span>
                            </div>
                            <div>
                                <span>原价</span>
                                <span class="cost-price">{{price.base_price&&price.base_price.price_per_piece}}元/单片</span>
                            </div>
                            <div>
                                <span class="average-price">单片价</span>
                                <span>{{price.base_price&&price.balance_finish_price.price_per_piece}}元/单片</span>
                            </div>
                        </div>
                        <div class="total-price">
                            <span>结算终价</span>
                            <p>{{price.balance_finish_price&&price.balance_finish_price.price_per_package}}
                                /{{price.price_per_package_unit}}
                            </p>
                        </div>
                        <el-form ref="form" label-width="80px">
                            <span>提货地点</span>
                            <el-form-item>
                                <el-select  placeholder="请选择提货地点" v-model="place" popper-class='select'>
                                  <el-option 
                                    v-for='item in config.warehouseAreas'
                                    :label="item.DELIVERY_WAREHOUSE" 
                                    :value="item.warehouse_id" 
                                    :key="item.warehouse_id"
                                  ></el-option>
                                </el-select>
                            </el-form-item>
                            <span>结算方式</span>
                            <el-form-item>
                                <el-select  placeholder="请选择结算方式" v-model="payType" popper-class='select'>
                                  <el-option
                                    v-for='item in config.balances'
                                    :label="item.balance_type_name" 
                                    :value="item.base_balance_type_id" 
                                    :key="item.base_balance_type_id"
                                  ></el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-form>

                        <div class="size product-attr">
                            <span>商品规格</span>
                            <ul class="size-list" aria-labelledby="dLabel" style="width: 100%;">
                                <li 
                                    v-for='(item,key) in productValue' 
                                    :key='item.unique' 
                                    :class="[selectedId==key?'actived':'']"
                                    @click='chooseSize(key)'
                                    >{{item.suk}}</li>
                            </ul>
                            
                        </div>
                        <div class="number product-attr">
                            <span>请输入购买数量</span>
                            <!-- <div class="number-box">
                                <span class="desc-btn" @click='desc'>-</span>
                                <input type="number" min="1" name="" v-model='addCartParam.cartNum' class="number-value">
                                <span class="add-btn" @click='add'>+</span>
                            </div> -->
                            <number-box @desc='desc' @add='add'></number-box>
                        </div>  
                        <div class="date product-attr">
                            <span>需求日期</span>
                            <div class="date-box">
                                <el-date-picker
                                  v-model="addCartParam.requiredate"
                                  type="date"
                                  placeholder="选择日期"
                                  value-format="yyyy/MM/dd">
                                </el-date-picker>
                            </div>
                            
                        </div>  
                        <div class="option">
                            <!-- <div class="buy">立即购买</div> -->
                            <div class="addcart" @click='addCart'>
                                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                <span>加入购物车</span>
                            </div>
                        </div>
                    </div>
              </el-col>
            </el-row>
            
            
        </div>
    </div>
</template>


<script>
import { getProductDetail } from '@/api/product'
import { getConfig,getCustomerInfo} from '@/api/member'
import { getPrice } from '@/api/order'
import { addCart } from '@/api/cart'
import numberBox from '@/components/numberBox'
export default {
    name: 'productDetail',
    data(){
        return{
            paramas:{
                id:''
            },
            place:'',
            payType:'',
            config:{},
            storeInfo:{},
            productValue:[],
            selectedId:0,
            price:{},
            pcAttrSelect:{
                "balanceid": "",
                "balancevalue": "",
                "warehouseid": "",
                "warehousecode": "",
                "warehousevalue": ""
            },
            addCartParam:{
                "productId":'',
                "cartNum":1,
                "new":0,
                "uniqueId":'',
                "priceDetails":{},
                "requiredate": '',
                "attrPersonConfig":{
                    "pcAttr": false,
                    "pcAttrSelect": {},
                    "warehouse": {
                        // "warehouse_id": "7434",
                        // "warehouse_code": "S01",
                        // "DELIVERY_WAREHOUSE": "沈阳区域仓"
                    },
                    "warehouseList": [],
                    "value": {
                        "keyid": "",
                        "text": ""
                    },
                    "showPicker": false,
                    "columns": [],
                    "isDisplayPerConf": false,
                    "displayOrHidePerConfText": "显示配置",
                    "displayOrHidePerConfType": "primary",
                    "customerInfo": {},
                    "outpercent": 0
                }
            }
        }
    },
    components: {
      numberBox
    },
    methods:{
        getProductDetail (){
            getProductDetail(this.paramas.id).then(res=>{
                // console.log(res.data.data)
                const info=res.data.data
                
                try{
                    
                    this.storeInfo=info.storeInfo
                    this.productValue=info.productValue
                    this.selectedId=Object.keys(this.productValue)[0] 
                    this.addCartParam.uniqueId=this.productValue[this.selectedId].unique
                }catch{
                    console.log(1)
                }
                
                
                this.getConfig()
           })
        },
        desc(val){
            if (this.productNum<=1) {
                return
            }
            this.addCartParam.cartNum=val
            this.getPrice()
        },
        add(val){
            this.addCartParam.cartNum=val
            this.getPrice()
        },
        chooseSize(id){
            this.selectedId=id
            this.addCartParam.uniqueId=this.productValue[this.selectedId].unique
            this.getPrice()
        },
        getPrice(){
            let index=this.config.warehouseAreas.findIndex(item=>{
                return item.warehouse_id==this.place
            })
            let placeCode=this.config.warehouseAreas[index].warehouse_code

            getPrice({
                p_Item_sku:this.selectedId,
                p_OrderQty:this.addCartParam.cartNum,
                p_Out_WarehouseCode:placeCode
            }).then(res=>{
                // console.log(res.data.data.pricegroupdata)
                if(res.data.status==200){
                    this.price=res.data.data.pricegroupdata
                    this.addCartParam.priceDetails=this.price
                }else{
                    this.$message.error(res.data.msg)
                }
                
            })
        },
        getConfig(){
            getConfig().then(res=>{
                // console.log(res)
                this.config=res.data.data
                this.payType=res.data.data.config_json.balancetypevalue
                this.place=res.data.data.config_json.warehouseid
                this.getPrice()
           })
        },
        getCustomerInfo(){
            getCustomerInfo().then(res=>{
                this.addCartParam.customerInfo=res.data.data
            })
        },
        addCart(){
            addCart(this.addCartParam).then(res=>{
                console.log(res)
                if (res.status==200) {
                    this.$store.dispatch('cart/getCartNum').then(res=>{
                        this.$message({
                          message: '加入购物车成功',
                          type: 'success',
                          offset:'300'
                        });
                    })
                    
                }
            })
        }
    },
    mounted(){
       this.paramas.id=this.$route.params.id;
       this.addCartParam.productId=this.$route.params.id;
       this.paramas.keyword=this.$route.params.keyword;
       this.getProductDetail()
       this.getCustomerInfo()
    },
    watch:{
        config(curval,oldval){
            this.addCartParam.columns=curval.balances
            this.addCartParam.warehouseList=curval.warehouseAreas
            console.log(curval.config_json.balancetypevalue)
            let value={
                'keyid':curval.config_json.balancetypevalue,
                'text':curval.config_json.balancetypevaluetext
            }
            this.addCartParam.value=value
        },
        place(curval,oldval){
            const warehouseAreas=this.config.warehouseAreas;
            let area=warehouseAreas.filter(item=>{
                return item.warehouse_id==curval
            })[0]
            let warehouse=area;
            this.addCartParam.warehouse=warehouse
            this.pcAttrSelect.warehouseid=area.warehouse_id;
            this.pcAttrSelect.warehousecode=area.warehouse_code;
            this.pcAttrSelect.warehousevalue=area.DELIVERY_WAREHOUSE;
        },
        payType(curval,oldval){
            const balances=this.config.balances;
            let pay=balances.filter(item=>{
                return item.base_balance_type_id==curval
            })[0]
            this.pcAttrSelect.balanceid=pay.base_balance_type_id;
            this.pcAttrSelect.balancevalue=pay.balance_type_name
            let value={
                'keyid':pay.base_balance_type_id,
                'text':pay.balance_type_name
            }
            this.addCartParam.value=value
        },
        pcAttrSelect:{
            handler:function(curval,oldval){
                this.addCartParam.attrPersonConfig.pcAttrSelect=curval
            },
            deep:true
        }
    },
    beforeRouteLeave (to,from,next){
        // console.log(1)
        if (to.name!='productList') {
            this.$store.commit('noKeepAlive','productList')
            
        }
        next()
    },
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    padding: 0 12%;
}
.status>div{
    display: flex;
    align-items: center;
}
.status img{
    width: 4px;
    height: 7px;
    margin: 0 8px;
}
.detail-left{
    padding-top: 25px;
}
.banner-box{
    width: 95%;
}
.banner{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.banner>img{
    width: 100%;
    height: auto;
    max-height: 250px;
}
.banner-list{
    position: relative;
    width: 100%;
}
.scroll-icon{
    width: 15.5px;
    height: 21.5px;
}
.scroll-icon>img{
    width: 13.5px;
    height: 19.5px;
}
.scroll-left{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
.scroll-right{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.photo{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    margin-top: 8px;
    -ms-overflow-style: none;
}
.photo::-webkit-scrollbar {display:none}
.photo>img{
    width: 96px;
    height: 55px;
    margin-right: 8px;
}
.detail-title{
    font-size: 26px;
    color: #535353;
    margin-top: 21px;
    margin-bottom: 20px;
    text-align: left;
}
.detail-size{
    font-size: 16px;
    color: #757575;
}
.price-list{
    margin-top: 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.price-list>div{
    padding: 0 10px;
    min-width: 90px;
    height: 93px;
    background-color: #F9F9FB;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #535353;
    margin-right: 5px;
    margin-bottom: 5px;
}
.price-list>div>span:first-child{
    font-size: 24px;
    display: block;
    margin-bottom: 8px;
}
.price-list>div>span:last-child{
    font-size: 14px;
}
.total-price{
    font-size: 16px;
    color: #A5242A;
    margin-top: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #EEEEEE;
    text-align: left;
}
.total-price>span{
    margin: 5px 0;
    display: block;
}
.total-price>p{
    margin-bottom: 2px;
}
.product-attr{
    margin-top: 20px;
}
.product-attr>span{
    text-align: left;
}
.product-attr button{
    font-size: 16px;
}
.product-attr li{
    font-size: 16px;
}
.place>span{
    font-size: 12px;
    color: #535353;
}
#dLabel{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border: 2px solid #EEEEEE;
}
.caret{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 6px dashed #8C8C8C;
    border-right: 6px solid transparent;
    border-left: 7px solid transparent;
}
#dLabel:focus{
    outline:0;
    border: 2px solid #B41D28;
    color: #B41D28;
}
.product-attr>span{
    margin-bottom: 12px;
    display: block;
    font-size: 18px;
}
.product-attr .dropdown-menu{
    width: 280px;
    max-width: 280px;
}
.place>.dropdown{
    display: flex;
    align-items: center;
}
.product-num{
    flex-shrink: 0;
    margin-left: 25px;
    color: #A5242A;

}
.size-list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
}
.size-list>li{
    width: 250px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 2px solid #EEEEEE;
    color: #ABABAB;
    font-size: 18px;
    margin-right: 10px;
    margin-bottom: 8px;
    cursor:pointer
}
.size-list>li:nth-child(2n){
    margin-right: 0;
}
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
.menu{
    max-height: 300px;
    overflow-y: scroll;
}
.menu>li{
    cursor: pointer;
    margin: 8px 0;
}
.menu>li:hover{
    color: #A5242A;
}
.size-list>li.actived{
    border: 2px solid #B41D28;
    color: #B41D28;
}
.isespecially {
    display: flex;
    align-items: center;
}
.isespecially-box{
    margin-left: 50px;
}
.isespecially-box>label{
    margin-right: 50px;
    font-size: 20px;
    color: #535353;
    font-weight: 500;
}
.isespecially-box>label>input{
    margin-right: 10px;

}
input[type=radio] {
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 15px;
  height: 12px;
  position: relative;
}

input[type=radio]:after {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  content: " ";
  background-color: #fff;
  border: 1px solid #EEEEEE;
  color: #fff;
  display: inline-block;
  visibility: visible;
}

input[type=radio]:checked:before {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  content: " ";
  background-color: #B41D28;
  border: 1px solid #EEEEEE;
  color: #fff;
  display: inline-block;
  visibility: visible;
  box-sizing: border-box;
  z-index: 999;
}
.date-value{
    width: 210px;
    height: 38px;
    border: 2px solid #EEEEEE;
    font-size: 18px;
    color: #535353
}
.date-value:focus{
    outline: 0;
    border: 2px solid #B41D28!important;
}
.date-value:hover{
    border: 2px solid #B41D28;
}
 input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance: none !important;
}
 /* 火狐浏览器样式清除 */
input[type="number"]{
    -moz-appearance:textfield;
}
.result{
    width: 500px;
    height: auto;
    background-color: #F9F9FB;
    padding: 25px;
    margin-top: 30px;
}
.result-product{
    width: 100%;
    border-bottom: 2px solid #EEEEEE;
}
.result-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #535353;
    margin-bottom: 8px;

}
.result-total{
    padding-top: 20px;
    color: #A5242A;
    font-size: 24px;
    font-weight: bold;
}
.option{
    width: 100%;
    display: flex;
    align-items: center;
    height: 54px;
    margin-top: 25px;
    margin-bottom: 25px;
}
.option>div{
    text-align: center;
    line-height: 54px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
}
.buy{
    width: 284px;
    background-color: #A5242A;
    margin-right: 10px;

}
.addcart{
    width: 163px;
    background-color: #B0B0B0;
}
.date-box{
    text-align: left;
}
.el-form{
    text-align: left;
    margin-top: 25px;
}
.el-select{
    width: 252px;
}
.main/deep/.el-input__inner{
    border: 2px solid #EEEEEE;
    font-size: 16px;
}
.el-select-dropdown__item{
    font-size: 16px;
}
.el-input{
    border: none;
}
.main/deep/.el-form-item__content{
    margin-left: 0!important;
    margin-top: 15px;
}
.main/deep/.el-select .el-input.is-focus .el-input__inner{
    border-color: #B41D28;
}
.select .selected{
    color: #B41D28!important;
}

</style>
