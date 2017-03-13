
var Yike = angular.module('Yike', ['ngRoute']);

// 配置路由
Yike.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/today', {
		// 为路由配置视图
		templateUrl: './views/today.html',
		controller: 'TodayCtrl'
	})
	.when('/older', {
		// 为路由配置视图
		templateUrl: './views/older.html',
		controller: 'OlderCtrl'
	})
	.when('/author', {
		// 为路由配置视图
		templateUrl: './views/author.html',
		controller: 'AuthorCtrl'
	})
	.when('/cagegory', {
		// 为路由配置视图
		templateUrl: './views/category.html'
	})
	.when('/like', {
		// 为路由配置视图
		templateUrl: './views/like.html'
	})
	.when('/settings', {
		// 为路由配置视图
		templateUrl: './views/settings.html'
	})
	.otherwise({
		redirectTo: '/today'
	});
}]);

// 添加一个全局方法用来实现页页交互

// $rootScope

Yike.run(['$rootScope', function ($rootScope) {

	// 导航初始状态
	$rootScope.collapsed = false;

	// 导航交互
	$rootScope.collapse = function () {
		// 打开/关闭
		$rootScope.collapsed = !$rootScope.collapsed;

		// 所有导航
		var navs = document.querySelectorAll('.navs dd');

		// 当前导航是打开还是关闭
		if($rootScope.collapsed) {
			// 所有dd 位置从 -100% --> 0
			for(var i=0; i<navs.length; i++) {
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay = '0.2s';
				// i 
				navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
			}
		} else {
			// 所有dd 位置从 0 --> -100%
			for(var j=navs.length; j>0; j--) {
				navs[j-1].style.transform = 'translate(-100%)';
				navs[j-1].style.transitionDelay = '';
				// j - 1 = 5 - 1 --> j - 1 = 1 - 1

				// console.log(navs.length - j + 1);
				navs[j-1].style.transitionDuration = (navs.length - j + 1) * 0.15 + 's';
			}
		}
	}
}]);

// 
Yike.controller('NavsCtrl', ['$scope', function ($scope) {

	// 
	$scope.navs = [
		{text: '我的行程', link: '#/today', icon: 'icon-home'},
		{text: '我的钱包', link: '#/older', icon: 'icon-file-empty'},
		{text: '输入优惠码', link: '#/author', icon: 'icon-pencil'},
		{text: '邀请赢奖', link: '#/cagegory', icon: 'icon-menu'},
		{text: '使用指南', link: '#/like', icon: 'icon-heart'},
		{text: '设置', link: '#/settings', icon: 'icon-cog'},
	]
}]);

// 
Yike.controller('TodayCtrl', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

	// 格式化数据
	var today = $filter('date')(new Date, 'yyyy-MM-dd');


	// 全局变量，标明是否加载完成
	$rootScope.loaded = false;

	// 全局变量，设置当前索引
	$rootScope.key = 0;

	// 全局变量，设置当前标题
	$rootScope.title = 'ofo共享单车';

	$http({
		url: './api/today.php',
		// params: {today: today}
	}).success(function (info) {
		// console.log(info);
		
		// 将获取来的数据放到模型上
		$scope.posts = info.posts;
		$scope.date = info.date;

		// 加载状态完成
		$rootScope.loaded = true;
	});
}]);

Yike.controller('OlderCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

	// 全局变量，标明是否加载完成
	$rootScope.loaded = false;

	// 全局变量，设置当前索引
	$rootScope.key = 1;

	// 全局变量，设置当前标题
	$rootScope.title = 'ofo共享单车';

	$http({
		url: './api/older.php'
	}).success(function (info) {

		// 加载状态完成
		$rootScope.loaded = true;

		$scope.posts = info.posts;
		$scope.date = info.date;
	});
}]);

// 
Yike.controller('AuthorCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	
	$rootScope.loaded = false;

	$rootScope.title = 'ofo共享单车';

	$rootScope.key = 2;

	// 
	$http({
		url: './api/author.php'
	}).success(function (info) {
		console.log(info);

		$scope.rec = info.rec.authors;
		$scope.all = info.all.authors;

		$rootScope.loaded = true;
	});
}]);