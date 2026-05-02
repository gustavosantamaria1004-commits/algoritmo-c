const app = {
    state: {
        points: 0,
        currentTab: 'inicio',
        atom: { p: 0, n: 0, e: 0 },
        progress: 0
    },

    init() {
        this.bindEvents();
        this.renderPeriodicTable();
        this.updateUI();
    },

    bindEvents() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    },

    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        this.state.currentTab = tabId;
        this.addPoints(5); // Recompensa por exploración
    },

    addPoints(pts) {
        this.state.points += pts;
        this.state.progress = Math.min(this.state.progress + 2, 100);
        this.updateUI();
    },

    updateUI() {
        document.getElementById('score').innerText = `Puntos: ${this.state.points}`;
        document.getElementById('progress-bar').style.width = `${this.state.progress}%`;
        
        const rankMsg = this.state.points > 100 ? "Científico Senior" : "Recluta";
        document.getElementById('rank').innerText = `Rango: ${rankMsg}`;
    },

    // Lógica del Laboratorio de Átomos
    addParticle(type) {
        this.state.atom[type]++;
        const info = document.getElementById('atom-info');
        const {p, e} = this.state.atom;
        
        let carga = p - e;
        let tipoCarga = carga === 0 ? "Neutro" : (carga > 0 ? "Catión" : "Anión");
        
        info.innerHTML = `Partículas -> P:${p} | E:${e} <br> <strong>Estado: ${tipoCarga} (${carga})</strong>`;
        
        // Retroalimentación inmediata
        this.showFeedback(`¡Partícula ${type} añadida al núcleo!`, "success");
    },

    showFeedback(msg, type) {
        const bar = document.getElementById('feedback-msg');
        bar.innerText = msg;
        bar.style.color = type === "success" ? "var(--accent-green)" : "orange";
    },

    renderPeriodicTable() {
        const container = document.getElementById('periodic-table');
        const elements = [
            {s: 'H', n: 'Hidrógeno', z: 1, c: 'Gas'},
            {s: 'He', n: 'Helio', z: 2, c: 'Noble'},
            {s: 'Li', n: 'Litio', z: 3, c: 'Metal'},
            // ... Se pueden expandir más elementos aquí
        ];

        elements.forEach(el => {
            const div = document.createElement('div');
            div.className = 'el-card';
            div.innerHTML = `<strong>${el.s}</strong><br>${el.z}`;
            div.onclick = () => {
                document.getElementById('element-detail').innerHTML = 
                    `<h3>${el.n} (${el.s})</h3><p>Número Atómico: ${el.z}. Uso común: ${el.c}.</p>`;
                this.addPoints(2);
            };
            container.appendChild(div);
        });
    }
};

// Iniciar aplicación al cargar
window.onload = () => app.init();