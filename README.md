## Maths.js
A math library for javascript with an emphasis on arbitrary size matrix opperations. For security reasons, this library does not use eval operator. This library may not be fully speed optimized but is designed for usability.  


## Matrix Usage

**Matrix Creation:** 
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
A.print();		//prints matrix 
//Results 
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000

```

**Matrix Addition:**
One can add scalars or other matricies. Commands can be chained. 
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
A.add(1).add([[1,2,3],[0,0,0],[0,0,0]]).print(); // adds scalar of 1 to matrix, then adds a 3x3 matrix, then prints result.
//Results
//3.000		5.000		7.000
//5.000		6.000		7.000
//8.000		9.000		6.000
```

**Matrix Inversion:**
Maths.js can invert arbitrary sized(e.g. 100x100) non singular matricies
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); //creates a 3x3 matrix 
A.add(1).add([[1,2,3],[0,0,0],[0,0,0]]).print(); // adds scalar of 1 to matrix, then adds a 3x3 matrix, then prints result.
A.invert().print(); //Prints after inverison. Print is set to 3 decimals 
//Results: 
//-0.964		1.179		-0.250
//0.929			-1.357		0.500
//-0.107		0.464		-0.250
```

**Matrix Multiplicaiton:**
A matrix can be multiplied by a scalar, multiplied elemenet wise, and in a tradditional matrix fasion

```js
var A = new Matrixs([[1,2],[3,4],[5,6]]); // 3x2 Matrix 
A.multiply(2).print();
//Results
//2.000		4.000
//6.000		8.000
//10.000	12.000

var B = new Matrixs([[1,2,3],[4,5,6]]); // 3x2 Matrix 
A.multiply(B).print(); //Multiplies a 3x2 by a 2x3 to create a 3x3   
//Results
//18.000		24.000		30.000
//38.000		52.000		66.000
//58.000		80.000		102.000
```

**Static Matrix Usage:**
Matrix library can be used in a static sense to preserve copies of the variables 

```js
var A = new Matrixs([[1,2],[3,4],[5,6]]); // 3x2 Matrix 
var B = new Matrixs([[1,2,3],[4,5,6]]); // 3x2 Matrix 
Matrixs.multiply(A,B).add(1).print()
//Results 
//10.000		13.000		16.000
//20.000		27.000		34.000
//30.000		41.000		52.000
```

**Misc Useful Matrix Commands :**
Here are some useful commands
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); //creates a 3x3 matrix 
A.length(); //Result: 9
A.shape(); // Result: [3,3]
A.max(); // Result: 8 
A.mean(); // Result: 4.55
A.min(); // Result: 1
A.transpose().print(); 
//Results
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000

```
**License: MIT :**
https://opensource.org/licenses/MIT
