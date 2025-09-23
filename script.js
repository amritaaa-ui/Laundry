function addToCart(button, item, price) {
    let cartTable = document.getElementById("cartTable");

    if (button.innerText === "Add To Cart +") {
        // Add row
        let row = cartTable.insertRow();
        row.insertCell(0).innerText = item;
        row.insertCell(1).innerText = "₹" + price;
        row.setAttribute("data-item", item);
        row.setAttribute("data-price", price);

        button.innerText = "Remove from Cart -";
        button.style.color = "red";
        updateCart();
    } else {
        // Remove row
        let rows = cartTable.rows;
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].getAttribute("data-item") === item) {
                cartTable.deleteRow(i);
                break;
            }
        }
        button.innerText = "Add To Cart +";
        button.style.color = "darkgreen";
        updateCart();
    }
}

function updateCart() {
    let rows = document.getElementById("cartBody").rows;
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        total += parseFloat(rows[i].getAttribute("data-price"));
    }

    document.getElementById("totalPrice").innerText = "₹" + total;
}