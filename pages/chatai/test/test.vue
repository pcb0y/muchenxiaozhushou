<template>
    <view class="T-Service">
        <view class="t-content">
            <scroll-view scroll-y="true" :scroll-into-view="scrollInto"  >
                <view v-for="(item,index) in msg" :id="'s'+item.id+index" :class="['t-record',item.id!=userid?'t-other':'t-self']" v-if="item.id!==0" >
                    <image class="t-avatar" :src="item.avatar"></image>
                    <view class="t-msg">{{item.msg}}</view>
                    <view class="clear"></view>
                </view>
                <view class="t-system" :id="'s'+item.id + index" v-else>
                    {{item.msg}}
                </view>
            </scroll-view>
        </view>
        <view class="t-bottom">
            <view class="t-input">
                <input type="text" @confirm="sendMsg" v-model="value" />
            </view>
            <view class="t-picture">
                <image src="/static/icon/chatgpt.png" mode=""></image>
            </view>
            <view class="t-send" @tap="sendMsg" >发送</view>
        </view>
    </view>
</template>

<script>
    export default {
        name:"service",
        /**以下皆为模拟数据*/
        data() {
            return {
                scrollInto:"",  // scroll-into-view的值
                value:"",  // 输入框信息
                userid:345, // 当前用户id
                avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-eb34e233cdd85a2e1a400ec7ef31272e_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619766863&t=b0fa5a217f6cac4ef199b2fd32707590",
                        
                msg:[
                    {
                        id:0, // id 为0  系统信息
                        msg:"客服为您服务"
                    },
                    // 模拟数据
                    {
                        id:123,
                        avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-fce4f8a778fe3f24bca2cafc709b6847_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619766618&t=0891cc338cc6386b0e25a23db990fd31",
                        msg:"您好",
                    },
                    {
                        id:345,
                        avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-eb34e233cdd85a2e1a400ec7ef31272e_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619766863&t=b0fa5a217f6cac4ef199b2fd32707590",
                        msg:"你好!"
                    }
                ]
            };
        },
        methods:{
            // 发送消息
            // websocket
            sendMsg(){
                let {userid,value,avatar} = this;
                // 模拟数据
                let opt = {
                    id:userid,
                    avatar,
                    msg:value
                }
                let $this = this;
                if(!value)return uni.showToast({
                    title:"请输入您要咨询的内容!",
                    icon:"none"
                })
                // 用api发送数据到socket服务器
                // 由于后端api还没下来 就先放promise里面了
                return new Promise((resolve,reject)=>{
                    // 发送数据
                    this.msg.push(opt);
                    // 清除输入框
                    this.value = "";
                    // 成功后的回调
                    resolve("success");
                    $this.setScroll(userid);
                    $this.getMsg();
                })
                
            },
            // 接收消息
            getMsg(){
                // 使用websocket接收消息
                // 由于服务器暂未配置
                // 所以用settimeout来模拟
                let {value} = this;
                let avatar = "/static/icon/chatgpt.png";
                
                let opt = {
                    id:123,
                    avatar,
                    msg:"你好"
                };
                let msg = this.msg;
                let $this = this;
                setTimeout(()=>{
                    msg.push(opt);
                    $this.setScroll(opt.id);
                },1000)
            },
            /**
             * @param {type} id 用户id或者消息id皆可 用来保证数据的不一致性
             * @description  保持最新消息显示在最底下
             * */
            setScroll(id){
                let len = this.msg.length;
                this.scrollInto = 's'+id+(len-1);
            }
            
        },
        components:{
            
        }
    }
</script>

<style lang="scss">
    .T-Service{
        background-color: #F5F5F5;
        height: 100vh;
        overflow: hidden;
        .t-content{
            height: calc(100% - 100upx);
            /* #ifdef H5*/
            height: calc(100% - 100upx - 88upx);
            /* #endif */
            scroll-view{
                height: calc(100% - 64upx);
                width: calc(100% - 64upx);
                // text-align: center;
                padding: 32upx;
                .t-system{
                    // display: inline-block;
                    color: #9AA0A8;
                    background-color: #E8E8E8;
                    max-width: 90%;
                    border-radius: 40upx;
                    padding: 4upx 24upx;
                    margin: 24upx auto;
                    text-align: center;
                }
                .t-avatar{
                    width: 80upx;
                    height: 80upx;
                    border-radius: 50%;
                    image{
                        width: 100%;
                        height: 100%;
                    }
                }
                
                .t-record{
                }
                .t-self{
                    .t-avatar{
                        float: right;
                    }
                    .t-msg{
                        float: right;
                        background-color: #FD9500;
                        border-radius: 20upx 0upx 20upx 20upx;
                        margin-right: 12upx;
                    }
                }
                .clear{
                    float: none !important;
                    clear: both;
                }
                .t-msg{
                    margin-top: 24upx;
                    padding: 24upx 32upx; 
                    max-width: 75%;
                }
                
                .t-other{
                    .t-avatar{
                        float: left;
                    }
                    .t-msg{
                        background-color: white;
                        float: left;
                        background-color: white; 
                        margin-left: 12upx;
                        border-radius: 0upx 20upx 20upx 20upx;
                    }
                    
                }
            }
        }
        .t-bottom{
            transition: 200ms;
            height: 100upx;
            background-color: white;
            border-top: 1px solid #eee;
            display: flex;
            align-items: center;
            padding: 20upx 32upx;
            justify-content: space-between;
            .t-input{
                width: 70%;
                height: 60upx;
                border-radius: 30upx;
                background-color: #f5f5f5;
                input{
                    width: calc(100% - 2em);
                    height: 100%;
                    margin-left: 1em;
                }
            }
            .t-picture{
                width: 50upx;
                height: 50upx;
                // margin-right: 20upx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
            .t-send{
                background-color: #19be6b;
                color: #fff;
                padding: 10upx 20upx;
                border-radius: 10upx;
                justify-self: flex-end;
            }
        }
    }
</style>