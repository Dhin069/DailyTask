const { Cart, Item } = require("./cart");

let cart

    beforeEach(
        ()=>{cart = new Cart();}
    )

describe("Adding To Cart", ()=>{
    

    test("Should add a new item to cart", () => {
        cart.addItem(new Item("Phone", 10000))
        expect(cart.items[0].name).toBe("Phone")
        expect(cart.items[0].quantity).toEqual(1)
        expect(cart.items).toHaveLength(1)
    })

    test("Should increment the quantity of existing", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("Phone", 10000))
        expect(cart.items[0].name).toBe("Phone")
        expect(cart.items[0].quantity).toEqual(2)
        expect(cart.items).toHaveLength(1)
    })

    test("Should add to cart, without affecting other items", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("Apple", 10000))
        expect(cart.items[0].name).toBe("Phone")
        expect(cart.items[1].name).toBe("Apple")
        expect(cart.items[0].quantity).toEqual(1)
        expect(cart.items[1].quantity).toEqual(1)
        expect(cart.items).toHaveLength(2)
    })
})


describe("Removing from cart", () => {
    test("Should not remove anything", ()=>{
        expect(cart.removeItem("Phone")).toBe(false)
    })

    test("Should remove the item", ()=>{
        cart.addItem(new Item("Phone", 10000))
        expect(cart.removeItem("Phone")).toBe(true)
        expect(cart.items).toHaveLength(0)
    })

    test("Should remove without affecting other", ()=>{
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        expect(cart.removeItem("BlackBerry")).toBe(true)
        expect(cart.items).toHaveLength(2)
    })


    test("Should not remove itmen when Removing same item ", ()=>{
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        expect(cart.removeItem("BlackBerry")).toBe(true)
        expect(cart.removeItem("BlackBerry")).toBe(false)
        expect(cart.items).toHaveLength(2)
    })
})

describe("Appying Discount", () => {
    test("Should apply discount", ()=>{
        expect(cart.applyDiscount(20)).toBe(true)
        expect(cart.discountRate).toEqual(20)
    })
    
    test("Should not apply discount, when < 0", ()=>{
        expect(cart.applyDiscount(-2)).toBe(false)
        expect(cart.discountRate).toEqual(0)
    })

    test("Should not apply discount, when > 100", ()=>{
        expect(cart.applyDiscount(101)).toBe(false)
        expect(cart.discountRate).toEqual(0)
    })
})




describe("Billing the cart", () => {
    test("Should genrate bill of $0, when it is empty", () => {
        expect(cart.bill()).toEqual(0)
    })

    test("Should deduce discount, and add up", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        cart.applyDiscount(20)
        expect(cart.bill()).toEqual(12800)
    })

    test("Should not deduce discount, and add up", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        expect(cart.bill()).toEqual(16000)
    })

    test("Should not deduce discount, and add up including the quantity", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        cart.addItem(new Item("Phone Stand", 5000))
        expect(cart.bill()).toEqual(31000)
    })

    test("Should deduce discount, and add up including the quantity", () => {
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("Phone", 10000))
        cart.addItem(new Item("BlackBerry", 1000))
        cart.addItem(new Item("Phone Stand", 5000))
        cart.addItem(new Item("Phone Stand", 5000))
        cart.applyDiscount(10)
        expect(cart.bill()).toEqual(27900)
    })
})