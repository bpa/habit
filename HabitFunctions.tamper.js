// ==UserScript==
// @name       HabitFunctions
// @version    0.1
// @description  Functions to answer questions not provided by the UI
// @match      https://habitrpg.com/*
// @copyright  2014+, Bruce Armstrong
// ==/UserScript==

var angular = unsafeWindow.angular;
var body = angular.element('body');
var $scope = body.scope();
var template = angular.element('<li>{{user.items.lastDrop.count}}/{{bd_dropCap()}}</li>');
$scope.bd_dropCap = function() {
    var level = $scope.user.contributor.level || 0;
    var stats = $scope.user._statsComputed;
    return stats ? (5 + Math.floor(stats.per / 25) + level) : '?';
};

var $compile = body.injector().get('$compile');
var linkFn = $compile(template);
var element = linkFn(body.scope());
angular.element('.toolbar-wallet').prepend(element);

unsafeWindow.buy = function(item) {
    angular.element('body').scope().buy({ key: item });
};

unsafeWindow.currentRandom = function() {
    var user = angular.element('body').scope().user;
    var rarity = user.fns.predictableRandom(user.stats.gp);
    var item = 
          rarity > .60 ? "Food"
    	: rarity > .30 ? "Egg"
        : rarity < .02 ? "Golden Potion"
        : rarity < .09 ? "Zombie, CottonCandyPink, or CottonCandyBlue Potion"
        : rarity < .18 ? "Red, Shade, or Skeleton Potion"
        : "Base, White, or Desert Potion";
    return rarity.toFixed(4) + " => " + item;
};
