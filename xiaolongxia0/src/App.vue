<template>
	<div id="app">
			<top :seller="seller"></top>
			<div class="tab">
				<div class="tab-item" >
					<router-link to="/goods">点菜</router-link>
				</div>
				<div class="tab-item">
					<router-link to="/ratings">评价</router-link>
				</div>
				<div class="tab-item">
					<router-link to="/seller">商家</router-link>
				</div>
			</div>
			<router-view></router-view>
	</div>

</template>

<script type="text/javascript">
	import top from './components/header/top'
	export default{
		data() {
			return{
				seller:{}
			}
		},
		created() {
			this.$http.get('/api/seller').then((response) => {
				response = response.body;
				this.seller = response.data;
			})
		},
		components:{
			top:top
		}
	}
</script>

<style>
	.tab{display: flex;width:100%;height: 40px}
	.tab-item{flex:1;text-align: center;line-height: 40px;}
	.tab-item a{display: block;font-size: 14px;color:rgb(77,85,93)}
	.tab-item a.active{color:red}
</style>
