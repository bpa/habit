// ==UserScript==
// @name       HabitFunctions
// @version    0.1
// @description  Functions to answer questions not provided by the UI
// @match      https://habitrpg.com/*
// @copyright  2014+, Bruce Armstrong
// ==/UserScript==

var angular = unsafeWindow.angular;

unsafeWindow.buy = function(item) {
    angular.element('body').scope().buy({ key: item });
};

unsafeWindow.dropCap = function() {
    var user = angular.element('body').scope().user;
    var level = user.contributor.level || 0;
    var dropCap = 5 + Math.floor(user._statsComputed.per / 25) + level;
    return user.items.lastDrop.count + '/' + dropCap;
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
