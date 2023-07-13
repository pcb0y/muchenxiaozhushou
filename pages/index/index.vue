<template>
	<view class="content1">
		<form @submit="onSubmit" class='inputbox'>
			<view class="input">
				<input class="uni-input" name='inputcode' maxlength="11"  placeholder="请输入11位板件编码" :value="barcode"  />
				<image class="code" @click="scan" src="../../static/scanonescan.png" mode=""></image>
			<button form-type="submit" type="primary">提交</button>  
			
			</view>
			
		</form>  
		<!-- {{data[0].order_list[0][6]}} -->
		<view class="outputbox">
			<view v-for="(item,index) in data">

				<view v-if="item.filename">
					<button @click="openUrl(item)" >	{{item.filename}}</button>
					
				</view>
				<!-- {{item.order_list[0][5]}} -->
				<uni-table class="table" type="selection" stripe sortable=true @selection-change="handleSelectionChange">
					<uni-tr>
						<uni-th  >名称</uni-th>
						<uni-th width="5rpx">厚度</uni-th>
						<uni-th width="30rpx">长度</uni-th>
						<uni-th width="20rpx">宽度</uni-th>
						<uni-th width="5rpx">数量</uni-th>
						<uni-th width="100rpx">花色</uni-th>
						<uni-th width="20rpx">异型</uni-th>
					</uni-tr>
					<uni-tr v-for="order in item.order_list" >
						<uni-td>{{order[2]}}</uni-td>
						<uni-td>{{order[3]}}</uni-td>
						<uni-td>{{order[4]}}</uni-td>
						<uni-td>{{order[5]}}</uni-td>
						<uni-td>{{order[6]}}</uni-td>
						<uni-td>{{order[7]}}</uni-td>
						<uni-td>{{order[8]==null?"":order[8]}}</uni-td>
					</uni-tr>
					<uni-td></uni-td>
					<uni-td>已选：</uni-td>
					<uni-td>{{selectCount}}</uni-td>
					<uni-td></uni-td>
					<uni-td>合计:</uni-td>
					<uni-td>{{totalcount}}</uni-td>
					<uni-td></uni-td>

				
				</uni-table>
			</view>

					
		</view>
		

		

		


	</view> 

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				data:'',
				url:'',
				barcode:'',//板件编码
				msg:'',
				scancode:'',//板件编码
				count:0,//板件总数
				selectCount:0,//选择的总数
				
			}
		},
		onLoad() {
			
		},
		computed:{
			totalcount(){
				if (this.data!=''){
					return this.data[0].order_list.reduce((totle,item)=>totle+parseFloat(item[6]),0)
				}
				
				
				// return this.data.order_list.reduce((total,item)=>total+parseFloat(item[6]),0)
			},
		},
		methods: {
			//统计已经选择的记录数
			handleSelectionChange(selection){
				// console.log(selection)
				this.selectCount = selection.detail.index.length
			},
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
									// console.log(res);
									this.scancode=res.result;
									this.barcode=res.result
									
									
								}
							})
					},
					
			onSubmit(inputcode){
				if(inputcode.detail.value.inputcode.length==11 ){
					this.barcode=inputcode.detail.value.inputcode
					var url=`https://www.mochenhome.com/findcad/${this.barcode}`
					// console.log(url)
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url:url,
						success: (res) => {
							// console.log(res)
							this.data=res.data
							// for(item in this.data.order_list)
							// 	{
							// 		this.count+=item[6]
							// 		console.log(item[6])
							// 	}
							// this.order_list = res.data.order_list
							uni.hideLoading()
							
						}
					})
				}
				else if(this.scancode.length==11){
					var url1=`https://www.mochenhome.com/findcad/${this.scancode}`
					// console.log(url1)
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url:url1,
						success: (res) => {
							// console.log(res)
							this.data=res.data
							// for(item in this.data.order_list)
							// 	{
							// 		this.count+= item[6]
							// 		console.log(item[6])
							// 	}
							// this.order_list = res.data.order_list
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
			// position: absolute;
			display: flex;
			flex-direction: column;
			border-width:1;
			border-style:solid red 1px;
			border-color:#000000;
			height: 100%;
			// width: 100%;
			background-color: #cccccc;
			justify-content: center;
			align-items: center;
			
	}
	// .inputbox{
	// 	padding: auto;
	// }
	.input {
		
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
		
	}
	.table{
		// display: flex;
		// flex-direction: row;
		// align-items: center;
		// justify-content:center;
		// height: 50%;
		// width: 1500rpx;
		// background-color:  hsla(40, 10%, 25%, 0.20);
		// border-radius: 15rpx 15rpx;
	}
	.uni-input{
		// margin: 10rpx,10rpx;
		height: 80rpx;
		// width: 100%;
		background-color: white;
		border-radius: 10rpx 10rpx;
		// border-style:solid yellow 1px;
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

	// .title {
	// 	font-size: 36rpx;
	// 	// color: #8f8f94;
	// }
</style>
