document.querySelectorAll('tr.node').forEach(row => {
    row.addEventListener('click', e => {
        // Ignore clicks on interactive elements
        if (
            e.target.closest('button, a, input, select, textarea')
        ) return;

        const toggle = row.querySelector('.toggle');
        if (!toggle) return;

        toggle.click();
    });
});

document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();

        const row = btn.closest('tr');
        const rowId = row.dataset.id;
        const isOpen = btn.textContent === '▼';

        btn.textContent = isOpen ? '▶' : '▼';

        toggleChildren(rowId, !isOpen);
    });
});

function toggleChildren(parentId, show) {
    const children = document.querySelectorAll(
        `tr[data-parent="${CSS.escape(parentId)}"]`
    );

    children.forEach(child => {
        child.classList.toggle('hidden', !show);

        // Reset toggles & close recursively
        const toggle = child.querySelector(':scope > td .toggle');
        if (toggle && !show) {
            toggle.textContent = '▶';
        }

        if (!show && child.dataset.id) {
            toggleChildren(child.dataset.id, false);
        }
    });
}
