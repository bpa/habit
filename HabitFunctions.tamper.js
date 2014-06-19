// ==UserScript==
// @name       HabitFunctions
// @version    0.1
// @description  Functions to answer questions not provided by the UI
// @match      https://habitrpg.com/*
// @copyright  2014+, Bruce Armstrong
// ==/UserScript==

if (window.top != window.self)  //-- Don't run on frames or iframes
    return;

var angular = unsafeWindow.angular;
var body = angular.element('body');
var $scope = body.injector().get('$rootScope');
//var $scope = body.scope();
var template = angular.element('<li>{{bdDropMessage}} {{bdDrop}}</li>');
var $compile = body.injector().get('$compile');
var linkFn = $compile(template);
var element = linkFn(body.scope());
angular.element('.toolbar-wallet').prepend(element);

$scope.$watch(function() { return ($scope.user._statsComputed ? $scope.user._statsComputed.per : 0) + $scope.user.items.lastDrop.count; }, function() {
    var level = $scope.user.contributor.level || 0;
    var stats = $scope.user._statsComputed;
    $scope.bdDropMessage = $scope.user.items.lastDrop.count + '/' + (stats ? (5 + Math.floor(stats.per / 25) + level) : '?');
});

function calculateDropChance () {
	if ($scope.user.fns.predictableRandom === undefined)
		$scope.bdDrop = '?';

    var rarity = $scope.user.fns.predictableRandom($scope.user.stats.gp);
    var item = 
          rarity > .60 ? "Food"
    	: rarity > .30 ? "Egg"
        : rarity < .02 ? "Golden Potion"
        : rarity < .09 ? "Zombie, CottonCandyPink, or CottonCandyBlue Potion"
        : rarity < .18 ? "Red, Shade, or Skeleton Potion"
        : "Base, White, or Desert Potion";
    $scope.bdDrop = rarity.toFixed(3) + " => " + item;
};

$scope.$watch(function() { return $scope.user.stats.gp }, calculateDropChance);

unsafeWindow.buy = function(item) {
    angular.element('body').scope().buy({ key: item });
};

