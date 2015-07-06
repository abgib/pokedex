Pokedex.RootView.prototype.reassignToy = function (event) {
  var self = this;
  var oldPokeId = $(event.currentTarget).data("pokemon-id");
  var toyId = $(event.currentTarget).data("toy-id");
  var newPokeId = $(event.currentTarget).find(":selected").val()
  var originalPoke = this.pokes.get(oldPokeId);
  var toy = originalPoke.toys().get(toyId)
  toy.set("pokemon_id", newPokeId)
  toy.save({}, { success: function(toy) {
    originalPoke.toys().remove(toy);
    self.renderToysList(originalPoke.toys());
    self.$toyDetail.html("");
    }
  });
};

Pokedex.RootView.prototype.renderToysList = function (toys) {
  var self = this
  self.$pokeDetail.find(".toys").html("")
  toys.each(function(toy) {
    self.addToyToList(toy);
  })
};
