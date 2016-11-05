<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/BannerImage.png">
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

## Matrix Usage Samples 
Maths.js supports numerous matrixs opperations. Below is small sampling and see [here for the matrixs reference](Matrixs.md).  
**Matrix Creation:** 
```js
var A = Matrixs.make([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
A.print();		//prints matrix 
//Results 
//1.000		2.000		3.000
//4.000		5.000		6.000
//7.000		8.000		5.000
```

**Matrix Addition:**
One can add scalars or other matricies. Commands can be chained. 
```js
var A = Matrixs.make([[1,2,3],[4,5,6],[7,8,5]); //creates a 3x3 matrix 
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
## Plot Usage Samples 

**Simple Line and Scatter Plot :**

```js
var X = Matrixs.range(100); // Creates a 0-99 value array
var Y = X.addNoise(0.9); // Adds 90% relative noise 
Plots.create([Y],{type:'scatter'}); 
Plots.add([X]);
```
<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/scatterPlot.png">
</p>

## License: MIT
https://opensource.org/licenses/MIT
