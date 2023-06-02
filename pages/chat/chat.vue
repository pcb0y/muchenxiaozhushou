<template>
  <view class="container">
<!-- 	  <scroll-view class="messages-ask" v-model="scrollIntoView" scroll-y="true">
	     <view v-for="(message, index) in messages" :key="index" class="message" :class="{ 'from-me': message.fromMe }">
	       <view class="message-text">{{message.ask}}</view>
	     </view>
	   </scroll-view> -->
   <scroll-view class="messages" v-model="scrollIntoView" scroll-y="true">
      <view v-for="(message, index) in messages" :key="index" class="message" :class="{ 'from-me': message.fromMe }">
        <view class="message-ask">{{message.ask}}</view>
		<view class="message-text">{{message.text}}</view>
      </view>
    </scroll-view>
    <view class="input-container">
      <input class="input" v-model="inputText" placeholder="请输入消息内容" @confirm="sendMessage" />
      <button class="send-button" @tap="sendMessage">发送</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        messages: ["aaa"],
        inputText: '',
        scrollIntoView:'ddddd'
      }
    },
    methods: {
      sendMessage ()  {

        if (!this.inputText) return;
		console.log(this.inputText)
        //向后端API发送请求
		uni.showLoading({
			title: '加载中'
		});
        uni.request({
          url: `http://127.0.0.1:8001/openai/${this.inputText}`,
          method: 'GET',
		  success: (res) => {
		  	console.log(res)
		  	// this.message=res.data.answer
		  	uni.hideLoading()
			const newMessage = { text: res.data.answer,ask:this.inputText, fromMe: true };
			this.messages.push(newMessage);
			this.inputText = '';
			this.scrollIntoView = `message-${this.messages.length - 1}`;
		  	
		  }
          // data: { message: newMessage }
        });
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f1f1f1;
  }
  .messages {
	  position: fixed;
    flex: 1;
    padding: 10px;
	height: 80%;
	background-color: #ffc1f1;
  }
  .message {
    margin-bottom: 10px;
    padding: 10px;
    max-width: 80%;
    border-radius: 10px;
    background-color: white;
  }
  .message.from-me {
    align-self: flex-end;
    background-color: #dcf8c6;
  }
  .message-text {
    font-size: 16px;
    line-height: 1.5;
  }
  .message-ask {
	font-size: 10px;	
		display: flex;
		 
		
  }
  .input-container {
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  right: 0;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;
  }
  .input {
    flex: 1;
    height: 32px;
    padding: 5px;
    border-radius: 16px;
    border: 1px solid #ddd;
    background-color: #f7f7f7;
    font-size: 14px;
  }
  .send-button {
    margin-left: 10px;
    width: 60px;
    height: 32px;
    border-radius: 16px;
    background-color: #007aff;
    color: white;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
  }
</style>
