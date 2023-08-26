(function ($, window, document) {
  //Ready code
  $(document).ready(function () {
    $(".checkbox-dropdown-title").click(function () {
      $(".checkbox-dropdown").toggleClass("is-active");
    });

    $(".search-input, #search").click(function () {
      $(".checkbox-dropdown").addClass("is-active");
    });

    let catData = [];
    let dropDownVal = $(".checkbox-dropdown-value");
    $(".cat-data").on("click", function () {
      const catVal = $(this).val();
      if (!catData.includes(catVal)) {
        catData.push(catVal);
        $(this).parent().addClass("active");
      } else {
        let newCatArr = catData.filter(function (data) {
          return data !== catVal;
        });
        $(this).parent().removeClass("active");

        catData = newCatArr;
      }

      addSelection(catData);
    });

    $(document).on("click", ".close", function (e) {
      let val = $(this).parent().attr("data-val");
      let newData = catData.filter(function (data) {
        return data !== val;
      });

      catData = newData;
      addSelection(catData);
      $(".cat-data").parent().removeClass("active");

      $.each(catData, function (index, listele) {
        let checkEle = $('[data-val="' + listele + '"]');
        checkEle.parent().addClass("active");
      });
    });

    $("#search").on("input", function () {
      const val = $(this).val();

      filter(val);
    });

    function addSelection(catData) {
      let valArray = catData.map((cat) => {
        return `<li data-val="${cat}">${cat}<button class="close"></button></li>`;
      });

      dropDownVal.html(valArray.join(""));
    }

    function filter(val) {
      const dropdownCat = $(".checkbox-dropdown-list .dropdown-cat");

      $(dropdownCat).each(function () {
        var text = $(this).text();
        text.toLowerCase().indexOf(val.toLowerCase()) > -1
          ? $(this).removeClass("hide")
          : $(this).addClass("hide");
      });

      let catElement = Array.from($(dropdownCat));
      let showError = catElement.every((cat) => {
        return $(cat).hasClass("hide");
      });

      if (showError) {
        if ($(".no-result").length === 0) {
          $(`<div class="no-result">No Category found</div>`).insertAfter(
            ".search-input"
          );
        }
      } else {
        if ($(".no-result").length > 0) {
          $(".no-result").remove();
        }
      }
    }

    $(document).on("click", function (e) {
      let clickEle = e.target;
      if ($(clickEle).closest(".checkbox-dropdown").length === 0) {
        $(".checkbox-dropdown").removeClass("is-active");
      }
    });
  });
})(jQuery, window, document);


