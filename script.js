/**
 * QuimiLab - Motor de Reacciones
 * Enfoque: Secundaria - Enlaces Químicos
 */

const QuimiLab = (() => {
    // Estado de la aplicación
    const state = {
        currentElements: [],
        energy: 100,
        score: 0
    };

    // Diccionario de datos químicos (Abstracción didáctica)
    const elementData = {
        'Na': { type: 'metal', valencia: 1 },
        'Cl': { type: 'non-metal', valencia: 7 },
        'Mg': { type: 'metal', valencia: 2 },
        'O':  { type: 'non-metal', valencia: 6 }
    };

    const init = () => {
        setupEventListeners();
    };

    const setupEventListeners = () => {
        const elements = document.querySelectorAll('.element-item');
        const dropZone = document.getElementById('drop-zone');

        elements.forEach(el => {
            el.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.element);
            });
        });

        dropZone.addEventListener('dragover', (e) => e.preventDefault());

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const symbol = e.dataTransfer.getData('text/plain');
            handleElementDrop(symbol);
        });

        document.getElementById('reset-btn').addEventListener('click', resetLab);
    };

    const handleElementDrop = (symbol) => {
        if (state.currentElements.length < 2) {
            state.currentElements.push(symbol);
            updateVisuals();
            
            if (state.currentElements.length === 2) {
                processReaction();
            }
        }
    };

    const processReaction = () => {
        const [el1, el2] = state.currentElements;
        const data1 = elementData[el1];
        const data2 = elementData[el2];
        
        let resultMsg = "";
        let success = false;

        // Lógica Pedagógica de Enlaces
        if (data1.type !== data2.type) {
            resultMsg = `¡Éxito! Enlace IÓNICO formado entre ${el1} y ${el2}.`;
            success = true;
        } else if (data1.type === 'non-metal' && data2.type === 'non-metal') {
            resultMsg = `¡Éxito! Enlace COVALENTE formado entre ${el1} y ${el2}.`;
            success = true;
        } else {
            resultMsg = `Falla: Los metales no suelen formar enlaces estables entre sí.`;
            success = false;
        }

        updateLog(resultMsg, success);
        if (success) updateProgress();
        
        // Pequeña pausa para permitir que el estudiante vea el resultado antes de limpiar
        setTimeout(resetLab, 3000);
    };

    const updateLog = (msg, success) => {
        const history = document.getElementById('reaction-history');
        const entry = document.createElement('li');
        entry.textContent = msg;
        entry.style.color = success ? 'green' : 'red';
        entry.style.fontWeight = 'bold';
        history.prepend(entry);
    };

    const updateProgress = () => {
        state.score += 20;
        state.energy = Math.max(0, state.energy - 5);
        document.getElementById('energy-points').textContent = state.energy;
        if(state.score > 40) document.getElementById('user-rank').textContent = 'Investigador';
    };

    const updateVisuals = () => {
        const chamber = document.getElementById('reaction-visuals');
        chamber.innerHTML = state.currentElements.map(el => 
            `<div class="atom-preview">${el}</div>`
        ).join(' + ');
    };

    const resetLab = () => {
        state.currentElements = [];
        document.getElementById('reaction-visuals').innerHTML = "";
    };

    return { init };
})();

// Iniciar al cargar el DOM
document.addEventListener('DOMContentLoaded', QuimiLab.init);
