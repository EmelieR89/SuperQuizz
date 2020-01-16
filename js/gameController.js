function random(){
    randomize = parseInt(Math.random() * 100);
}

function higerOrLower() {
  if (number < randomize) {
    document.getElementById("higher").innerHTML += "Higher";
  } else {
    document.getElementById("lower").innerHTML += "Lower";
  }
}
