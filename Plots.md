<p align="center">
<img src ="https://raw.githubusercontent.com/NateZimmer/Maths.js/master/Images/BannerImage.png">
</p>

## Plot Usage

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
