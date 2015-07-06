window.Pokedex = (window.Pokedex || {});
window.Pokedex.Models = {};
window.Pokedex.Collections = {};

Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: "/pokemon",
  toys: function(){
    var self = this
    if (typeof self._toys === "undefined") {
      self._toys = new Pokedex.Collections.PokemonToys();
      console.log("created new toys collection")
    }
    return self._toys;
  },
  parse: function(payload) {
    var self = this
    if (typeof payload.toys !== "undefined") {
        self.toys().set(payload.toys)
        delete payload.toys;
      }
    return payload;
  }

}); // WRITE ME

Pokedex.Models.Toy = Backbone.Model.extend({
  url: function() {
    return "/toys/" + this.get("id")}
}) // WRITE ME IN PHASE 2

Pokedex.Collections.Pokemon = Backbone.Collection.extend({
  url: "/pokemon",
  model: Pokedex.Models.Pokemon
}); // WRITE ME

Pokedex.Collections.PokemonToys = Backbone.Collection.extend({
  url: "/toys",
  model: Pokedex.Models.Toy
})

window.Pokedex.Test = {
  testShow: function (id) {
    var pokemon = new Pokedex.Models.Pokemon({ id: id });
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  },

  testIndex: function () {
    var pokemon = new Pokedex.Collections.Pokemon();
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  }
};

window.Pokedex.RootView = function ($el) {
  this.$el = $el;
  this.pokes = new Pokedex.Collections.Pokemon();
  this.$pokeList = this.$el.find('.pokemon-list');
  this.$pokeDetail = this.$el.find('.pokemon-detail');
  this.$newPoke = this.$el.find('.new-pokemon');
  this.$toyDetail = this.$el.find('.toy-detail');

  this.$el.on("click", ".poke-list-item", this.selectPokemonFromList.bind(this));
  this.$el.on("submit", ".new-pokemon", this.submitPokemonForm.bind(this));
  this.$el.on("click", ".toys li", this.selectToyFromList.bind(this));
  this.$el.on("change", ".owner-selector", this.reassignToy.bind(this));
}

$(function() {
  var $rootEl = $('#pokedex');
  window.Pokedex.rootView = new Pokedex.RootView($rootEl);
  window.Pokedex.rootView.refreshPokemon();
});
