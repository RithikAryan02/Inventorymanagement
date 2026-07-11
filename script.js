let chart;
let editId = null;

function addProduct() {
    let name = document.getElementById("productName").value;
    let qty = document.getElementById("productQty").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;

    if (name === "" || qty === "" || price === "") {
        alert("Please fill all fields");
        return;
    }
    if(editId){

    fetch("update_product.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: `id=${editId}&name=${encodeURIComponent(name)}&category=${category}&qty=${qty}&price=${price}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        editId = null;
        loadProducts();
        clearFields();
    });

    return;
}

    fetch("add_product.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${encodeURIComponent(name)}&category=${category}&qty=${qty}&price=${price}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        loadProducts();
        clearFields();
    })
    .catch(error => console.log(error));
}

function loadProducts() {
  let totalQty = 0;
  let lowStock = 0;
    fetch("get_products.php")
    .then(response => response.json())
    .then(products => {

        let productList = document.getElementById("productList");
        productList.innerHTML = "";

        let totalInventoryValue = 0;

        products.forEach(product => {

            let total = product.quantity * product.price;
            totalInventoryValue += total;
            totalQty += Number(product.quantity);

            if(product.quantity < 5){
            lowStock++;
            }

           let rowClass = product.quantity < 5 ? "low-stock" : "";
            productList.innerHTML += `
                <tr class="${rowClass}">
                    <td>${product.product_name}</td>
                    <td>${product.category}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>${total}</td>
                    <td>
                        <button onclick="editProduct(${product.id}, '${product.product_name}', ${product.quantity}, ${product.price})">
                            Edit
                        </button>
                        <button onclick="confirmDelete(${product.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("totalProducts").innerText = products.length;
        document.getElementById("totalQty").innerText = totalQty;
        document.getElementById("lowStock").innerText = lowStock;

        document.getElementById("totalValue").innerText =
            "Total Inventory Value: ₹" + totalInventoryValue;

        updateChart(products);
    })
    .catch(error => console.log(error));
}
function confirmDelete(id){
    if(confirm("Are you sure you want to delete this product?")){
        deleteProduct(id);
    }
}

function deleteProduct(id) {

    fetch("delete_product.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        loadProducts();
    })
    .catch(error => console.log(error));
}
function editProduct(id, name, qty, price) {

    editId = id;

    document.getElementById("productName").value = name;
    document.getElementById("productQty").value = qty;
    document.getElementById("productPrice").value = price;

}

function clearFields() {
    document.getElementById("productName").value = "";
    document.getElementById("productQty").value = "";
    document.getElementById("productPrice").value = "";
}

function updateChart(products) {
        let labels = products.map(p => p.product_name);
    let quantities = products.map(p => p.quantity);

    if(chart){
        chart.destroy();
    }

    chart = new Chart(
        document.getElementById("inventoryChart"),
        {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Quantity",
                    data: quantities
                }]
            }
        }
    );
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function downloadCSV() {

    let csv = "Product,Category,Quantity,Price\n";

    let rows = document.querySelectorAll("#productList tr");

    rows.forEach(row => {
        let cols = row.querySelectorAll("td");

        if(cols.length >= 4){
            csv += cols[0].innerText + "," +
                   cols[1].innerText + "," +
                   cols[2].innerText + "," +
                   cols[3].innerText + "\n";
        }
    });

    let blob = new Blob([csv], {type:"text/csv"});
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
}
document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#productList tr");

    rows.forEach(row => {

        let product = row.cells[0].innerText.toLowerCase();

        if(product.includes(value)){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

});
