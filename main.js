/*
  main.js — AWIEwagen
  ───────────────────
  One job: category filter.
  Click a filter button → show only cards matching that category.
*/

(function () {

  /* 1. Grab all filter buttons and all car cards */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var carCards      = document.querySelectorAll('.car-card');

  /* 2. Listen for clicks on each button */
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {

      /* 2a. Mark this button active, remove active from siblings */
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      /* 2b. Read the chosen category from the data-filter attribute */
      var chosen = btn.dataset.filter;

      /* 2c. Show or hide each card based on its data-category */
      carCards.forEach(function (card) {
        if (chosen === 'all' || card.dataset.category === chosen) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

    });
  });

}());
