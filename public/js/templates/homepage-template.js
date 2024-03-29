"use strict";

/**
 * 
 * @param {Array} bestProducts 
 * @returns HTML string
 */
function showHomepage(bestProducts){
    return `  
    <div class="container col-md-6">
        <div id="carouselHomepage" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselHomepage" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselHomepage" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselHomepage" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="./assets/carousel/elissa.jpg" class="d-block w-100 img-fluid" alt="Elissa">
          </div>
          <div class="carousel-item">
            <img src="./assets/carousel/Pianta.jpg" class="d-block w-100 img-fluid" alt="Pianta">
          </div>
          <div class="carousel-item">
            <img src="./assets/carousel/spiagge-ai-caraibi1.jpg" class="d-block w-100 img-fluid" alt="Spiagge">
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselHomepage" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselHomepage" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>

    </div>
    `  
}

export{showHomepage};