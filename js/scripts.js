//Business Logic
function Order() {
  this.pizzas = [];
  this.price = 0;
}
Order.prototype.setPrice = function() {
  let runningTotal = 0;
  this.pizzas.forEach(function(pizza) {
    runningTotal += pizza.price;
  });
  this.price = runningTotal;
  return runningTotal;
}

function CustomPizza(dough, sauce, proteins, veggies, others, size, count) {
  this.dough = dough;
  this.sauce = sauce;
  this.proteins = proteins;
  this.veggies = veggies;
  this.others = others;
  this.size = size;
  this.quantity = count;
  this.price = 0;
}
CustomPizza.prototype.setPrice = function() {
  let runningTotal = 0; //dough selection does not factor in - Za Za Land doesn't punish people for having allergies.
  switch (this.sauce) {
    case "Rustic Marinara Sauce":
      runningTotal += 0;
      break;
    case "Olive Oil":
      runningTotal += 0;
      break;
    case "House-made Pesto Sauce":
      runningTotal += 0;
      break;
    case "Mushroom Cream Sauce":
      runningTotal += 0;
      break;
    case "NO Sauce":
      runningTotal += 0;
      break;
  }
  this.proteins.forEach(function(protein) {
    runningTotal += 1.00;
  });
  this.veggies.forEach(function(veggie) {
    runningTotal += 0.50;
  });
  this.others.forEach(function(other) {
    runningTotal += 0.25;
  });
  runningTotal *= (this.quantity * ((this.quantity > 1) ? 0.9 : 1)); //multiple pizzas of the same kind are discounted.
  this.price = runningTotal;
  return runningTotal;
}

//UI Logic
let fullOrder = new Order();
$(document).ready(function() {
  $("form#custom-za").submit(function(event) {
    event.preventDefault();

    let userProteins = [];
    let userVeggies = [];
    let userOthers = [];

    $("input:checkbox[name=proteins]:checked").each(function() {
      const protein = $(this).val();
      userProteins.push(protein);
    });
    $("input:checkbox[name=veggies]:checked").each(function() {
      const veggie = $(this).val();
      userVeggies.push(veggie);
    });
    $("input:checkbox[name=others]:checked").each(function() {
      const other = $(this).val();
      userOthers.push(other);
    });

    let newPizza = new CustomPizza(false, "Olive Oil", userProteins, userVeggies, userOthers, 8, 1);
    newPizza.setPrice();
    fullOrder.pizzas.push(newPizza);
    fullOrder.setPrice();
  });
});
