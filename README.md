## Maths.js
A math library for javascript with an emphasis on arbitrary size matrix opperations. For security reasons, this library does not use eval operator. 


## Matrix Usage

**Matrix Creation:** 
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]);		//creates a 3x3 matrix 
A.print();		//prints matrix 
//Results 
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000

```

**Matrix Addition:**
One can add scalars or other matricies. 
```js
A.add(1).add([[1,2,3],[0,0,0],[0,0,0]]).print(); // Adds scalar of 1 to matrix, then a 3x3 matrix, then prints result
//Results



```

