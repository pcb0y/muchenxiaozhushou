<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		onLoad(res){
			this.url=res.url
			
		}
	}
</script>

<style lang="scss">

</style>
