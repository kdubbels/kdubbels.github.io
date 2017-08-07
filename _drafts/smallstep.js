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

	reduce(environment) {
		if (this.left.is_reducible()) {
			return new Multiply (this.left.reduce(environment), this.right);
		} else if(this.right.is_reducible()) {
			return new Multiply (this.left, this.right.reduce(environment));
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

	reduce(environment) {
		if (this.left.is_reducible()) {
			return new Multiply (this.left.reduce(environment), this.right);
		} else if(this.right.is_reducible()) {
			return new Multiply (this.left, this.right.reduce(environment));
		} else {
			return new Number(this.left.value * this.right.value);
		}
	}

}

class Machine {
	constructor(expression, environment) {
		this.expression = expression;
		this.environment = environment;
	}

	step() {
		this.expression = this.expression.reduce(this.environment);
	}

	run() {
		while (this.expression.is_reducible()) {
			console.log(this.expression);
			this.step();
		} 

		console.log(this.expression);
		
	}
}

class Boolean {
	constructor(value) {
		this.value = value;
	}

	is_reducible() {
		return false;
	}
}

class LessThan {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	is_reducible() {
		return true;
	}

	reduce(environment) {
		if (this.left.is_reducible()) {
			return new LessThan (this.left.reduce(environment), this.right);
		} else if(this.right.is_reducible()) {
			return new LessThan (this.left, this.right.reduce(environment));
		} else {
			return new Boolean(this.left.value < this.right.value);
		}
	}
}

class Variable {
	constructor(name) {
		this.name = name;
	}

	inspect() {
		console.log(this);
	}

	is_reducible() {
		true
	}

	reduce(environment) {
		return environment.name; //p31
	}
}

//const expression = new Machine(new Add(new Multiply(new Number(1), new Number(2)), new Multiply(new Number(3), new Number(4)))).run();


const expression = new Machine(
						new Add(new Variable('x'), new Variable('y')),
						{ x: new Number(3), y: new Number(4) }).run();




