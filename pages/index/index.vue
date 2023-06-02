<template>
	<view class="content1">
		<view class="outputbox">
			<view v-for="(item,index) in data">

				<view v-if="item.filename">
					<button @click="openUrl(item)" >	{{item.filename}}</button>
					
				</view>
			</view>

					
		</view>
		

		
		<form @submit="onSubmit" class='inputbox'>  
			<view class="input">
				<input class="uni-input" name='inputcode' maxlength="11"  placeholder="请输入11位板件编码" :value="barcode"  />
				<image class="code" @click="scan" src="../../static/scanonescan.png" mode=""></image>
			</view>
			<button form-type="submit" type="primary">提交</button>  
		</form>  

		


	</view> 

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				data:'1',
				url:'',
				barcode:'',
				msg:'',
				scancode:''
				
			}
		},
		onLoad() {
			
		},
		methods: {
			openUrl(res){
				console.log(res.path)
				this.url=res.path
				uni.navigateTo({
					
					url:`/components/webview/webview?url=${this.url}`
				})
			},
			scan() {
							uni.scanCode({
								success: (res) => {
									console.log(res);
									this.scancode=res.result;
									this.barcode=res.result
									
								}
							})
					},
					
			onSubmit(inputcode){
				if(inputcode.detail.value.inputcode.length==11 ){
					this.barcode=inputcode.detail.value.inputcode
					var url=`https://www.mochenhome.com/findcad/${this.barcode}`
					console.log(url)
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url:url,
						success: (res) => {
							console.log(res)
							this.data=res.data
							uni.hideLoading()
							
						}
					})
				}
				else if(this.scancode.length==11){
					var url1=`https://www.mochenhome.com/findcad/${this.scancode}`
					console.log(url1)
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url:url1,
						success: (res) => {
							// console.log(res)
							this.data=res.data
							uni.hideLoading()
							
							
						}
					})
				}
				else{
					uni.showToast({
						title:"请输入正确的编码",
						icon:"error"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.content1{
			position: absolute;
			display: flex;
			flex-direction: column;
			border-width:1;
			border-style:solid red 1px;
			border-color:#000000;
			height: 100%;
			width: 100%;
			background-color: #cccccc;
			justify-content: center;
			align-items: center;
			
	}
	.inputbox{
		padding: auto;
	}
	.input {
		
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
		
	}
	.outputbox{
		
		height: 50%;
		width: 62%;
		// background-color:  hsla(40, 10%, 25%, 0.20);
		border-radius: 15rpx 15rpx;
	}
	.uni-input{
		margin: 10rpx,10rpx;
		height: 80rpx;
		width: 100%;
		background-color: white;
		border-radius: 10rpx 10rpx;
		border-style:solid yellow 1px;
		border-color: yellow;
		

	}
	.code{
		height: 100rpx;
		width: 100rpx;
		
	}
	.logo {

		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.box {

		background-color: pink;
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		// color: #8f8f94;
	}
</style>
