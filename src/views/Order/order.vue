<template>
    <div class="order">
        <div class="order-info">
                <div class="order-item">
                    <div class="order-address">
                        <span class="order-item-name" >收货地址</span>
                        <div class="address">
                            <div class="address-info">
                                <div class="person-info">
                                    <span class="get-name">{{addressInfo.real_name}}</span> 
                                    <span class="get-phone">{{addressInfo.phone}}</span> 
                                    <span class="type">（默认）</span> 
                                </div>
                                <p class="get-address">
                                {{addressInfo.province}}
                                {{addressInfo.city}}
                                {{addressInfo.district}}
                                {{addressInfo.detail}}
                                </p>
                            </div>
                            <div class="change-address" @click="showForm">更换地址</div>
                        </div>
                    </div>
                    <div class="order-person">
                        <span class="order-item-name">提货人</span>
                        <el-input v-model="requireData.contact" placeholder="请输入内容"></el-input>
                        <span class="order-item-name">提货人电话</span>
                        <el-input v-model="requireData.contactsTel" placeholder="请输入内容"></el-input>
                        <span class="order-item-name">提货方式</span>
                        <div class="get-method">
                            <el-radio-group v-model="requireData.takeGoodsStyle">
                                <el-radio :label="1">自提</el-radio>
                                <el-radio :label="2">委托</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="order-market">
                        <span class="order-item-name">备注</span>
                        <el-input
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="requireData.mark"
                          resize="none">
                        </el-input>
                    </div>
                </div>

                <div class="order-item" style="text-align: left;">
                    <span class="order-item-name" >商品详情</span>
                    <ul class="product-list">
                        <li v-for='item in orderInfo.cartInfo'>
                            <img :src="'http://m.qlzxb.cn/newapp/get_img/name/'+item.productInfo.store_name">
                            <p class="product-info">
                            {{item.productInfo.store_name}} 
                            {{item.productInfo.attrInfo&&item.productInfo.attrInfo.suk}}
                            </p>
                            <span class="price">单价:{{item.truePrice}}元 x{{item.cart_num}}</span>
                            <span class="total-price">小计{{item.truePrice*item.cart_num|toFixed}}元</span>
                        </li>
                    </ul>
                </div>

                <div class="order-item">
                    <div class="order-option">
                        <div>
                            <span class="order-item-name">选取配置</span>
                            <el-select  placeholder="请选择活动区域" v-model="place">
                              <el-option 
                                    v-for='item in config.warehouseAreas'
                                    :label="item.DELIVERY_WAREHOUSE" 
                                    :value="item.warehouse_id" 
                                    :key="item.warehouse_id"
                                  ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="order-item-name">结算方式</span>
                            <el-select  placeholder="请选择活动区域" v-model="payType">
                              <el-option
                                    v-for='item in config.balances'
                                    :label="item.balance_type_name" 
                                    :value="item.base_balance_type_id" 
                                    :key="item.base_balance_type_id"
                                  ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="order-item-name">选择需求日期</span>
                            <div class="date-box">
                                <el-date-picker
                                  v-model="requireData.requiredate"
                                  type="date"
                                  placeholder="选择日期"
                                  value-format="yyyy/MM/dd">
                                </el-date-picker>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="order-item">
                    <span class="order-item-name">结算金额</span>
                    <div class="order-price">
                        <!-- <div class="product-num">商品数量：<span>2</span></div> -->
                        <div class="product-total">商品总价：
                            {{orderInfo.priceGroup&&orderInfo.priceGroup.totalPrice}}<span></span></div>
                        <!-- <div class="order-discount">折扣申请：<span></span></div> -->
                        <div class="order-pay">实际支付：
                            <span>{{orderInfo.priceGroup&&orderInfo.priceGroup.totalPrice}}
                            </span>
                        </div>
                        <div class="order-btn">
                            <div class="cancel-order">取消订单</div>
                            <div class="pay-order" @click='createRequire'>立即下单</div>
                        </div>
                    </div>
                </div>
            </div>
           <el-dialog title="" :visible.sync="dialogFormVisible">
              
                <span class="address-title">添加收货地址</span>
                <div class="address-item">
                    <span>收货人姓名*</span>
                    <input type="" name="">
                </div>
                <div class="address-item">
                    <span>手机号码*</span>
                    <input type="" name="">
                </div>
                <div class="address-item">
                    <span>选择区域*</span>
                    <el-cascader
                      size="large"
                      :options="options"
                      v-model="selectedOptions"
                      placeholder="省/市/区"
                      @change="handleChange">
                    </el-cascader>
                </div>
                <div class="address-item">
                    <span>详细地址</span>
                    <input type="" name="">
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button >取 消</el-button>
                    <el-button type="primary" >确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>


