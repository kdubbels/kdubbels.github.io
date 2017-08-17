class Number {
	constructor(value) {
		this.value = value;
	}

	to_s() {
		return value;
	}

	is_reducible() {
		return false;
	}

}

class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} + {this.right}`
	}

	is_reducible() {
		return true;
	}

	reduce() {
		if (this.left.is_reducible()) {
			return new Multiply (this.left.reduce(), this.right);
		} else if(this.right.is_reducible()) {
			return new Multiply (this.left, this.right.reduce());
		} else {
			return new Number(this.left.value + this.right.value);
		}
	}

}

class Multiply {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} * {this.right}`
	}

	is_reducible() {
		return true;
	}

	reduce() {
		if (this.left.is_reducible()) {
			return new Multiply (this.left.reduce(), this.right);
		} else if(this.right.is_reducible()) {
			return new Multiply (this.left, this.right.reduce());
		} else {
			return new Number(this.left.value * this.right.value);
		}
	}

}

class Machine {
	constructor(expression) {
		this.expression = expression;
	}

	step() {
		this.expression = this.expression.reduce();
	}

	run() {
		while (this.expression.is_reducible()) {
			console.log(this.expression);
			this.step();
		} 

		console.log(this.expression);
		
	}
}

const expression = new Machine(new Add(new Multiply(new Number(1), new Number(2)), new Multiply(new Number(3), new Number(4)))).run();