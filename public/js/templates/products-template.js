"use strict";

import Product from "../product.js";
import {showProduct} from "./product-template.js";

function showProducts(){
    return `    <div class="row row-cols-2 g-2 row-cols-lg-4">
    <div class="col">
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave" >
    </div>
    <div class="col">
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave">
    </div>
    <div class="col">
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave">
    </div>
    <div class="col">
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave">
    </div>
    <div class="col">
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave" >
    </div> 
    <div class="col"> 
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave">
    </div> 
    <div class="col"> 
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave" >
    </div> 
    <div class="col"> 
        <img class="img-fluid" src="./assets/carousel/elissa.jpg" alt="nave" >
    </div>
</div>`

}

export {showProducts} 
