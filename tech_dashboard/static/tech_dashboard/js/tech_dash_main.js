document.querySelectorAll('tr.node').forEach(row => {
    row.addEventListener('click', e => {

        // Ignore interactive elements
        if (
            e.target.closest('button, a, input, select, textarea')
        ) return;

        const toggle = row.querySelector(':scope > td .toggle');
        if (!toggle) return;

        toggle.click();
    });
});

document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();

        const row = btn.closest('tr');
        const rowId = row.dataset.id;
        if (!rowId) return;

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

        const toggle = child.querySelector(':scope > td .toggle');
        if (toggle && !show) {
            toggle.textContent = '▶';
        }

        // fermeture récursive
        if (!show && child.dataset.id) {
            toggleChildren(child.dataset.id, false);
        }
    });
}


/* ===============================
   PROGRESS BARS (HIERARCHICAL)
   =============================== */

function updateAllProgressBars() {
    document.querySelectorAll('.progress-bar-value').forEach(bar => {
        const target = bar.dataset.target;
        if (!target) return;

        // techniques concernées
        const techniques = Array.from(
            document.querySelectorAll(
                `tr.leaf[data-path*="${target.replace(/^.*-/, '')}"]`
            )
        );

        if (!techniques.length) return;

        const viewed = techniques.filter(t =>
            t.classList.contains('tech-viewed')
        ).length;

        const percent = Math.round((viewed / techniques.length) * 100);

        bar.style.width = percent + '%';
        bar.textContent = percent + '%';
    });
}


/* ===============================
   CHECKBOX → LIVE UPDATE
   =============================== */

/* TODO Ajouter un date quand on check */
document.querySelectorAll('tr.leaf input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', e => {
        const row = e.target.closest('tr.leaf');

        row.classList.toggle('tech-viewed', e.target.checked);
        updateAllProgressBars();
    });
});


/* ===============================
   INIT
   =============================== */

updateAllProgressBars();
