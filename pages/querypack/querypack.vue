<template>
	<view>
			<!-- 搜索框 -->
			<view class="inputbox">
				
				<input confirm-type="search"  class="input" v-model="code" placeholder="请输入包装码"  :focus="focus"  ref='myinput' @confirm="poinblur"></input>
				<button class="send-button" @click="piliang">批量提交</button>
				<button class="send-button" @click="search">提交</button>
				<image class="code" @click="scanQRCode" src="../../static/scanonescan.png" mode=""></image>
				
			</view>
			<view>
				<!-- 显示批量输入数据 -->
				<ul>
					<li v-for="(item,index) in codelist" :key="index" v-model="codelist">
							{{item}}
					</li>
				</ul>
			</view>
			<!-- 显示基本信息 -->
		    <view v-if="base_info" >
				<view class="ShipmentNounscanpack">
					<view>发货单号: <text class="packnum">{{base_info.ShipmentNo}}</text></view>
					<view>未扫猫包装数: <text class="packnum" >{{base_info.countpack-base_info.scanpack}}</text>	</view>
				</view>
				<view class="packnumcountpack">				
					<view>已扫描包装数: <text class="countnum" v-model="base_info.scanpack">{{base_info.scanpack}}</text></view>
					<view>总包装数:	<text class="countnum">{{base_info.countpack}}</text>	</view>
				</view>

				<view>客户地址:{{base_info.ClientAddress}}</view>
				
				
				
			</view>
		    
			<!-- 显示明细信息 -->
		    <view v-if="result.status">
				<uni-table ref="table" :loading="loading" border  emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th class="id"  align="center">序号</uni-th>
					<uni-th class="name" align="center">空间名</uni-th>
					<uni-th class="packcode" width=100rpx align="center">包装码</uni-th>
					<uni-th class="orderno" width=100rpx align="center">订单号</uni-th>
			<!-- 		<uni-th width="204" align="center">设置</uni-th> -->
				</uni-tr>
				
					<uni-tr v-for="(item,index) in result.data" :key="index">
						<uni-td class="id">{{ item[0]}}</uni-td>
						<uni-td class="name">{{item[3] }}</uni-td>
						<uni-td class="packcode" width=200px align="center" >{{item[4] }}</uni-td>
						<uni-td class="orderno" width=200px align="center" >{{item[2] }}</uni-td>
	<!-- 					<uni-td>
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary">修改</button>
								<button class="uni-button" size="mini" type="warn">删除</button>
							</view>
						</uni-td> -->
					</uni-tr>
				
				</uni-table><!-- <text class="textlist">{{ item[0]}}</text>|{{item[3] }}|{{item[4] }} -->
			</view>
			<view v-else>{{ result.message }}</view>
			
			

	</view>
</template>

<script>
	// var _self
	export default {
		
		data() {
			return {
				items: [] ,// Initialize an empty array to hold the data
				code: '',
				// 收到的包装码
				codelist:[],
				
				result: {},
				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false,
				first:true,
				focus:true,
				base_info:{
					
				}
};
		},

		created(){
			// console.log(this)
			// _self=this
		},
		  methods: {
			  // 定义更新一条包装码
				async updateonecode(){
						// for (let i=0;i< this.result.data.length;i++){
														  
						// 									var index=this.result.data[i].indexOf(this.code)
						// 									if(index>-1 )	
						// 									  {
						// 										  this.result.data.splice(i,1)
																  
						// 										  this.base_info.scanpack+=1
						// 										  this.base_info.unscanpack-=1}};
					
					for (var code of this.codelist){
						const res = await uni.request({
							url: `https://www.mochenhome.com/updateonecode/${code}`,										
						})
					}
					this.request_url(this.codelist[0])
					this.codelist=[]
					
				},
				// 回车触发函数
					  poinblur:function(){
							this.codelist.push(this.code)
							this.code=''
							
							this.focus = false
							this.$nextTick(() => {
							  this.focus = true;
							});
								},

				async scanQRCode() {
				      //调用摄像头扫描二维码
				      const rescode = await uni.scanCode({
				        onlyFromCamera: true,
				        scanType: ['qrCode']
				      })
					  console.log(rescode)
				      // this.code = res.result
					  //调用api接口
					  this.request_url(rescode.result)
					    // if(rescode.result!=''){
					  	 //  const res = await uni.request({
					  	 //  						url: `https://www.mochenhome.com/updatepack/${rescode.result}`,
					  	  						
					  	 //  })
					  	 //  this.result = res.data
					    // }
					    
					  
					  
								  },
						// this.$refs.myinput.focus();
						
								  
				//调用api接口
				async request_url(_code){
					// console.log("来了")
					if(_code!=''){
					  const res = await uni.request({
											url: `https://www.mochenhome.com/updatepack/${_code}`,
											
					  })
					  this.result = res.data
					  

					  this.base_info=res.data.base_info
					  console.log(this.base_info)
					  this.code=''
					  this.focus=true
					}
				},	
				piliang(){
					this.updateonecode()
				},
				
				async search() {
						
						this.request_url(this.code)
						// this.request_url(this.codelist)
					  
					  
					}
				  },
				  
				// 多选处理
				selectedItems() {
					return this.selectedIndexs.map(i => this.tableData[i])
				},
				// 多选
				selectionChange(e) {
					console.log(e.detail.index)
					this.selectedIndexs = e.detail.index
				},
				//批量删除
				delTable() {
					console.log(this.selectedItems())
				},
				// 分页触发
				change(e) {
					this.$refs.table.clearSelection()
					this.selectedIndexs.length = 0
					this.getData(e.current)
				},
				
				// 搜索
				// search() {
				// 	this.getData(1, this.searchVal)
				// },
				// 获取数据
				getData(pageCurrent, value = '') {
					this.loading = true
					this.pageCurrent = pageCurrent
					this.request({
						pageSize: this.pageSize,
						pageCurrent: pageCurrent,
						value: value,
						success: res => {
							// console.log('data', res);
							this.tableData = res.data
							this.total = res.total
							this.loading = false
						}
					})
				}


	}
</script>

<style lang="scss">
	.id{
		padding-left: 50rpx;
		width: 30%;
		align-items: center;
	}
	.name{

		width: 30%;
		align-items: center;
		
	}
	.packcode{

		width: 40%;
		align-items: center;
	}
	.uni-group {
		display: flex;
		align-items: center;
		
	}
	.input{
		flex: 1;
		height: 32px;
		padding: 5px;
		border-radius: 16px;
		border: 1px solid #ddd;
		background-color: #f7f7f7;
		font-size: 14px;
	}
	.inputbox{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.code{
		height: 90rpx;
		width: 90rpx;
		
	}
	.send-button{
		font-size: 12px;
		border-radius: 16px;
		border: 1px solid #ddd;
		background-color: #007AFF;
		
	}
	.packnum{
		font-size: 28px;
		color:red;
	}
	.countnum{
		font-size: 28px;
		color:blue;
	}
	.ShipmentNounscanpack{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.packnumcountpack{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