<script>
import { getConfirmRequire,createRequire } from '@/api/order'
import { getConfig,getCustomerInfo} from '@/api/member'
import { regionData } from 'element-china-area-data'
export default {
    name: 'order',
    data(){
        return{
            cartId:'',
            orderInfo:{},
            addressInfo:{},
            payType:'',
            config:{},
            storeInfo:{},
            productValue:[],
            place:'',
            selectedId:0,
            price:{},
            pcAttrSelect:{
                "warehouseid": "",
                "warehousecode": "",
                "warehousevalue": ""
            },
            requireData:{
                addressId:'',
                payType:'yue',
                mark:'',
                from:'pc',
                real_name:'',
                phone:'',
                uid:'',
                customerInfo:{},
                requireDate:'',
                takeGoodsWarehouse:{},
                balanceType:{},
                takeGoodsStyle:1,
                contact:'',
                contactsTel:'',
                uid:'',
                store_id:''
            },
            dialogFormVisible: false,
            options: regionData,
            selectedOptions: []
        }
    },
    components: {
      
    },
    methods:{
        getConfirmRequire(){
            getConfirmRequire({
                cartId:this.cartId
            }).then(res=>{
                if (res.data.status==200) {
                    this.orderInfo=res.data.data
                    this.addressInfo=res.data.data.addressInfo
                    this.requireData.addressId=this.addressInfo.id
                    this.requireData.real_name=this.addressInfo.real_name
                    this.requireData.phone=this.addressInfo.phone
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
                
           })
        },
        getCustomerInfo(){
            getCustomerInfo().then(res=>{
                this.requireData.customerInfo=res.data.data
            })
        },
        showForm(){
            this.dialogFormVisible=true
        },
        handleChange (value) {
            console.log(value)
        },
        createRequire(){
            let key=this.orderInfo.orderKey;
            createRequire(key,this.requireData).then(res=>{
                if (res.data.status==200) {
                    this.$message({
                      message: '下单成功',
                      type: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.replace('/personal')
                    },2000)
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        }
    },
    mounted(){
        this.cartId=this.$route.query.cartId
        this.getConfirmRequire()
        this.getCustomerInfo()
        this.getConfig()
    },
    computed:{
        userInfo(){
            return this.$store.state.user.userInfo
        }
    },
    watch:{
        config(curval,oldval){
            
            console.log(curval.config_json.balancetypevalue)
            let value={
                'keyid':curval.config_json.balancetypevalue,
                'text':curval.config_json.balancetypevaluetext
            }
            this.requireData.balanceType=value;
            
        },
        place(curval,oldval){
            const warehouseAreas=this.config.warehouseAreas;
            let area=warehouseAreas.filter(item=>{
                return item.warehouse_id==curval
            })[0]
            let warehouse=area;
            this.pcAttrSelect.warehouseid=area.warehouse_id;
            this.pcAttrSelect.warehousecode=area.warehouse_code;
            this.pcAttrSelect.warehousevalue=area.DELIVERY_WAREHOUSE;
            this.requireData.takeGoodsWarehouse=this.pcAttrSelect
        },
        payType(curval,oldval){
            const balances=this.config.balances;
            let pay=balances.filter(item=>{
                return item.base_balance_type_id==curval
            })[0]
            let value={
                'keyid':pay.base_balance_type_id,
                'text':pay.balance_type_name
            }
            this.requireData.balanceType=value
            
        },
        pcAttrSelect:{
            
        },
        userInfo:{
            handler:function(curval,oldval){
                this.requireData.uid=this.userInfo.uid
                this.requireData.store_id=this.userInfo.store_id
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss" scoped>
.order{
    width: 100%;
    padding: 0 15%;
}
.order-info{
    width: 100%;
    border: 2px solid #eee;
    margin-top: 25px;
    padding: 0 0;
}
.order-item{
    padding:15px 30px 15px;
    border-bottom: 2px solid #eee;
}
.order-address{
    display: flex;
    align-items: center;
}
.address{
    display: flex;
    align-items: center;
    background-color: #F9FAFB;
    padding: 20px;
}

.order-item-name{
    margin-right: 30px;
    font-size: 20px;
}
.change-address{
    width: 95px;
    line-height: 35px;
    text-align: center;
    margin-left: 90px;
    background-color: #084AFB;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}
.person-info{
    font-size: 20px;
    color: #535353;
    margin-bottom: 10px;
}
.person-info .type{
    color: #A5242A;
}
.get-address{
    text-align: left;
    margin-top: 8px;
}
.address-value{
    font-size: 14px;
}
.order-person{
    display: flex;
    align-items: center;
    margin-top: 23px;
}
.order-person>span{
    margin-right: 20px;
}
.order-market{
    display: flex;
    align-items: flex-start;
    margin-top: 25px;
}
.order-market>span{
    margin-right: 35px;
}
.order-market>textarea{
    width: 800px;
    height: 100px;
    font-size: 20px;
    padding-left: 10px;
    resize: none;
}
.product-list{
    width: 100%;
    margin-top: 15px; 
}
.product-list>li{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #535353;
    margin-bottom: 25px;
}
.product-list>li:last-child{
    margin-bottom: 0px;
}
.product-list>li>img{
    width: 73px;
    height: 52px;
}
.product-info{
    width: 40%;
    padding-left: 20px;
}
.order-option{
    display: flex;
    align-items: center;
}
.order-option>div{
    display: flex;
    align-items: center;
}
.price{
    width: 20%;
    text-align: center;
}
.total-price{
    width: 20%;
    text-align: center;
}
.btn-group{
    margin-right: 50px;
}
.btn-group>button{
    width: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.order-price{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 18px;
}
.order-price>div{
    margin: 6px 0;
}
.order-btn{
    display: flex;  
    margin: 30px 0!important;
}
.order-btn>div{
    line-height: 54px;
    color: #FFFFFF;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
}
.cancel-order{
    width: 165px;
    background-color: #E5E5E5;
    margin-right: 25px;
}
.pay-order{
    width: 284px;
    background-color: #A5242A;
}
.order-pay{
    color: #A5242A;
}
.order-pay span{
    font-weight: bold;
}
.order-person/deep/.el-input{
    width: 22%;
    margin-right: 15px;
}
.order-person/deep/.el-radio__label{
    font-size: 14px;
}
.order-person/deep/.el-radio__inner{
    width: 16px;
    height: 16px;
}
/deep/.el-radio__input.is-checked .el-radio__inner{
    background-color:#A5242A; 
    border-color:#A5242A;
}
/deep/.el-radio__input.is-checked+.el-radio__label{
    color: #A5242A;
}
/deep/.el-textarea{
    width: 80%;
    height: 100px;
}
/deep/.el-textarea textarea{
    height: 100px;
}
.order-option/deep/.el-input{
    width: 100%;
}
.order-option/deep/.el-select{
    width: 50%;
}
.address-title{
    display: block;
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 30px;
    color: #535353;
}
.address-item{
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 20px;
    border: 2px solid #EEEEEE;
    padding: 2px 16px;
    padding-right: 0;
    margin-bottom: 15px;
}
.address-item>span{
    color: #A0A0A0
}
.address-item>input{
    height: 100%;
    margin-left: 20px;
    padding-right: 10px;
    font-size: 20px;
    flex: 1;
    border: none;
    text-align: right;
}
.address-item .el-cascader{
    flex: 1;
}
.address-item/deep/.el-input__inner{
    border: none;
    text-align: right;
     font-size: 20px;
}
</style>
