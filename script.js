window.onload = function() {

  var calorieCounter = {
    meals: {},
    calories: 0,
    chart: null,
    isGraphed: false,
    Meal: function() {
      this.items = {},
      this.calories = 0;
    },

    sumCalories: function() {
      this.calories = 0;
      for(meal in this.meals) {
        this.calories += this.meals[meal].calories;
      }
    },

    addMeal: function(name) {
      this.meals[name] = new this.Meal();
      this.sumCalories();
    },
    removeMeal: function(name) {
      if(!this.meals[name]){
        return false;
      } else {
        delete this.meals[name];
        return true;
      }
      this.sumCalories();
    },


    addItem: function(meal, item) {
      if(!this.meals[meal]) {
        this.meals[meal] = new this.Meal();
      }
      this.meals[meal].items[item.name] = item.calories;
      this.meals[meal].calories += item.calories;
      this.sumCalories();
    },
    removeItem: function(meal, itemName) {
      if(!this.meals[meal]) {
        return false;
      } else if(!this.meals[meal].items[itemName]) {
        return false;
      } else {
        this.meals[meal].calories -= this.meals[meal].items[itemName];
        delete this.meals[meal].items[itemName];
        return true;
      }
      this.sumCalories();
    },


    summarizeCalories: function() {
      var html = '<thead><tr><th>Meal</th><th>Calories</th></tr></thead><tbody>';

      for(meal in this.meals) {
        html += `<tr>
                   <td>${meal}</td>
                   <td>${this.meals[meal].calories}</td>
                 </tr>`
      }

      html += `<tr>
                 <td>Total</td>
                 <td>${this.calories}</td>
               </tr>
            </tbody>`;

      calorieTable.innerHTML = html;
    },

    summarizeItems: function() {
      var html = '<thead><tr><th>Meal</th><th>Item</th><th>Calories</th></tr></thead><tbody>';


      for(meal in this.meals) {
        for(item in this.meals[meal].items) {
          html += `<tr>
                     <td>${meal}</td>
                     <td>${item}</td>
                     <td>${this.meals[meal].items[item]}</td>
                   </tr>`;
        }
      }
      html += '</tbody>'
      itemTable.innerHTML = html;
    },
    graph: function() {
      var mealItems = [];
      for(meal in this.meals) {
        mealItems.push(this.meals[meal].items);
      }

      var names =  [];
      var calories = [];
      mealItems.forEach(function(meal) {
        for(item in meal) {
          names.push(item);
          calories.push(meal[item]);
        }
      });

      if(!this.isGraphed) {
        console.log('graphing');
        var ctx = document.getElementById('itemBar').getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: names,
            datasets: [{
              label: 'Calories Per Item',
              backgroundColor: 'limegreen',
              data: calories,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }]
            }
          }
        });
        this.isGraphed = true;
      } else {
        console.log('updating');
        this.chart.data.labels = names;
        this.chart.data.datasets[0].data = calories;
        this.chart.update();
      }
    }
  };

  var addMealButton = document.getElementById("addMealButton");
  var addMealInput = document.getElementById("addMealInput");

  var removeMealButton = document.getElementById("removeMealButton");
  var removeMealInput = document.getElementById("removeMealInput");

  var addItemButton = document.getElementById("addItemButton");
  var newItemMeal = document.getElementById("newItemMeal");
  var newItem = document.getElementById("newItem");
  var newItemCalories = document.getElementById("newItemCalories");

  var removeItemButton = document.getElementById("removeItemButton");
  var itemToRemoveMeal = document.getElementById("itemToRemoveMeal");
  var itemToRemove = document.getElementById("itemToRemove");

  var itemTable = document.getElementById("itemTable");
  var calorieTable = document.getElementById("calorieTable");

  addMealButton.addEventListener('click', function() {
    if(addMealInput.value === '') {
      return;
    } else {
      calorieCounter.addMeal(addMealInput.value);
      calorieCounter.summarizeCalories();
      calorieCounter.summarizeItems();
      addMealInput.value = '';
    }
  });

  removeMealButton.addEventListener('click', function() {
    if(removeMealInput.value === '') {
      console.log('Please fill out all fields');
    } else {
      if(calorieCounter.removeMeal(removeMealInput.value)) {
        removeMealInput.value = '';
        calorieCounter.summarizeCalories();
        calorieCounter.summarizeItems();
        calorieCounter.graph();
      } else {
        console.log('This meal wasn\'t added');
      }

    }
  });

  addItemButton.addEventListener('click', function() {
    if(newItem.value === '' || newItemCalories.value === '' || newItemMeal.value === '') {
      console.log('Please fill out all fields');
    } else {
      var item = {
        name: newItem.value,
        calories: parseInt(newItemCalories.value),
      };
      calorieCounter.addItem(newItemMeal.value, item);
      newItem.value = '';
      newItemCalories.value = '';
      newItemMeal.value = '';
      calorieCounter.summarizeCalories();
      calorieCounter.summarizeItems();
      calorieCounter.graph();
    }
  });

  removeItemButton.addEventListener('click', function() {
    if(itemToRemoveMeal.value === '' || itemToRemove.value === '') {
      console.log('Please fill out all fields');
    } else {
      if(calorieCounter.removeItem(itemToRemoveMeal.value, itemToRemove.value)) {
        itemToRemoveMeal.value = '';
        itemToRemove.value = '';
        calorieCounter.summarizeCalories();
        calorieCounter.summarizeItems();
        calorieCounter.graph();
      } else {
        console.log('This item wasn\'t added');
      }
    }
  });


};
