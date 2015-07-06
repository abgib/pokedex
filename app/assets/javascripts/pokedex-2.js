Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $pokeLi = $("<li></li>");
  var html = "Name: " + toy.get("name") + " Happiness: "
  + toy.get("happiness") + " Price:" + toy.get("price");
  $pokeLi.text(html)
  $pokeLi.data("pokemon-id", toy.get("pokemon_id"));
  $pokeLi.data("id", toy.get("id"));
  this.$pokeDetail.find("ul.toys").append($pokeLi)

};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $toyDiv = $("<div></div>");
  $toyDiv.addClass("detail");
  var newImg = '<img src="' + toy.get("image_url") + '">'
  $toyDiv.append(newImg)
  var $selectBox = $("<select></select>");
  $selectBox.addClass("owner-selector");
  $selectBox.data("pokemon-id", toy.get("pokemon_id"));
  $selectBox.data("toy-id", toy.get("id"));

  this.pokes.each(function(pokemon){
    var $optStr = $("<option></option>");
    $optStr.val(pokemon.id);
    $optStr.html(pokemon.get("name"));
    if (pokemon.id === toy.get("pokemon_id")){
      console.log(pokemon.get("name"))
      $optStr.prop("selected", true)
    }
    $selectBox.append($optStr);
  })

  $toyDiv.append($selectBox);

  this.$toyDetail.html($toyDiv);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var pokeId = $(event.currentTarget).data("pokemon-id");
  var toyId = $(event.currentTarget).data("id");
  var currentPoke = this.pokes.get(pokeId);
  var currToy = currentPoke.toys().get(toyId);
  this.renderToyDetail(currToy);
};
