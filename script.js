document.getElementById('addProduct').addEventListener('click', () => {
  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const unitInput = document.getElementById('unit');

  const productText = productSelect.options[productSelect.selectedIndex]?.text || '';
  const quantity = parseInt(quantityInput.value, 10);
  const unit = unitInput.value;

  if (!productText || !quantity || !unit) {
    alert('Preencha todos os campos.');
    return;
  }

  const unitValue = parseFloat(unit.match(/\d+/)[0]);
  const unitType = unit.replace(unitValue, '').trim();
  const convertedValue = quantity * unitValue;

  const productList = document.getElementById('productList');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${productText}</td>
    <td>${quantity}</td>
    <td>${unit}</td>
    <td>${convertedValue} ${unitType}</td>
  `;

  productList.appendChild(row);

  productSelect.value = '';
  quantityInput.value = '';
  unitInput.value = '';
});

document.getElementById('sendToWhatsApp').addEventListener('click', () => {
  const rows = document.querySelectorAll('#productList tr');
  if (!rows.length) {
    alert('Adicione pelo menos um produto.');
    return;
  }

  let message = '*Produtos Adicionados:*\n\n';

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const [product, quantity, unit, converted] = Array.from(cells).map(cell => cell.textContent);
    message += `- *${product}*\n  Código: ${product.split(' - ')[0]}\n\n 🔄 Quantidade: ${quantity} (${unit})\n  *Valor Convertido*: ${converted}\n\n`;
  });

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
});
