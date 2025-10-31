function addToCart(button, item, price) {
    let cartBody = document.getElementById("cartBody");

    if (button.innerText.trim() === "Add To Cart +") {

        const emptyRow = cartBody.querySelector(".empty-row");
        if (emptyRow) emptyRow.remove();

        const row = cartBody.insertRow();
        row.dataset.item = item;
        row.dataset.price = price;


        const itemCell = row.insertCell(0);
        const priceCell = row.insertCell(1);

        itemCell.innerText = item;
        priceCell.innerText = "₹" + price;

        button.innerText = "Remove from Cart -";
        button.style.color = "red";
    }
    else {

        [...cartBody.rows].forEach((r) => {
            if (r.dataset.item === item) {
                r.remove();
            }
        });


        button.innerText = "Add To Cart +";
        button.style.color = "darkgreen";


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
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('ph-num').value.trim();


    if (name && email && phoneNumber) {
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
    } else {
        alert("Please input the required data to proceed.");
    }
}


(function () {
    emailjs.init("PP_qp2wpVWe0o7y1B");
})();




document.getElementById("book-now").addEventListener("click", function () {

    const cartItems = document.querySelectorAll("#cartBody tr[data-item]");
    let itemsList = "";
    let total = 0;


    cartItems.forEach(row => {
        const itemName = row.dataset.item;
        const itemPrice = parseFloat(row.dataset.price);
        itemsList += `${itemName} - ₹${itemPrice.toFixed(2)}\n`;
        total += itemPrice;
    });


    let email2 = document.getElementById('email').value;
    console.log(email2);
    let templateParams = {
        name: "Spongebob",
        message: `Thank you for booking our service!\n\n
        Here are your booked items:\n\n
        ${itemsList}\n
        Total: ₹${total.toFixed(2)}`,
        email: email2,
    };

    emailjs.send("service_t6n0y5i", "template_5sb54jc", templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );
});