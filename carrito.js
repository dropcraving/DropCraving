function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Si no hay productos añadidos, no mostrar nada
  if (!carrito.length) {
    document.querySelector('#carrito tbody').innerHTML = `
      <tr><td colspan="5">Tu carrito está vacío 🛒</td></tr>
    `;
    document.getElementById('total-general').textContent = `Total: €0.00`;
    return;
  }

  const tbody = document.querySelector('#carrito tbody');
  const totalGeneral = document.getElementById('total-general');

  tbody.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const totalItem = item.precio * item.cantidad;
    total += totalItem;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.imagen}" alt="${item.nombre}" class="img-carrito"></td>
      <td>${item.nombre}</td>
      <td>€${item.precio.toFixed(2)}</td>
      <td>
        <input type="number" min="0" value="${item.cantidad}" data-index="${index}" class="cantidad" />
      </td>
      <td>€${totalItem.toFixed(2)}</td>
      <td><button data-index="${index}" class="eliminar">❌</button></td>
    `;
    tbody.appendChild(row);
  });

  totalGeneral.textContent = `Total: €${total.toFixed(2)}`;

  // Escuchar cambios de cantidad
  document.querySelectorAll('.cantidad').forEach(input => {
    input.addEventListener('change', (e) => {
      const i = e.target.dataset.index;
      carrito[i].cantidad = parseInt(e.target.value);

      // Eliminar si cantidad = 0
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    });
  });

  // Botones de eliminar
  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = e.target.dataset.index;
      carrito.splice(i, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('carrito')) {
    cargarCarrito();
  }

  const vaciar = document.getElementById('vaciar');
  if (vaciar) {
    vaciar.addEventListener('click', () => {
      localStorage.removeItem('carrito');
      cargarCarrito();
    });
  }
});
