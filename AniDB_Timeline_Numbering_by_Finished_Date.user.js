// ==UserScript==
// @name        AniDB Timeline Numbering by Finished Date
// @namespace   SoulweaverScript
// @description Prepends timeline items of finished series with numbers based on the finishing order
// @include     /^https?://anidb\.net/perl-bin/animedb\.pl\?(|.*&)show=timeline(&|$)/
// @version     7
// @grant       none
// @updateURL   https://gist.github.com/soulweaver91/59b6b73f7c0829168b1c/raw/AniDB_Timeline_Numbering_by_Finished_Date.user.js
// ==/UserScript==

(($) => {
  if (!$) {
    console.error("Failed to load timeline items numbering script!");
    console.log($);
    return;
  }
    
  let completedSeries = $('.g_timeline li .mylist.liststate_completed');
  if (completedSeries.length === 0) {
    // nothing to do
    return;
  }

  let pairs = completedSeries.map((i, el) => {
    return {
      element: el,
      x: el.parentNode.offsetLeft + el.clientWidth
    };
  }).get();

  pairs.sort((p1, p2) => { return p1.x - p2.x; });
  pairs.forEach((item, i) => {
    let link = $(item.element);
    let startDateElem = link.find('.sw_timeline_count_started');
    let elemToAdd = `<span class="sw_timeline_count_finished">#${i + 1} </span>`;
    if (startDateElem.length > 0) {
      startDateElem.after(elemToAdd);
      let startNum = startDateElem.text().trim();
      link.find('.sw_timeline_count_started').append('<small>S</small> / ');
      link.find('.sw_timeline_count_finished').append('<small>F</small> ');
      link.attr('title', `${startNum} (S) / #${i + 1} (F) ${link.attr('title').substr(startNum.length + 1)}`);
    } else {
      link.prepend(elemToAdd);
      link.attr('title', `#${i + 1} ${link.attr('title')}`);
    }
  });
})(window.$ || window.jQuery);