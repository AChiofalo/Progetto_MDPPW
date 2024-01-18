"use strict";

class Vendor{

    constructor(id, name, location, description, img){
        this.id = code;
        this.name = name;
        this.location = location;
        this.description = description;
        this.img = img;
    }

    static from(json){
        return new Product(
            json.id,
            json.name,
            json.location,
            json.description, 
            json.img
        ); 
    }
}

export default Vendor;