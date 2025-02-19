class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.quantity = 1;
    }

    increaseQuantity(amount = 1) {
        this.quantity += amount;
    }

    // decreaseQuantity(amount = 1) {
    //     if (this.quantity > amount) {
    //         this.quantity -= amount;
    //     } else {
    //         return false;
    //     }
    //     return true;
    // }
}

class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.discountRate = 0;
    }

    addItem(item) {
        let existingItem = this.items.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.increaseQuantity();
        } else {
            this.items.push(item);
        }
        return this;
    }

    removeItem(name) {
        const index = this.items.findIndex(i => i.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    // addQuantity(name, amount = 1) {
    //     let item = this.items.find(i => i.name === name);
    //     if (item) {
    //         item.increaseQuantity(amount);
    //         return true;
    //     }
    //     return false;
    // }

    // removeQuantity(name, amount = 1) {
    //     let item = this.items.find(i => i.name === name);
    //     if (item) {
    //         return item.decreaseQuantity(amount);
    //     }
    //     return false; 
    // }

    applyDiscount(percent) {
        if (percent >= 0 && percent <= 100) {
            this.discountRate = percent;
            return true;
        }
        return false; 
    }

    bill() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discountAmount = (this.total * this.discountRate) / 100;
        return this.total - discountAmount;
    }
}

// const cart = new Cart();
// cart.addItem(new Item("Laptop", 1000))
// cart.addItem(new Item("Phone", 500))
// cart.addQuantity("Phone", 2)
// cart.applyDiscount(10)
// cart.print();


module.exports = {Cart, Item}
