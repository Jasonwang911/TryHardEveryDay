var compareVersion = function(version1, version2) {
  let arr1 = version1.split('.');
  let arr2 = version2.split('.');
  
  let i = 0;
  while(i< arr1.length || i< arr2.length){
      let v1 = parseInt(arr1[i] || 0);
      let v2 = parseInt(arr2[i] || 0);
      if(v1 > v2){
          return 1;
      }else if(v1 < v2){
          return -1;
      }
      i++;
  }
  return 0;
};

