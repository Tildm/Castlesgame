var z = function choice(arr){
  let tarto = [];
  let i;
  for(i=0; i<2; i++){
  let randomIndex = Math.floor(Math.random() * arr);
  tarto.push(randomIndex);
  }
  return tarto;
}


export { z };
