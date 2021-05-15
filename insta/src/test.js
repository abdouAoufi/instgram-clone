function collectOddValues(arr) {
  let newArr = [];
  if (arr.length === 0) {
      return;
  }
  if (arr[0] % 2 !== 0) {
      newArr.push(arr[0]);
  }
  newArr = newArr.concat(collectOddValues(arr.slice(1)));
  return newArr;
}

// const result = collectOddValues([1 , 2 , 3 , 4 , 5]);

// console.log(result);

function fabionache(max) {
  let startPoint = [1, 2];
  let currentSum = 0;
  while (currentSum <= max) {
      currentSum = startPoint[startPoint.length - 1] + startPoint[startPoint.length - 2];
      if (currentSum <= max) {
          startPoint.push(currentSum);
      }
  }
  return startPoint;
}

function helper(max) {
  let startPoint = [1, 2];
  function fabionache(max) {
      let currentSum = startPoint[startPoint.length - 1] + startPoint[startPoint.length - 2]; // 3
      if (currentSum >= max) {
          return startPoint;
      }
      startPoint.push(currentSum); // [1 ,2 ,3 ]
      fabionache(max);
  }
  fabionache(max);
  return startPoint;
}

// let rslt = helper(1000);

// console.log(rslt);

// 3 ^ 3
function power(num, pow) {
  if (pow === 0) {
      return 1;
  }
  if (power === 1) {
      return num;
  }
  return num * power(num, --pow);
}

let rslt = power(12, 2);
console.log(rslt);
