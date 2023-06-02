<template>
	<view class="bigbox">
		<view class="message" v-model="message1">{{message1}}</view>
		<view class="scanbutton">
			<image  src="../../static/icon/scancode.png" mode="aspectFit" @click="scanbar"></image>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message1:'请点击下面按钮查询真伪!支持板件编码和包装编码。',
			};
		},
		methods:{
			// 调用摄像头扫码
			scanbar(){
				uni.scanCode({
					success:(res)=>  {
						console.log(res);
						if(res.result){
							var url1=`https://www.mochenhome.com/queryauth/${res.result}`

							console.log(this.message1)
							uni.showLoading({
								title: '加载中'
							});
							uni.request({
								url:url1,
								success: (e) => {
									console.log(this.message1)
									this.message1=e.data.message
									console.log(this.message1)
									uni.hideLoading()
									},
									})
							
				
						}

					}
				})

			}
		}
	}


</script>

<style lang="scss">
	.bigbox{
		// background-color: #a66222;
		position: absolute;
		display: flex;
		flex-direction: column;
		// margin-top: 50%;
		width: 100%;
		height: 100%;
	}
	.scanbutton{
		// background-color: #555322;
		display: flex;
		flex-direction: column;
		width: 100%;
		
		align-content:center;
		justify-content:center;
		align-items: center;
		align-self: center ;

	}
	.message{
		// background-color: #555322;
		display: flex;
		height: 30%;
		justify-content:center;
		align-items: center;
		align-self: center ;
		font-size: 50rpx;
	}

</style>
