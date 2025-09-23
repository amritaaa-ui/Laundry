function addToCart(button, item, price) {
    let cartTable = document.getElementById("cartTable");

    if (button.innerText === "Add To Cart +") {
        let row = cartTable.insertRow();
        row.insertCell(0).innerText = item;
        row.insertCell(1).innerText = "₹" + price;
        row.setAttribute("data-item", item);
        row.setAttribute("data-price", price);

        button.innerText = "Remove from Cart -";
        button.style.color = "red";
        updateCart();
    } else {
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

