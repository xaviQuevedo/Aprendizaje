class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    plus(other){
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other){
        return new Vec(this.x - other.x, this.y - other.y);
    }

    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

console.log(new Vec(1,2).plus(new Vec(2,3)));
console.log(new Vec(1,2).minus(new Vec(2,3)));
console.log(new Vec(3,4).length);