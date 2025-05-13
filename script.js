const addProductButton = document.getElementById("add-product");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0; // Variable declared to store the cumulative price of items added to a cart
const cart = []; // Variable declared to initialize as an empty array to store items in a cart

// EventListener to call the function to add product name, product price, and update total price to cart
addProductButton.addEventListener("click", function () {
  const productNameInput = document.getElementById("product-name").value;
  const productPriceInput = parseFloat(
    document.getElementById("product-price").value
  );
  // Checks if proper values are entered for product name (text) and product price (numbers)
  if (productNameInput && !isNaN(productPriceInput)) {
    // If proper values are entered for product name and product price, items are pushed to the cart and total price is updated
    cart.push({ productNameInput, productPriceInput });
    totalPrice += productPriceInput;
    // Calling this function dynamically refreshes total price
    updateCartDisplay();
  } else {
    // Alert that signals if text and numbers aren't entered for values of product name and product price respectively
    alert("Please enter a valid product name and price.");
  }
});

// Function to display cart items dynamically
function updateCartDisplay() {
  // Variable to store cart item data
  const cartItems = document.getElementById("cart");
  // Clear existing cart items
  cartItems.innerHTML = "";
  // forEach() method used to iterate over items added to cart
  cart.forEach((item, index) => {
    // Each cart item is added to an a list tag (li)
    const li = document.createElement("li");
    // Format for display of added product names and product prices
    li.textContent = `${
      item.productNameInput
    } - $${item.productPriceInput.toFixed(2)}`;

    // Variable declaration that references a delete button element created when an item is added to cart
    const deleteProductButton = document.createElement("button");
    deleteProductButton.textContent = "Delete";
    deleteProductButton.style.marginLeft = "10px";

    // EventListener to call the function to delete product name, product price, and update total price to cart
    deleteProductButton.addEventListener("click", () => {
      // Once the delete button is clicked, an item is removed from the cart and total price is updated
      totalPrice -= item.productPriceInput;
      cart.splice(index, 1);
      // Calling this function dynamically refreshes total price
      updateCartDisplay();
    });

    // Appends the deleteProductButton as a child of the li element
    // This places the delete button within the list item
    li.appendChild(deleteProductButton);
    // Appends the li element (which now contains the delete button) as a child of the cartItems element
    // This adds the complete list item, with its associated delete button, to the cartItems container
    cartItems.appendChild(li);
  });

  // This line of code formats the value from totalPrice to a string with two decimal places, then sets the formatted string as text content of the element reference by totalPriceSpan
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
