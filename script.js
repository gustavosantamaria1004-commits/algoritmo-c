/**
 * LÓGICA DE QUIMILAB: ENLACES
 * Mantenible, escalable y accesible.
 */

const QuimiLab = {
    state: {
        score: 0,
        elementsInReactor: [],
        isLocked: false
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.shelf = document.getElementById('shelf');
        this.reactor = document.getElementById('drop-zone');
        this.display = document.getElementById('reaction-display');
        this.log = document.getElementById('feedback-log');
        this.scoreEl = document.getElementById('score');
        this.rankEl = document.getElementById('rank');
        this.clearBtn = document.getElementById('clear-btn');
    },

    bindEvents() {
        // Drag and Drop API
        const elements = document.querySelectorAll('.element');
        elements.forEach(el => {
            el.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', JSON.stringify(el.dataset));
            });
        });

        this.reactor.addEventListener('dragover', e => e.preventDefault());
        this.reactor.addEventListener('drop', e => this.handleDrop(e));
        this.clearBtn.addEventListener('click', () => this.resetReactor());
    },

    handleDrop(e) {
        e.preventDefault();
        if (this.state.isLocked || this.state.elementsInReactor.length >= 2) return;

        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        this.state.elementsInReactor.push(data);
        this.updateDisplay();

        if (this.state.elementsInReactor.length === 2) {
            this.evaluateReaction();
        }
    },

    updateDisplay() {
        this.display.innerHTML = this.state.elementsInReactor
            .map(el => `<span class="atom-preview">${el.symbol}</span>`)
            .join(' + ');
    },

    evaluateReaction() {
        this.state.isLocked = true;
        const [a, b] = this.state.elementsInReactor;
        
        let success = false;
        let type = "";

        // LÓGICA DIDÁCTICA
        if ((a.type === 'metal' && b.type === 'non-metal') || (a.type === 'non-metal' && b.type === 'metal')) {
            success = true;
            type = "IÓNICO (Transferencia de electrones)";
        } else if (a.type === 'non-metal' && b.type === 'non-metal') {
            success = true;
            type = "COVALENTE (Comparten electrones)";
        }

        if (success) {
            this.addLog(`✅ ¡Compuesto creado! Enlace ${type}`, 'success');
            this.updateScore(10);
        } else {
            this.addLog(`❌ Los metales puros no suelen formar enlaces iónicos/covalentes entre sí.`, 'error');
        }

        setTimeout(() => this.resetReactor(), 3000);
    },

    addLog(msg, status) {
        const p = document.createElement('p');
        p.className = `msg-${status}`;
        p.textContent = `> ${msg}`;
        this.log.prepend(p);
    },

    updateScore(pts) {
        this.state.score += pts;
        this.scoreEl.textContent = this.state.score;
        if (this.state.score >= 30) this.rankEl.textContent = "Investigador";
    },

    resetReactor() {
        this.state.elementsInReactor = [];
        this.state.isLocked = false;
        this.display.innerHTML = "";
    }
};

document.addEventListener('DOMContentLoaded', () => QuimiLab.init());
