//from data.js
//variables
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var inputField4 = d3.select("#country");
var inputField5 = d3.select("#shape")
var tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (dataInput) => {

  dataInput.forEach(ufo_sightings => {
    var row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

//Populate table
populate(data);

//Filter by attribute(Why did I do this to myself!!!)
button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = inputField1.property("value").trim();
  var inputCity = inputField2.property("value").toLowerCase().trim();
  var inputState = inputField3.property("value").trim();
  var inputCountry = inputfield4.property("value").trim();
  var inputShape = inputField5.property("value");
  //Filter by field matching input value
  var filterDate = data.filter(data => data.datetime === inputDate);
  console.log(filterDate)
  var filterCity = data.filter(data => data.city === inputCity);
  console.log(filterCity)
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
  console.log(filterData)
  var filterState = data.filter(data => data.state === inputState && data.state ===inputState);
  console.log(filterState)
  var filterCountry = data.filter(data => data.country === inputState && data.country ===inputCountry);
  console.log(filterCountry)
  var filterShape = data.filter(data => data.shape === inputShape && data.shape ===inputShape);
  console.log(filterShape)


  //Add filtered sighting to table
  tbody.html("");

  let response = {
    filterData, filterCity, filterDate, filterState, filterCountry, filterShape
  }

  if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
      populate(filterCity) || populate(filterDate);
  
    }
    else {
      tbody.append("tr").append("td").text("No results found!"); 
    }
})

resetbtn.on("click", () => {
  tbody.html("");
  populate(data)
  console.log("Table reset")
})