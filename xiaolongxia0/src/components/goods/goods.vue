<template>
	<div class="goods">
		<div class="menu-wrapper" id="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
				@click="selectMenu(index,$event)">
					<span class="text">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" id="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-List-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">${{food.price}}</span>
									<span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from "better-scroll";
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return{
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		computed:{
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2) {
						 return i;
					}
				}
				return 0;
			}
		},
		created() {
			this.$http.get('api/goods').then((response) => {
				response = response.body;				
				this.goods = response.data;		
				this.$nextTick(() =>{
					this._initScroll();
					this._calculateHeight();
				})
				
			}),
			this.classMap=['decrease','discount','guarantee','invoice','special']
		},
		methods: {
			_initScroll() {
				this.meunScroll = new BScroll(document.getElementById("menuWrapper"),{
					click:true
				})
				this.foodScroll = new BScroll(document.getElementById("foodsWrapper"),{
					probeType: 3
				})
				this.foodScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight() {
				let foodList = document.getElementsByClassName("food-List-hook")
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height)
				}
				console.log(this.listHeight)
			},
			selectMenu(index,event) {
				if(event.__constructed){
					return;
				}
				let foodList = document.getElementsByClassName("food-List-hook")
				let el = foodList[index];
				this.foodScroll.scrollToElement(el,300)
			}
		}
	}
</script>
<style>
	.goods{position: absolute;top: 185px;bottom:40px;width: 100%;display: flex;overflow: hidden;}
	.menu-wrapper{flex:0 0 80px;width: 80px;background: #f3f5f7;}
	.foods-wrapper{flex:1;}
	.menu-item{display: table;height: 54px;width: 100%;line-height: 14px;font-size:0px}
	.menu-item > .text >.icon{vertical-align: top;width:14px;height:12px;display: inline-block;}
	.menu-item > .text > .decrease{background: url("decrease_3@2x.png") no-repeat;background-size:12px 12px;}
	.menu-item > .text > .discount{background: url("discount_3@2x.png") no-repeat;background-size:12px 12px;}
	.menu-item > .text > .guarantee{background: url("guarantee_3@2x.png") no-repeat;background-size:12px 12px;}
	.menu-item > .text > .invoice{background: url('invoice_3@2x.png') no-repeat;background-size:12px 12px;}
	.menu-item > .text > .special{background: url('special_3@2x.png') no-repeat;background-size:12px 12px;}
	.menu-item > .text{font-size: 14px;display: table-cell;width: 56px;vertical-align: middle;border-bottom: 1px rgba(7,17,27,0.2) ;display: table-cell;padding-left:12px;}
	.food-list > .title{padding-left: 14px;height: 26px; line-height: 26px;border-left:2px solid #d9dde1;font-size: 12px;color: rgb(147,153,159);background: #f3f5f7;}
	.food-item{display: flex;margin:18px;border-bottom: 1px rgba(7,17,27,0.2);height:90px}
	.food-item:nth-last-child{border-bottom: none;}
	.food-item > .icon{flex:0 0 57px;height:90px}
	.food-item > .icon > img{height:90px}
	.food-item > .content{flex:1;position: relative;}
	.food-item > .content > .name{margin:2px 0 8px 0;line-height: 14px;height: 14px;font-size: 14px;color:rgb(7,17,27);text-align: left;}
	.food-item > .content > .desc{margin-bottom: 8px;line-height: 10px;font-size: 10px;color: rgb(147,153,159)}
	.food-item > .content > .extra{line-height:10px;color:rgb(147,153,159);margin-bottom: 8px;font-size: 10px;text-align: left;margin-left:0}
	.count{margin-left: 12px;}
	.food-item > .content > .price{font-weight: 700;line-height: 24px;margin-left: 0px;bottom:0;position: absolute;}
	.now{margin-right: 8px;font-size: 14px;color:rgb(240,20,20)}
	.old{text-decoration: line-through;font-size: 10px;color:rgb(147,153,159);}
	.current{position:relative;z-index:10;margin-top: -1px;background:#fff;}
	.current > .text{border: none;font-weight: 700;}
</style>