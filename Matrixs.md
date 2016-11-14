<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/BannerImage.png">
</p>
<p align="center"><strong> 
Navigation: <a href='README.md'>Home</a> | <a href='Matrixs.md'>Matrixs</a> | <a href='Plots.md'>Plots</a>
</strong>
</p>
## Matrix Usage

**Intro:**
Maths.js supports numerous matrixs opperations. This readme displays examples of most of the functionality. Each matrixs object, once created,
and a assortment of commands that can be used with it such as A.invert(). A matrixs object only has 1 property which is its 2D numerical array. 
Most matrixs commands such as A.add(x) support 4 input types. A matrixs object, a 2D array, a 1D array, or a scalar can be the arguments to most
basic commands where applicable. 

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
A.invert().print(); //Prints after inverison. Print is set to 3 decimals 
//Results: 
//-1.917		1.167		-0.250
//1.833			-1.333		0.500
//-0.250		0.500		-0.250
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
Matrixs.multiply(A,B).add(1).print(); //Multiply A & B, add 1 to result, print result 
//Results 
//10.000		13.000		16.000
//20.000		27.000		34.000
//30.000		41.000		52.000
```

**Growing/Concatenation Matrices and Column/Row Fetching**
Matrices can grow horizontally or vertically 
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); //creates a 3x3 matrix 
A.catVertical([9,10,11]).print(); //Vertically appends matrix 
//Results, 3x3 --> 4x3
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000
//9.000		10.000		11.000

A.catHorizontal([[1,1],[2,2],[3,3],[4,4]]).print(); //Horizontally appends matrix 
//Results, 4x3 --> 4x5
//1.000		2.000		3.000		1.000		1.000
//4.000		5.000		6.000		2.000		2.000
//7.000		8.000		5.000		3.000		3.000
//9.000		10.000		11.000		4.000		4.000

A.columns(1,2).print(); // Get 2nd & 3rd columns 
//Result: 
//2.000		3.000
//5.000		6.000
//8.000		5.000
//10.000	11.000

A.rows(2).print(); //Gets 3rd row 
//Result: 
//7.000		8.000		5.000		3.000		3.000
```

**Deleting Rows and Columns:**

```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);
A = A.deleteCol(1);
A.print();
//1.000	3.000
//4.000	6.000
//7.000	9.000
A = A.deleteRow(1);
A.print(); 
//1.000		3.000
//7.000		9.000

```

**Matrix Max,Min,Mean,RMS,Sum and Shape Commands:**

```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); //creates a 3x3 matrix 
A.length(); //Result: 9
A.shape(); // Result: [3,3]
A.max(); // Result: 8 
A.mean(); // Result: 4.55
A.rms(); // Result: 5.04
A.sum(); // Result: 41
A.min(); // Result: 1
A.transpose().print(); 
//Results
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000

```

**Matrix Range:** 
Creates a range of values which can be specified by min,increment,and max. This is useful for creating funcitons and plots. 

```js
A = Matrixs.range(5); // Result 0,1,2,3,4
A = Matrixs.range(-1,3); // Result: -1,0,1,2,3
A = Matrixs.range(0,0.2,1); // Result: 0,0.2,0.4,0.6,0.8,1

```

**Matrix Ident:** 
Creates a range of values which can be specified by min,increment,and max. This is useful for creating funcitons and plots. 

```js
Matrixs.ident(3).print(); //Result: 
//1.000		0.000		0.000
//0.000		1.000		0.000
//0.000		0.000		1.000"

```

**Matrix Ones:** 
Creates a matrixs of ones by user specified dimensions.

```js
Matrixs.ones(3,3).print(); //Result: 
//1.000		1.000		1.000
//1.000		1.000		1.000
//1.000		1.000		1.000

```
 
**Matrix Diag:** 
Gets the diagonal elements of a matrix. 

```js
Matrixs.ones(3,3).add(4).diag().print(); //Result: 
//5.000		0.000		0.000
//0.000		5.000		0.000
//0.000		0.000		5.000

```

**Matrix Fill:** 
Converts a 1D matrix to a 2D Matrix.  

```js
var A = Matrixs.range(8);
A= Matrixs.fill(A,2,4).print(); //Result:
//0.000	1.000	2.000	3.000
//4.000	5.000	6.000	7.000

```

**Matrix Apply:** 
Applies the passed function to each element of a matrix. Useful for creating sine waves or exponential based signals.    

```js
var A = Matrixs.make([[0,1],[2,3]]);
A= A.apply(Math.cos).round(3).print(); //Result:
//1.000	    0.540
//-0.416	-0.990
```

**Matrix Lag:** 
Creates a lag array. 

```js
var A = Matrixs.range(3);
A = A.lag(0,2).print(); //Result:
//0.000	0.000	0.000
//1.000	0.000	0.000
//2.000	1.000	0.000

```

