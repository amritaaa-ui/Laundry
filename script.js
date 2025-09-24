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
    }


    calculateTotal();
    updateCartMessage();
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

function updateCartMessage() {
    const cartTable = document.getElementById("cartTable");
    const cartMessage = document.getElementById("cartMessage");

    if (cartTable.rows.length <= 1) {
        cartMessage.style.display = "block"; 
    } else {
        cartMessage.style.display = "none"; 
    }
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