<template>
	<view class="content1">
		<form @submit="onSubmit" class='inputbox'>
			<view class="input">
				<input class="uni-input" name='inputcode' maxlength="20"  placeholder="请输入设备编码" v-model="devicecode" @confirm="onSubmit" />
				<image class="code" @click="scan" src="../../static/scanonescan.png" mode=""></image>
				<button form-type="submit" type="primary">提交</button> &nbsp 
			</view>
			
		</form>  
		<view>			
		
			<input class="recode_input" type="password" name='inputcode' maxlength="20"  placeholder="查询维修记录请输入密码" @confirm="repairrecord"  v-model="password"/>
		</view>

		<view class="outputbox" v-if="data" >
			
			<view class="uni-input">设备编码:{{data.id}}</view>
			<view class="uni-input">设备名称:{{data.device_name}}</view>
			<input class="uni-input" name='inputcode' maxlength="11"  placeholder="报修人手机号" v-model="report_repair_phone" @confirm="getuser"  />
			<view class="uni-input">报修人:{{report_repair_person}}</view>
			
			<input class="uni-input"  name='inputcode' maxlength="110"  placeholder="故障描述" v-model="description_problem"  />
		
			<uni-data-checkbox class="uni-input" v-model="report_repair_category_id" :localdata="report_repair_category" mode="tag"></uni-data-checkbox>
			<button @click="report">上报</button>
		</view>

			
				<uni-table class="table" type="selection" stripe sortable=true @selection-change="handleSelectionChange">
					<uni-tr>
						<uni-th>  ID</uni-th>
						<uni-th> 报修人</uni-th>
						<uni-th>维修人</uni-th>
						<uni-th>报修时间</uni-th>
						<uni-th>故障描述</uni-th>
						<uni-th>故障类别</uni-th>
						<uni-th>设备名</uni-th>
					</uni-tr>
					<uni-tr v-for="repairrecord in repairrecords" >
						<uni-td>{{repairrecord.id}}</uni-td>
						<uni-td>{{repairrecord.report_repair_person}}</uni-td>
						<uni-td>{{repairrecord.repair_person}}</uni-td>
						<uni-td>{{repairrecord.repair_time}}</uni-td>
						<uni-td>{{repairrecord.description_problem}}</uni-td>
						<uni-td>{{repairrecord.report_repair_category}}</uni-td>
						<uni-td>{{repairrecord.device_name}}</uni-td>
					</uni-tr>
			
			
				
				</uni-table>	 
				<view>
					
						<uni-pagination :total="count" title="换页" :current="currentPage" pageSize=10  @change="handlePageChange"/>
					
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
				devicecode:'',//设备编码
				msg:'',
				scancode:'',//设备编码
				count:0,//设备总数
				selectCount:0,//设备的总数
				report_repair_person:"",//报修人
				repair_person:"",//维修人
				report_repair_category_id:1,//维修类别
				report_repair_category:"",//维修类别
				description_problem:"",//问题描述
				password:"",//密码
				repairrecords:"",//维修记录
				count:0,//记录数
				currentPage:1,//当前页
				report_repair_phone:"",//报修人手机号
				
			}
		},
		onLoad() {
			var url=`https://www.mochenhome.com/devicemanage/Category/`
				// console.log(url)
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url,
					method:'GET',
					success: (res) => {
			
						this.report_repair_category=res.data
						
			
						uni.hideLoading()
						
					}
				})
				
			
		},
		computed:{

		},
		methods: {
			//通过手机号获取报修人姓名
			getuser(){
				
				var url=`https://www.mochenhome.com/devicemanage/phone/${this.report_repair_phone}`
				// console.log(url)
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url,
					method:'GET',
					success: (res) => {
				
						this.report_repair_person=res.data
						
				
						uni.hideLoading()
						
					}
				})
			},
			//处理分页
			handlePageChange(newPage){
				//处理页码变更事件
				// console.log(newPage)
				this.currentPage = newPage.current;
				this.fetchData();
			},
			//请求记录
			fetchData(){
				this.data=null
				var url=`https://www.mochenhome.com/devicemanage/DeviceRepair/?page=${this.currentPage}`
				// console.log(url)
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url,
					method:'GET',
					success: (res) => {
				
						this.repairrecords=res.data.results
						this.count=res.data.count
				
						uni.hideLoading()
						
					}
				})
			},
			//维修记录
			
			repairrecord(){
				if (this.password==='8796'){
					this.fetchData()
					return
				}
				
				
			},
			//上报
			report(){
				
				var url=`https://www.mochenhome.com/devicemanage/DeviceRepair/`
				
				 // console.log(this.report_repair_person)
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url,
					method:'POST',
					data:{
						"report_repair_person": this.report_repair_person,
						"repair_person": this.repair_person,
						"description_problem": this.description_problem,
						"report_repair_category_id": this.report_repair_category_id,
						"device_name_id": this.devicecode,
						"report_repair_phone":this.report_repair_phone,
						"repair_person":this.repair_person,
						"report_repair_person":this.report_repair_person
						
					},
					success: (res) => {
						// console.log(res)
						
						uni.showToast({
							title:"报修成功",
							icon:"success"
						})
						
						// console.log(res.data)
						// for(item in this.data.order_list)
						// 	{
						// 		this.count+=item[6]
						// 		console.log(item[6])
						// 	}
						// this.order_list = res.data.order_list
						uni.hideLoading()
						
					}
				})
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
									this.devicecode=res.result		
									this.Request_url()													
								}
							})
							
					},
			Request_url(){
				var url=`https://www.mochenhome.com/devicemanage/DeviceDetail/${this.devicecode}/`
				// console.log(url)
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url,
					success: (res) => {
						// console.log(res)
						this.data=res.data

						uni.hideLoading()
						
					}
				})
			},		
			onSubmit(inputcode){
				
				if(this.devicecode.length>0 ){
					
					this.Request_url()
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
			background-color: #d3d3d3;
			justify-content:space-around;
			align-items: center;
			padding: auto;
			
			
	}
	// .inputbox{
	// 	padding: auto;
	// }
	.input {
		
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-width:1;
		border-style:solid red 1px;
		
		
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
	.outputbox{
		display: flex;
		flex-direction: column;
		// padding: 100rpx,100rpx;
		justify-content: space-around;
		// margin: 10rpx,10rpx;
		height: 950rpx;
		// width: 100%;
		background-color: #d3d3d3;
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

	.uni-input{
		// border-style:solid black 1px;
		// border-color:#000000;
		margin: 30rpx;
		background-color: #ffffff;
		border-width:1;
		border-radius: 20rpx 20rpx;
		height: 80rpx;


	}
	.recode_input{
		border-style:solid black 1px;
		border-color:#000000;
		border-width:1;
		
	}
	

</style>
