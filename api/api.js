import request from "@/api/request.js";
import { param } from "jquery";

/**
 * 获取首页轮播图
 */
export function getHomeCarouse() {
	return request.get("/dtk/getCarouseList");
}

/**
 * 获取首页数据
 */
export function getHomeInfo() {
	return request.get("/dtk/getHomeInfo");
}

/**
 * 获取每日半价
 * @param {Number} 当前页数
 * @param {Number} 每页个数
 * @param {Number} 1已开始 2预告
 */
export function getHalfPriceDay(pageId = 1, pageSize = 20, sessions = 1) {
	return request.get("/dtk/getHalfPriceDay", {
		pageId: pageId,
		pageSize: pageSize,
		sessions: sessions
	})
}

/**
 * 历史新低
 * @param {Number} pageId 当前页数
 * @param {Number} pageSize 每页个数
 * @param {Number} sort 排序方式，默认为0，0-综合排序，1-商品上架时间从高到低，2-销量从高到低，3-领券量从高到低，4-佣金比例从高到低，5-价格（券后价）从高到低，6-价格（券后价）从低到高
 */
export function getHistoryLowPriceList(pageId = 1, pageSize = 20, sort = 0) {
	return request.get("/dtk/getHistoryLowPriceList", {
		pageId: pageId,
		pageSize: pageSize,
		sort: sort
	});
}

/**
 * 高佣精选
 * @param {Number} pageId 当前页数
 * @param {Number} pageSize 每页个数
 */
export function getListHeightCommission(pageId = 1, pageSize = 20) {
	return request.get("/dtk/getListHeightCommission", {
		pageId: pageId,
		pageSize: pageSize
	})
}

/**
 * 热搜记录
 * @param {Number} type 1：买家热搜榜（默认）、2：淘客热搜榜，默认 1
 */
export function getTop100(type = 1) {
	return request.get("/dtk/getTop100", {
		type: type
	})
}

/**
 * 超级分类
 */
export function getSuperCategory() {
	return request.get("/dtk/getSuperCategory");
}

/**
 * 各大榜单
 * @param {Number} rankType 榜单类型，1.实时榜 2.全天榜 3.热推榜 5.热词飙升榜 6.热词排行榜 7.综合热搜榜 8 实时榜2.0
 * @param {Number} pageId 当前页数
 * @param {Number} pageSize 每页个数
 */
export function getRankingList(rankType = 1, pageId = 1, pageSize = 20) {
	return request.get("/dtk/getRankingList", {
		rankType: rankType,
		pageId: pageId,
		pageSize: pageSize
	});
}

/**
 * 获取热门活动
 */
export function getHotActibity() {
	return request.get("/dtk/getActivityCatalogue")
}

/**
 * 获取商品列表
 * @param {Object} param 
 */
export function getGoodsList(param) {
	return request.get("/dtk/getGoodsList", param);
}