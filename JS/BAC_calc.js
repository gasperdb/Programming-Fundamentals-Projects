function checksAndProcess(age, weight, gender, amount, time) {
  if (age < 21) {
    alert("What are you doing here? You're not able to drink alcohol" + 
          " legally. Please enter go back and try again.");
  } else if (weight > 240) {
    alert("You're too fat for my program, go lose weight!");
  } else if (weight < 100) {
    alert("You're too damn skinny for this, go eat a burger!");
  } else if (gender === " ") {
    alert("Please tell us if you're male or female.");
  } else if (amount > 10) {
    alert("You've had too many drinks, you might want to consider getting help.");
  } else if (amount < 0) {
    alert("Nice try, put in an actual amount of drinks.");
  } else {
    answer = calculateBAC(weight, gender, amount, time);
    outputArea.innerHTML = answer;
  }
}

function diminishedBAC(percentBAC, time) {
  
  percentBAC *= 100;
  percentBAC -= Math.round(1.5 * time);
  percentBAC /= 100;
  
  if(percentBAC < 0) {
    percentBAC = 0;
  }
  
  return(percentBAC);
}

function calculateBAC(weight, gender, amount, time) {
  var percentBAC;
  var results = "Your Blood Alcohol level is : ";
  var weightIndex;
  
  // BAC values
  var resultsMale = [
    {100: [0.00, 0.04, 0.08, 0.11, 0.15, 0.19, 0.23, 0.26, 0.30, 0.34, 0.38]},
    {120: [0.00, 0.03, 0.06, 0.09, 0.12, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31]},
    {140: [0.00, 0.03, 0.05, 0.08, 0.11, 0.13, 0.16, 0.19, 0.21, 0.24, 0.27]},
    {160: [0.00, 0.02, 0.05, 0.07, 0.09, 0.12, 0.14, 0.16, 0.19, 0.21, 0.23]},
    {180: [0.00, 0.02, 0.04, 0.06, 0.08, 0.11, 0.13, 0.15, 0.17, 0.19, 0.21]},
    {200: [0.00, 0.02, 0.04, 0.06, 0.08, 0.09, 0.11, 0.13, 0.15, 0.17, 0.19]},
    {220: [0.00, 0.02, 0.03, 0.05, 0.07, 0.09, 0.10, 0.12, 0.14, 0.15, 0.17]},
    {240: [0.00, 0.02, 0.03, 0.05, 0.06, 0.08, 0.09, 0.11, 0.13, 0.14, 0.16]}
  ];
  var resultsFemale = [
    {100: [0.00, 0.05, 0.09, 0.14, 0.18, 0.23, 0.27, 0.32, 0.36, 0.41, 0.45]},
    {120: [0.00, 0.04, 0.08, 0.11, 0.15, 0.19, 0.23, 0.27, 0.30, 0.34, 0.38]},
    {140: [0.00, 0.03, 0.07, 0.10, 0.13, 0.16, 0.19, 0.23, 0.26, 0.29, 0.32]},
    {160: [0.00, 0.03, 0.06, 0.09, 0.11, 0.14, 0.17, 0.20, 0.23, 0.26, 0.28]},
    {180: [0.00, 0.03, 0.05, 0.08, 0.10, 0.13, 0.15, 0.18, 0.20, 0.23, 0.25]},
    {200: [0.00, 0.02, 0.05, 0.07, 0.09, 0.11, 0.14, 0.16, 0.18, 0.20, 0.23]},
    {220: [0.00, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.17, 0.19, 0.21]},
    {240: [0.00, 0.02, 0.04, 0.06, 0.08, 0.09, 0.11, 0.13, 0.15, 0.17, 0.19]}
  ];
  
  
  amount = amount--; //change amount of drinks to array-friendly number
  weight = Math.round(weight / 20); // round weight to valid entry
  weightIndex = weight - 5; // get first index for BAC values
  weight *= 20;
  
  
  if(gender === "male") {
    for( var counter = 100 ; counter <= 240 ; counter += 20){
      switch(counter) {
        case weight:
          percentBAC = resultsMale[weightIndex][weight][amount];
          break;
      }
    }
  } else if (gender === "female") {
    for( var counter = 100 ; counter <= 240 ; counter += 20){
      switch(counter) {
        case weight:
          percentBAC = resultsFemale[weightIndex][weight][amount];
          break;
      }
    }
  }
  
  percentBAC = diminishedBAC(percentBAC, time);
  
  results += percentBAC.toFixed(2) + "%";
  
  return(results);
}

function main(){
  var ageInput    = document.getElementById("ageInput");
  var weightInput = document.getElementById("weightInput");
  var genderInput = document.getElementById("genderInput");
  var amountInput = document.getElementById("amountInput");
  var timeInput   = document.getElementById("timeInput");
  var outputArea  = document.getElementById("outputArea");

  calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var answer;
    var age;
    var weight;
    var gender;
    var amount;
    var time;
    
    age    = ageInput.value;
    weight = weightInput.value;
    gender = genderInput.value;
    amount = amountInput.value;
    time   = timeInput.value;

    age = Number(age);
    weight = Number(weight);
    amount = Number(amount);
    time = Number(time);
    
    checksAndProcess(age, weight, gender, amount, time);
  });
}

main();