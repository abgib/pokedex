Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  this.$pokeDetail.html("");
  var self = this
  var $pokeDiv = $("<div></div>")
  $pokeDiv.addClass("detail");
  var pokeImg = '<img src="' + pokemon.get("image_url") + '"><br>'
  $pokeDiv.append(pokeImg);
  for (attr in pokemon.attributes) {
    if (attr != "image_url") {
      $pokeDiv.append(attr + ": " + pokemon.get(attr) + "<br>")
    }
  }

  var $toysUl = $("<ul></ul>");
  $toysUl.addClass("toys");
  pokemon.fetch({success: function(pokemon) {
    self.renderToysList(pokemon.toys())
  }})

  $pokeDiv.append($toysUl);


  this.$pokeDetail.append($pokeDiv);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {

  var id = $(event.currentTarget).data("id");
  var pokemon = this.pokes.get(id)
  this.$toyDetail.html("")

  this.renderPokemonDetail(pokemon);

};
