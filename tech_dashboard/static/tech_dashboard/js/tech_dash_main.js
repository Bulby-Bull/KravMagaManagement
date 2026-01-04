/*document.addEventListener("click", function (e) {
  const header = e.target.closest(".node-header");
  if (!header) return;

  const node = header.parentElement;
  node.classList.toggle("open");
});*/

document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const rowId = row.dataset.id;
        const isOpen = btn.textContent === '▼';

        btn.textContent = isOpen ? '▶' : '▼';

        toggleChildren(rowId, !isOpen);
    });
});

function toggleChildren(parentId, show) {
    const children = document.querySelectorAll(
        `tr[data-parent="${parentId}"]`
    );

    children.forEach(child => {
        child.classList.toggle('hidden', !show);

        const toggle = child.querySelector('.toggle');
        if (toggle && !show) {
            toggle.textContent = '▶';
        }

        // Recursively close grandchildren
        if (!show && child.dataset.id) {
            toggleChildren(child.dataset.id, false);
        }
    });
}