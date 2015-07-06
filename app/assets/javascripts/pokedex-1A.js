Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $("<li></li>");

  var html = "Name: " + pokemon.get("name") + " Type: " + pokemon.get("poke_type");

  $li.text(html);
  $li.data("id", pokemon.get("id"));
  $li.addClass("poke-list-item");

  this.$pokeList.append($li);



};

Pokedex.RootView.prototype.refreshPokemon = function () {
  var self = this;

  this.pokes.fetch({
    success: function(pokes) {
      pokes.each(function(pokemon){
        self.addPokemonToList(pokemon);
      })
    }
  })

};
