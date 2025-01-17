document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value.trim();
    const productQuantity = document.getElementById('productQuantity').value.trim();

    if (productName && productQuantity) {
        const productList = document.getElementById('productList');
        const li = document.createElement('li');
        li.textContent = `${productName} - Quantidade: ${productQuantity}`;
        productList.appendChild(li);

        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
    }
});

document.getElementById('sendToWhatsApp').addEventListener('click', function() {
    const productListItems = document.querySelectorAll('#productList li');
    if (productListItems.length === 0) {
        alert('Adicione produtos antes de enviar!');
        return;
    }

    let message = 'Lista de produtos para saída:\n\n';
    productListItems.forEach((item, index) => {
        message += `${index + 1}. ${item.textContent}\n`;
    });

    const whatsappNumber = '5585999999999'; // Substitua pelo número do WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
});
