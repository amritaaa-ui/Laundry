function addToCart(button, item, price) {
    let cartBody = document.getElementById("cartBody"); // tbody not whole table

    if (button.innerText === "Add To Cart +") {
        // remove empty row if exists
        let emptyRow = cartBody.querySelector(".empty-row");
        if (emptyRow) {
            emptyRow.remove();
        }

        // add new row
        let row = cartBody.insertRow();
        row.setAttribute("data-item", item);
        row.setAttribute("data-price", price);

        row.insertCell(0).innerText = item;
        row.insertCell(1).innerText = "₹" + price;

        // update button
        button.innerText = "Remove from Cart -";
        button.style.color = "red";
    } else {
        // remove row
        let rows = cartBody.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].getAttribute("data-item") === item) {
                cartBody.deleteRow(i);
                break;
            }
        }

        // restore button
        button.innerText = "Add To Cart +";
        button.style.color = "darkgreen";

        // if cart empty → show message row
        if (cartBody.rows.length === 0) {
            let emptyRow = cartBody.insertRow();
            emptyRow.classList.add("empty-row");
            let cell = emptyRow.insertCell(0);
            cell.colSpan = 2;
            cell.style.textAlign = "center";
            cell.style.color = "gray";
            cell.innerText = "No items added yet";
        }
    }

    calculateTotal();
}


function calculateTotal() {

    const cartItems = document.querySelectorAll('#cartTable tr[data-item]');

    let total = 0;

    cartItems.forEach(itemRow => {

        const price = parseFloat(itemRow.getAttribute('data-price'));
        if (!isNaN(price)) {
            total += price;
        }
    });


    document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
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