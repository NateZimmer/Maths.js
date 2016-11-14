<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/BannerImage.png">
</p>
<p align="center"><strong> 

Navigation: <a href='READNE.md'>Home</a> <a href='Matrixs.md'>Matrixs</a> <a href='Plots.md'>Plots</a>

</strong>
</p>

## Maths.js
A math library for javascript with an emphasis on matrix opperations, non linear solvers, and visualization. This library is designed to bring advance mathematical computation to client side javascript and eliminate the need for python/octave/blas calls.  

## Library Usage
Currently Maths.js is intended to be used in browsers so include it in the traditional manner. 
```html
<script type="text/javascript" src="Maths.js"></script>
```
**Maths.js with Plotting**
```html
<script type="text/javascript" src="plotly.min.js"></script>
<script type="text/javascript" src="Maths.js"></script>
```
Maths.js can be used with [plotly](https://github.com/plotly/plotly.js) for visualization of data. 

## Library Application Sample 

**Linear Regression Example:**

This example uses linear least squares to identify a best fitting polynomial to arbitrary data. This example demonstrates the matrix and plotting functionality of libary. 

<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/lsqPlot.png">
</p>


```js
var X = Matrixs.range(-1.2, 0.01, 1.2); 
var Y = X.pow(3).subtract(X).addNoise(0.9); // Y = X^3 - X + noise 

// Create a column matrix for a least square solution [x^3,x^2,x,1] 
var A = X.pow(3).catH(X.pow(2)).catH(X).catH(Matrixs.ones(X.length(),1)); 

var x = A.lsq(Y); // Least squares solution 
var yFit = A.multiply(x); // Ax = Y 
plotyLayout.showlegend= false;
plotyLayout.title= 'Least Square Example'; 
Plots.create([X,Y],{type:'scatter'}); 
Plots.add([X,yFit]);
```

## Basic Matrix Examples  
Maths.js supports numerous matrixs opperations. Below is small sampling and see <strong> [here for the matrixs reference](Matrixs.md). </strong> 

**Matrix Creation:** 
```js
var A = Matrixs.make([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
A.print(); //prints matrix 
//Results 
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000
```

**Matrix Opperations (Addition, Multiplicaiton ...ect):**
One can add or perform any basic matrix opperation with scalars or other matricies. These commands can be sequentially chained. 
```js
var A = Matrixs.make([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
A.add(1).add([[1,2,3],[0,0,0],[0,0,0]]).print(); // adds scalar of 1 to matrix, then adds a 3x3 matrix, then prints result.
//Results
//3.000		5.000		7.000
//5.000		6.000		7.000
//8.000		9.000		6.000
```

**Matrix Inversion:**
Maths.js can invert arbitrary sized(e.g. 100x100) singular and non singular(with SVD) matricies.
```js
var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]); //creates a 3x3 matrix
A.invert().print(); //Prints after inverison. Print is set to 3 decimals 
//Results: 
//-0.639        -0.167		0.306
//-0.056        0.000		0.056
//0.528         0.167      -0.194
```
## Basic Plot Example  

**Simple Line and Scatter Plot :**

Maths.js can easily create plots for visualization. Please see <strong> [here for the plot reference](Plots.md). </strong>   

<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/scatterPlot.png">
</p>


```js
var X = Matrixs.range(100); // Creates a 0-99 value array
var Y = X.addNoise(0.9); // Adds 90% relative noise 
Plots.create([Y],{type:'scatter'}); //Creates scatter plot 
Plots.add([X]); // Adds orange best fit line 
```

## License: MIT
https://opensource.org/licenses/MIT
