console.log(usedCars[0]);

const usedCarInfoDiv = document.querySelector(".usedCarInfo");

let isFiltered = false;

// create a function that produces an array of cars that meets all filters
function getFilteredCarList(usedCarsArray) {
  // initialize empty array to add filtered cars to
  let filteredCarArray = [];

  usedCarsArray.forEach((car) => {
    let { year, make, model, mileage, price, color, gasMileage } = car;

    // get all of the values from the input form
    const minYear = document.querySelector("#minCarYear").value;
    const maxYear = document.querySelector("#maxCarYear").value;
    const under15000miles = document.querySelector("#under15000");
    const under30000miles = document.querySelector("#under30000");
    let makeCheckboxes = document.getElementsByClassName("carMake");
    const maxPrice = document.querySelector("#maxPrice").value;
    let colorCheckboxes = document.getElementsByClassName("carColor");

    if (year >= minYear || minYear == 0) {
      if (year <= maxYear || maxYear == 0) {
        let noMakeSelected = true;
        let makeMatches = false;
        let noColorSelected = true;
        let colorMatches = false;

        // looping through all car make checkboxes
        // check first to see if any are checked
        for (let i = 0; i < makeCheckboxes.length; i++) {
          // initialize field to tell if the user selected from the checkboxes

          if (makeCheckboxes[i].checked == true) {
            noMakeSelected = false;
          }

          if (
            makeCheckboxes[i].checked == true &&
            makeCheckboxes[i].value == make
          ) {
            makeMatches = true;
          }
        }

        // if the make matches the filter or no filters were applied, move on to the mileage filters
        if (makeMatches == true || noMakeSelected == true) {
          if (
            (under15000miles.checked && mileage <= 15000) ||
            (under30000miles.checked && mileage <= 30000) ||
            (under15000miles.checked == false &&
              under30000miles.checked == false)
          ) {
            // if the price is less than the max price or no price was inputted, continue
            if (price <= maxPrice || maxPrice == 0) {
              // looping through all car make checkboxes
              // check first to see if any are checked
              for (let i = 0; i < colorCheckboxes.length; i++) {
                if (colorCheckboxes[i].checked == true) {
                  noColorSelected = false;
                }

                if (
                  colorCheckboxes[i].checked == true &&
                  colorCheckboxes[i].value == color
                ) {
                  colorMatches = true;
                }
              }
              if (colorMatches == true || noColorSelected == true) {
                // will only push the car to the array if all criteria is met
                filteredCarArray.push(car);
              }
            }
          }
        }
      }
    }
  });

  return filteredCarArray;
}

// remove all children nodes if there was a filtered place on it
// code source: https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// load all product cards on page load
if (isFiltered == false) createProductCards(usedCars);

// output filtered cars list
let submit = document.querySelector("#submitBtn");
submit.addEventListener("click", function () {
  removeAllChildNodes(usedCarInfoDiv);

  const filteredCarArray = getFilteredCarList(usedCars);
  createProductCards(filteredCarArray);
  if (filteredCarArray.length == 0) {
    removeAllChildNodes(usedCarInfoDiv);
    window.alert("No cars found. Please change your criteria and try again.");
  }
  isFiltered = true;
});

// use a for each loop to create the product cards to display
function createProductCards(filteredArray) {
  filteredArray.forEach((car) => {
    // deconstruct usedCar object
    const { year, make, model, mileage, price, color, gasMileage } = car;

    // create div for each used car product car
    const carDiv = document.createElement("div");
    carDiv.setAttribute("class", "card");

    // Create used car header
    const car_title = document.createElement("h1");
    car_title.setAttribute("class", "cardHeader");
    car_title.innerHTML = `${year} ${make} ${model}`;
    carDiv.appendChild(car_title);

    // Create section with other info on the car
    const car_info = document.createElement("p");
    car_info.setAttribute("class", "carInfo");
    car_info.innerHTML = `Color: ${color} <br />
    Mileage: ${mileage} <br />
    Gas Mileage: ${gasMileage}`;
    carDiv.appendChild(car_info);

    // Source of USDollar code: https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // Create price label
    const car_price = document.createElement("h2");
    car_price.setAttribute("class", "price");
    car_price.innerHTML = `${USDollar.format(price)}`;
    carDiv.appendChild(car_price);

    // Create add to cart button
    const addToCart = document.createElement("p");
    addToCart.setAttribute("class", "addToCart");
    addToCart.innerHTML = `<button>Purchase Now`;
    carDiv.appendChild(addToCart);

    usedCarInfoDiv.appendChild(carDiv);
  });
}

let reset = document.querySelector("#resetBtn");
reset.addEventListener("click", function () {
  // clear out old car data
  removeAllChildNodes(usedCarInfoDiv);

  // reset all text input fields
  document.querySelector("#minCarYear").value = "";
  document.querySelector("#maxCarYear").value = "";
  document.querySelector("#maxPrice").value = "";

  // reset color checkboxes
  let colorCheckboxes = document.getElementsByClassName("carColor");
  for (let index = 0; index < colorCheckboxes.length; index++) {
    colorCheckboxes[index].checked = false;
  }

  // reset make checkboxes
  let makeCheckboxes = document.getElementsByClassName("carMake");
  for (let index = 0; index < makeCheckboxes.length; index++) {
    makeCheckboxes[index].checked = false;
  }

  // reset mileage radio buttons
  let mileageRadioBtns = document.getElementsByClassName("mileage");
  for (let index = 0; index < mileageRadioBtns.length; index++) {
    mileageRadioBtns[index].checked = false;
  }

  // redisplay the entire dataset
  const filteredCarArray = getFilteredCarList(usedCars);
  createProductCards(filteredCarArray);
});
