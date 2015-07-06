Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  console.log("trying to add");
  var newPokemon = new Pokedex.Models.Pokemon(attrs);
  var callback = callback || function(){}

  newPokemon.save({},
      { success: function(model) {
        console.log("success!");
      this.pokes.push(model);
      this.addPokemonToList(model);
      callback(model);
    }.bind(this), error: function() {
      alert("That pokemon is invalid!");
    }}
  )
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var attrs = $(event.currentTarget).serializeJSON()
  this.createPokemon(attrs.pokemon, this.renderPokemonDetail.bind(this));
};
