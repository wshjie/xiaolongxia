<template>
	 <div class="header">
	 	<div class="content-wrapper">
	 		<div class="avatar">
	 			<img width="64px" height="64px" :src="seller.avatar">
	 		</div>
	 		<div class="content">
	 			<div class="title">
	 				<span class="brand"></span>
	 				<span class="name">{{seller.name}}</span>
	 			</div>	 		
		 		<div class="description">
		 			{{seller.description}}/{{seller.deliveryTime}}分钟送达
		 		</div>
		 		<div v-if="seller.supports" class="support">
		 			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
		 			<span class="text">{{seller.supports[0].description}}</span>
		 		</div>
	 		</div>
	 		<div v-if="seller.supports" class="support-count" @click="showDetail">
	 			<span class="count">{{seller.supports.length}}个</span>
	 			<span class="arrow">></span>
	 		</div>
	 	</div>
	 	<div class="bulletin-warpper" @click="showDetail">
	 		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
	 		<span class="bulletin-arrow">></span>
	 	</div>
	 	<div class="background">
	 		<img :src="seller.avatar" width="100%" height="100%"/>
	 	</div>
	 	<transition name="fade">
	 	<div class="detail" v-show="detailShow">
	 		<div class="detail-wrapper clearfix">
	 			<div class="detail-main">
	 				<h1 class="name">{{seller.name}}</h1>
	 				<div class="star-wrapper">
	 					<star :size="48" :score="seller.score"></star>
	 				</div>
	 				<div class="title">
	 					<div class="line"></div>
	 					<div class="title_text">优惠信息</div>
	 					<div class="line"></div>
	 				</div>
	 				<ul class="supports" v-if="seller.supports">
	 					<li class="support-item" v-for="item in seller.supports">
	 						<span class="icon" :class="classMap[item.type]"></span>
	 						<span class="text">{{item.description}}</span>
	 					</li>
	 				</ul>
	 				<div class="title">
	 					<div class="line"></div>
	 					<div class="title_text">商家公告</div>
	 					<div class="line"></div>
	 				</div>
	 				<div class="bulletin">
	 					<p class="content">{{seller.bulletin}}</p>
	 				</div>
	 			</div>
	 		</div>
	 		<div class="detail-close" @click="detailShow=false">
	 			<div class="icon-close">X</div>
	 		</div>
	 	</div>
	 	</transition>
	 </div>
</template>
<script>
	import star from '../star/star';
	export default{
		props:{
			seller: {	
			}
		},
		data() {
			return{
				detailShow:false	
			}
		},
		methods: {
			showDetail: function() {
				this.detailShow = true;
			}
		} ,
		created() {
			this.classMap=['decrease','discount','guarantee','invoice','special']
		},
		components: {
			star:star
		}
	}
</script>
<style>
	.header{position: relative;background: rgba(7,17,27,0.5);}
	.content-wrapper{font-size: 0px;padding: 24px 12px 18px 25px;color: white;position: relative}
	.avatar{display: inline-block;}
	.avatar img{border-radius: 2px;}
	.content{display: inline-block;}
	.content div{margin-left: 20px;}
	.title span{display: inline-block;margin-bottom: 10px;}
	.brand{vertical-align:top;background: url('brand@2x.png') no-repeat;background-size: 100%;width:30px;height: 18px}
	.name{margin-left: 6px;font-size: 16px;line-height: 18px;font-weight: bold;}
	.description{font-size: 12px;font-weight: 200;margin-bottom: 10px;line-height: 12px;}
	.support{font-size: 0px;}
	.support .icon{display: inline-block;width: 12px; height: 12px;margin-right: 4px;background-size: 100%;}
	.support > .text{font-size:12px;vertical-align: top;line-height: 12px;}
	.icon{vertical-align: top}
	.decrease{background: url("decrease_1@2x.png");}
	.discount{background: url("discount_1@2x.png");}
	.guarantee{background: url("guarantee_1@2x.png");}
	.invoice{background: url('invoice_1@2x.png')}
	.special{background: url('special_1@2x.png')}
	.support-count{position: absolute;right: 12px;bottom: 18px;padding:0 8px;height: 24px;line-height:  24px;border-radius:  14px;background: rgba(0,0,0,0.2);text-align: center;}
	.count{font-size:10px}
	.arrow{font-size:10px}
	.bulletin-warpper{position:relative;height:28px;line-height: 28px;padding:0 20px 0 12px;white-space: nowrap;overflow: hidden; text-overflow: ellipsis;color:white}
	.bulletin-title{vertical-align: top;margin-top: 7px;display: inline-block;width:22px;height:12px;background: url('bulletin@2x.png') no-repeat;background-size:100%}
	.bulletin-text{vertical-align: top;font-size:10px;font-weight: 200;margin:0 4px;}
	.bulletin-arrow{position:absolute;font-size:10px;right:12px;top: 0px;height:28px;}
	.background{position: absolute;top:0;left:0;width:100%;height:100%;z-index: -1;filter: blur(10px);}
	.detail{position: fixed;z-index: 100;width: 100%;height:100%;overflow: auto;background: rgba(7,17,27,0.8);top:0;left: 0;transition: all 1s}
	.clearfix{display: inline-block;}
	.clearfix:after{display: block;content: ".";height:0;line-height: 0;clear: both;visibility: hidden;}
	.detail-wrapper{min-height:100%;width: 100%}
	.detail-main{margin-top: 64px;padding-bottom: 64px;}
	.detail-close{position: relative;width:32px;height:32px;margin:-44px auto 0 auto;clear: both;font-size: 32px;color: white}
	.name{line-height: 16px;text-align:center;font-size: 16px;font-weight: 700;color:white}
	.star-wrapper{margin-top: 18px;padding: 2px 0;text-align: center;}
	.detail-main > .title{width: 80%;margin:28px auto 24px auto;display: flex;}
	.line{flex:1;position: relative;top:-6px;border-bottom: 1px solid rgba(255,255,255,0.2);}
	.title_text{padding: 0 12px;font-size: 14px;color: white;font-weight: 700;}
	.supports{width:80%;margin: 0 auto;}
	.support-item{padding:0 12px;margin-bottom: 12px;font-size: 0;}
	.support-item> .icon{display: inline-block;width: 16px;height: 16px;vertical-align:top;margin-right: 6px;background-size:16px 16px}
	.support-item > .text{font-size:12px;color: white;line-height: 16px;}
	.bulletin{width:80%;margin:0 auto}
	.content{padding:0 12px;line-height: 24px;font-size: 12px;color: white;font-weight: 200;}
	.icon-close{font-size: 20px;}
	.fade-transition{opacity:1;background:rgba(7,17,27,0.8)}
	.fade-enter,.fade-leave{opacity:0;background:rgba(7,17,27,0.8)}
</style>