// ✅ Add to cart or remove from cart
function addToCart(button, item, price) {
    let cartBody = document.getElementById("cartBody"); // tbody, not full table

    if (button.innerText.trim() === "Add To Cart +") {
        // remove empty row if exists
        const emptyRow = cartBody.querySelector(".empty-row");
        if (emptyRow) emptyRow.remove();

        // add new row
        const row = cartBody.insertRow();
        row.dataset.item = item;
        row.dataset.price = price;


        const itemCell = row.insertCell(0);
        const priceCell = row.insertCell(1);

        itemCell.innerText = item;
        priceCell.innerText = "₹" + price;

        // update button
        button.innerText = "Remove from Cart -";
        button.style.color = "red";
    } 
    else {
        // remove row
        [...cartBody.rows].forEach((r) => {
            if (r.dataset.item === item) {
                r.remove();
            }
        });

        // restore button
        button.innerText = "Add To Cart +";
        button.style.color = "darkgreen";

        // if cart empty → show message row
        if (cartBody.rows.length === 0) {
            const emptyRow = cartBody.insertRow();
            emptyRow.classList.add("empty-row");
            const cell = emptyRow.insertCell(0);
            cell.colSpan = 2;
            cell.style.color = "gray";
            cell.style.textAlign = "center";
            cell.innerText = "No items added yet";
        }
    }

    calculateTotal();
}

// ✅ Calculate total price
function calculateTotal() {
    const cartItems = document.querySelectorAll("#cartBody tr[data-item]");
    let total = 0;

    cartItems.forEach(row => {
        const price = parseFloat(row.dataset.price);
        if (!isNaN(price)) total += price;
    });

    document.getElementById("totalPrice").textContent = `₹${total.toFixed(2)}`;
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);


    setTimeout(() => {
        toast.classList.add('show');
    }, 10);


    setTimeout(() => {
        toast.classList.remove('show');

        setTimeout(() => {
            container.removeChild(toast);
        }, 500);
    }, 3000);
}


(function () {
    emailjs.init("PP_qp2wpVWe0o7y1B");
})();




document.getElementById("book-now").addEventListener("click", function () {
    emailjs.send("service_t6n0y5i", "template_5sb54jc", {
        to_name: "Amrita",       // Your name
        from_name: "Website User",
        message: "Thank you for booking our service!"
    })
        .then(function (response) {
            alert("Confirmation email sent!");
        }, function (error) {
            alert("Oops, email failed. You probably typed something wrong");
            console.log("FAILED...", error);
        });
});