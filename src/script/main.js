import "./custelement/featured.js";
import $ from "jquery";

const main = () => {
  const generateFeatured = () => {
    let html = "";
    $.ajax({
      type: "GET",
      url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      dataType: "JSON",
      success: function (response) {
        html += `
        <div>
            <img src="${response.drinks[0]["strDrinkThumb"]}" alt="Picture of ${response.drinks[0]["strDrink"]}">
            <h3>${response.drinks[0]["strDrink"]}</h3>
            <p>Category: (${response.drinks[0]["strAlcoholic"]}) ${response.drinks[0]["strCategory"]}</p>
            <button class="howto" id="howto" data-id="${response.drinks[0]["idDrink"]}">How to Make</button>
        </div>
        `;
        $("#featured").html(html);
      },
    });
  };
  generateFeatured();

  const howTo = (id) => {
    let ingred = "";
    let modalHTML = "";
    $.ajax({
      type: "GET",
      url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php`,
      data: {
        i: id,
      },
      dataType: "JSON",
      success: function (response) {
        let ing = "";
        let mea = "";

        for (let i = 1; i <= 15; i++) {
          if (
            response.drinks[0][`strIngredient${i}`] != null &&
            response.drinks[0][`strMeasure${i}`] != null
          ) {
            ing = response.drinks[0][`strIngredient${i}`];
            mea = response.drinks[0][`strMeasure${i}`];
            ingred += `
                <li>${response.drinks[0][`strIngredient${i}`]}
                ( ${response.drinks[0][`strMeasure${i}`]})</li>
                `;
          }
        }

        modalHTML += `
        <span class="tutup"><i class="fa-solid fa-xmark"></i></span>
        <h2>How to Make ${response.drinks[0]["strDrink"]}</h2>
        <h3>Ingredients:</h3>
        <ul>
        ${ingred}
        </ul>

        <h3>Glass:</h3>
        <p>${response.drinks[0]["strGlass"]}</p>
        <h3>Instructions:</h3>
        <p>${response.drinks[0]["strInstructions"]}</p>
        `;
        $(".isimodal").html(modalHTML);
      },
    });
  };

  const searchDrink = (searchKey) => {
    let htmlCardSearch = "";
    $.ajax({
      type: "GET",
      url: `https://www.thecocktaildb.com/api/json/v1/1/search.php`,
      data: {
        s: searchKey,
      },
      dataType: "JSON",
      success: function (response) {
        for (let i in response.drinks) {
          htmlCardSearch += `
          <div class="cardHasil">
            <img src="${response.drinks[i]["strDrinkThumb"]}" alt="">
            <h2>${response.drinks[i]["strDrink"]}</h2>
            <p>Category: (${response.drinks[i]["strAlcoholic"]}) ${response.drinks[i]["strCategory"]}</p>
            <button id="howto" class="howto" data-id="${response.drinks[i]["idDrink"]}">How to Make</button>
          </div>
          `
        }
        $('#hasilSearch').html(htmlCardSearch);
      },
    });
  };
  searchDrink("");
  
  $('#searchbar').on('keyup', function(){
    const ketikanSearch = $(this).val();
    searchDrink(ketikanSearch);
  })

  $(document).on("click", "#howto", function () {
    let idMinum = $(this).data("id");
    howTo(idMinum);
    $("#inimodal").attr("style", "display: block");
  });

  $(document).on("click", ".tutup", function () {
    $("#inimodal").attr("style", "display: none");
  });

  $("#refresh").on("click", function () {
    generateFeatured();
  });

  $("#refresh").hover(
    function () {
      $(this).html('<i class="fa-solid fa-arrows-rotate"></i>');
    },
    function () {
      $(this).html(
        '<i class="fa-solid fa-arrows-rotate" style="color: #ffffff;"></i>'
      );
    }
  );
};

export default main;
