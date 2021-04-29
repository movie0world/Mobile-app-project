class CartItem {
  constructor(quantity, productPrice, productTitle, sum, productImage) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.productImage = productImage;
    this.sum = sum;
  }
}

export default CartItem;
