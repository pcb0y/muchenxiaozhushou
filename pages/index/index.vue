<template>
	<view class="content1">
		<form @submit="onSubmit" class='inputbox'>
			<view class="input">
				<input class="uni-input" name='inputcode' maxlength="15"  placeholder="请输入板件编码" :value="barcode"  />
				<image class="code" @click="scan" src="../../static/scanonescan.png" mode=""></image>
			<button form-type="submit" type="primary">提交</button>  
			
			</view>
			
		</form>  
		<!-- {{data[0].order_list[0][6]}} -->
		<view class="outputbox">
			<view v-for="(item,index) in data">

				<view  v-if="item.filename">
					<button class="tuzhi" @click="openUrl(item)" >	{{item.filename}}</button>
					
				</view>
				<!-- {{item.order_list[0][5]}} -->
				<view >
					<view class='col' >
						<text class='tablename' width="100" >名称</text>
						<text class='tablehight' width="20">厚度</text>
						<text class='tablelength'   width="50">长度</text>
						<text class='tablewidth' width="50">宽度</text>
						<text class='tablequantity' width="20">数量</text>
						<text class='tablecolor'>花色</text>
		<!-- 				<text class='tablehead'>异型</text> -->
					</view>
					<view class='col' v-for="order in item.order_list" >
						<text class='tablename' :style="order[2]=='39收口板'||order[2]=='豪华挂衣杆'?'color: red':''" >{{order[2]}}</text>
						<text class='tablehight':style="order[3]>18?'color: #00007f':''">{{order[3]}}</text>
						<text class='tablelength'>{{order[4]}}</text>
						<text class='tablewidth'>{{order[5]}}</text>
						<text class='tablequantity'>{{order[6]}}</text>
						<text class='tablecolor'>{{order[7]}}</text>
				<!-- 		<text class='tablehead'>{{order[8]==null?"":order[8]}}</text> -->
					</view>
<!-- 					<td></td>
					<td>已选：</td>
					<td>{{selectCount}}</td>
					<td></td>
					<td>合计:</td>
					<td>{{totalcount}}</td>
					<td></td> -->

				
				</view>

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
				// tablecolor:true,//改变表格的颜色
				cellclassname:"aaaa"
				
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
			changecolor(val){
				return val=='39收口板'||val=='豪华挂衣杆'?'#ffff7f':''
			},
			
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
				if(inputcode.detail.value.inputcode.length>=11 ){
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
				else if(this.scancode.length>=11){
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
			border-width:20;
			border-style:solid red 3rpx;
			border-color:#000000;
			// height: 100%;
			// width: 100%;
			background-color: #efefef;
			justify-content: start;
			// align-items: center;
			
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
		display: flex;
		flex-direction: row;
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
	.table{
		display: flex;
		flex-direction: row;
		// padding: 100rpx,100rpx;
		justify-content: start;
		// margin: 10rpx,10rpx;
		// height: 950rpx;
		// width: 100%;
		background-color: #ff007f;
		border-radius: 10rpx 10rpx;
		// border-style:solid yellow 1px;
		border-color: yellow;
	
	
	}
	.shoukou{
		background-color: #ffff7f;
	}
	.houban{
		background-color: #00007f;
	}
	.tablehead{
		// padding: 0rpx 10rpx;
		// align-items: center;

	}
	.col{
		display: flex;

	}
	.tablename{
		border-bottom: 1px solid #8b868a ;

		width: 180rpx;

	}
	.tablehight{
		width: 50rpx;
		border-bottom: 1px solid #8b868a ;
		border-left: 1px solid #8b868a ;
	}
	.tablelength{
		width: 110rpx;
		border-bottom: 1px solid #8b868a ;
		border-left: 1px solid #8b868a ;
	}
	.tablewidth{
		width: 100rpx;
		border-bottom: 1px solid #8b868a ;
		border-left: 1px solid #8b868a ;
	}
	.tablequantity{
		width: 50rpx;
		border-bottom: 1px solid #8b868a ;
		border-left: 1px solid #8b868a ;
	}
	.tablecolor{
		width: 150rpx;
		border-bottom: 1px solid #8b868a ;
		border-left: 1px solid #8b868a ;
		border-right: 1px solid #8b868a ;
	}
	.tuzhi{
		background-color: #aa0000;
	}

</style>
