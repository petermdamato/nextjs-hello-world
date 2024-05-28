export function generateValues(start,end, count) {
    const totalBuffer = (count - 1) * 0
    const totalUnits = ((count - 1) * 3)
    const keyStoneSize = 10
    const stepSize = (end - start - totalBuffer - keyStoneSize) / (totalUnits); // Calculate the step size considering the extra interval

    const values = [];

  for (let i = 0; i <= count; i++) {
    if (i === (count)) {
      values.push(0); 
    } 
    else if (i === 4){
      values.push(start +  keyStoneSize + ((i - 1) * stepSize*3)); 
    } 
    else if (i < 4){
      values.push(start + (i * stepSize*3)); // Push the first four values with stepSize
    } 
    else if (i > 4){
      values.push(start +  keyStoneSize + ((i - 1) * stepSize*3)); 
    } 
  }
  return values;
  }
export function placeWalkthroughFeatures(angle, radius, width, height) {
  const radians = Math.PI / 180;

  return [width / 2 + Math.cos(angle * radians) * radius + (angle < -140 ? 10: 0),height + (Math.sin(angle * Math.PI / 180) * radius)]
}
  export function pickQuadrant(array,value) { 
    let threshold;
    for (let i = 0; i<array.length; i++) {
        if (value > array[i]) {
            threshold = array.length - i - 1
            break
        }
    }

    if (threshold === 3) {
        return [3];
    } else if (threshold < 3) {
        return Array.from({ length: 3 - threshold + 1 }, (_, i) => threshold + i);
    } else {
        return Array.from({ length: threshold - 3 + 1 }, (_, i) => 3 + i).reverse();
    }
  }

  export function findIndices(quadrant, arr, value) {
    const array = arr.reverse()
    let indices = [];

    if (value > (array[quadrant] + array[quadrant+1])/2) { 
      return 'left'
    } else {
      return 'right'
    }
}
export function anglePicker(arr, value) {
  let closestSide = null;
  let closestDistance = Infinity; // Initialize with positive infinity
  
  for (let i = 0; i < arr.length; i++) {
      const entry = arr[i];
      if (entry - 1 <= value && value <= entry + 1) { // Check if value falls within range of entry -1 and entry +1
          const distanceToLower = Math.abs(value - (entry - 1));
          const distanceToUpper = Math.abs(value - (entry + 1));
          
          if (distanceToLower < distanceToUpper && distanceToLower < closestDistance) {
              closestSide = entry - 1;
              closestDistance = distanceToLower;
          } else if (distanceToUpper <= distanceToLower && distanceToUpper < closestDistance) {
              closestSide = entry + 1;
              closestDistance = distanceToUpper;
          } else {
            closestSide = entry
          }
      }
  }
  
  return closestSide || value;
}