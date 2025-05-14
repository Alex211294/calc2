document.addEventListener('DOMContentLoaded', function() {
    const calculationType = document.getElementById('calculation-type');
    const formsContainer = document.getElementById('forms-container');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');

    calculationType.addEventListener('change', function() {
        const selectedCalculation = this.value;
        resultContainer.classList.add('hidden');
        
        if (!selectedCalculation) {
            formsContainer.innerHTML = `
                <div class="welcome-message">
                    <h2>Bienvenido a la Calculadora Industrial</h2>
                    <p>Seleccione un cálculo del menú desplegable para comenzar.</p>
                </div>
            `;
            return;
        }

        switch(selectedCalculation) {
            case 'break-even':
                loadBreakEvenForm();
                break;
            case 'efficiency':
                loadEfficiencyForm();
                break;
            case 'roi':
                loadROIForm();
                break;
            case 'productivity':
                loadProductivityForm();
                break;
            case 'inventory':
                loadInventoryForm();
                break;
        }
    });

    function loadBreakEvenForm() {
        formsContainer.innerHTML = `
            <form id="break-even-form">
                <h2>Punto de Equilibrio</h2>
                <p>Calcula la cantidad de unidades que necesitas vender para cubrir tus costos.</p>
                
                <div class="form-group">
                    <label for="fixed-costs">Costos Fijos ($):</label>
                    <input type="number" id="fixed-costs" step="0.01" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="variable-costs">Costos Variables por Unidad ($):</label>
                    <input type="number" id="variable-costs" step="0.01" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="selling-price">Precio de Venta por Unidad ($):</label>
                    <input type="number" id="selling-price" step="0.01" min="0" required>
                </div>
                
                <button type="submit">Calcular</button>
            </form>
        `;

        document.getElementById('break-even-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fixedCosts = parseFloat(document.getElementById('fixed-costs').value);
            const variableCosts = parseFloat(document.getElementById('variable-costs').value);
            const sellingPrice = parseFloat(document.getElementById('selling-price').value);
            
            if (sellingPrice <= variableCosts) {
                resultElement.innerHTML = `
                    <p>El precio de venta debe ser mayor que el costo variable por unidad para tener un punto de equilibrio.</p>
                `;
            } else {
                const breakEvenUnits = fixedCosts / (sellingPrice - variableCosts);
                const breakEvenSales = breakEvenUnits * sellingPrice;
                
                resultElement.innerHTML = `
                    <p>Punto de equilibrio en unidades: <span class="result-value">${breakEvenUnits.toFixed(2)}</span></p>
                    <p>Punto de equilibrio en ventas ($): <span class="result-value">${breakEvenSales.toFixed(2)}</span></p>
                    <p>Esto significa que necesitas vender ${Math.ceil(breakEvenUnits)} unidades ($${breakEvenSales.toFixed(2)}) para cubrir todos tus costos.</p>
                `;
            }
            
            resultContainer.classList.remove('hidden');
        });
    }

    function loadEfficiencyForm() {
        formsContainer.innerHTML = `
            <form id="efficiency-form">
                <h2>Eficiencia de Línea de Producción</h2>
                <p>Calcula el porcentaje de eficiencia de tu línea de producción.</p>
                
                <div class="form-group">
                    <label for="actual-output">Producción Real (unidades):</label>
                    <input type="number" id="actual-output" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="standard-output">Producción Estándar (unidades):</label>
                    <input type="number" id="standard-output" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="operation-time">Tiempo de Operación (horas):</label>
                    <input type="number" id="operation-time" step="0.01" min="0" required>
                </div>
                
                <button type="submit">Calcular</button>
            </form>
        `;

        document.getElementById('efficiency-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const actualOutput = parseFloat(document.getElementById('actual-output').value);
            const standardOutput = parseFloat(document.getElementById('standard-output').value);
            const operationTime = parseFloat(document.getElementById('operation-time').value);
            
            if (standardOutput <= 0 || operationTime <= 0) {
                resultElement.innerHTML = `<p>La producción estándar y el tiempo de operación deben ser mayores que cero.</p>`;
            } else {
                const efficiency = (actualOutput / (standardOutput * operationTime)) * 100;
                
                let evaluation = "";
                if (efficiency > 95) evaluation = "Excelente eficiencia";
                else if (efficiency > 85) evaluation = "Buena eficiencia";
                else if (efficiency > 70) evaluation = "Eficiencia aceptable";
                else evaluation = "Eficiencia baja, necesita mejora";
                
                resultElement.innerHTML = `
                    <p>Eficiencia de la línea: <span class="result-value">${efficiency.toFixed(2)}%</span></p>
                    <p>Evaluación: ${evaluation}</p>
                    <p>La línea está produciendo al ${efficiency.toFixed(2)}% de su capacidad estándar.</p>
                `;
            }
            
            resultContainer.classList.remove('hidden');
        });
    }

    function loadROIForm() {
        formsContainer.innerHTML = `
            <form id="roi-form">
                <h2>Retorno de Inversión (ROI)</h2>
                <p>Calcula el retorno porcentual de una inversión.</p>
                
                <div class="form-group">
                    <label for="net-profit">Ganancia Neta ($):</label>
                    <input type="number" id="net-profit" step="0.01" required>
                </div>
                
                <div class="form-group">
                    <label for="investment-cost">Costo de Inversión ($):</label>
                    <input type="number" id="investment-cost" step="0.01" min="0" required>
                </div>
                
                <button type="submit">Calcular</button>
            </form>
        `;

        document.getElementById('roi-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const netProfit = parseFloat(document.getElementById('net-profit').value);
            const investmentCost = parseFloat(document.getElementById('investment-cost').value);
            
            if (investmentCost <= 0) {
                resultElement.innerHTML = `<p>El costo de inversión debe ser mayor que cero.</p>`;
            } else {
                const roi = (netProfit / investmentCost) * 100;
                
                let evaluation = "";
                if (roi > 50) evaluation = "Excelente retorno";
                else if (roi > 20) evaluation = "Buen retorno";
                else if (roi > 0) evaluation = "Retorno positivo pero bajo";
                else evaluation = "Retorno negativo";
                
                resultElement.innerHTML = `
                    <p>ROI: <span class="result-value">${roi.toFixed(2)}%</span></p>
                    <p>Evaluación: ${evaluation}</p>
                    <p>Por cada dólar invertido, ${roi >= 0 ? 'ganaste' : 'perdiste'} $${Math.abs(roi/100).toFixed(4)}.</p>
                `;
            }
            
            resultContainer.classList.remove('hidden');
        });
    }

    function loadProductivityForm() {
        formsContainer.innerHTML = `
            <form id="productivity-form">
                <h2>Productividad Laboral</h2>
                <p>Calcula la productividad de tus empleados en unidades por hora.</p>
                
                <div class="form-group">
                    <label for="total-output">Producción Total (unidades):</label>
                    <input type="number" id="total-output" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="labor-hours">Horas de Trabajo Totales:</label>
                    <input type="number" id="labor-hours" step="0.01" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="workers">Número de Trabajadores:</label>
                    <input type="number" id="workers" min="1" required>
                </div>
                
                <button type="submit">Calcular</button>
            </form>
        `;

        document.getElementById('productivity-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const totalOutput = parseFloat(document.getElementById('total-output').value);
            const laborHours = parseFloat(document.getElementById('labor-hours').value);
            const workers = parseFloat(document.getElementById('workers').value);
            
            if (laborHours <= 0 || workers <= 0) {
                resultElement.innerHTML = `<p>Las horas de trabajo y el número de trabajadores deben ser mayores que cero.</p>`;
            } else {
                const totalProductivity = totalOutput / laborHours;
                const individualProductivity = totalOutput / (laborHours * workers);
                
                resultElement.innerHTML = `
                    <p>Productividad total: <span class="result-value">${totalProductivity.toFixed(2)} unidades/hora</span></p>
                    <p>Productividad por trabajador: <span class="result-value">${individualProductivity.toFixed(2)} unidades/hora</span></p>
                    <p>Esto significa que en promedio, cada trabajador produce ${individualProductivity.toFixed(2)} unidades por hora.</p>
                `;
            }
            
            resultContainer.classList.remove('hidden');
        });
    }

    function loadInventoryForm() {
        formsContainer.innerHTML = `
            <form id="inventory-form">
                <h2>Punto de Reorden (Modelo EOQ)</h2>
                <p>Calcula la cantidad óptima de pedido y el punto de reorden para inventarios.</p>
                
                <div class="form-group">
                    <label for="demand-rate">Tasa de Demanda Anual (unidades):</label>
                    <input type="number" id="demand-rate" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="order-cost">Costo por Pedido ($):</label>
                    <input type="number" id="order-cost" step="0.01" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="holding-cost">Costo de Mantenimiento por Unidad ($/año):</label>
                    <input type="number" id="holding-cost" step="0.01" min="0" required>
                </div>
                
                <div class="form-group">
                    <label for="lead-time">Tiempo de Entrega (días):</label>
                    <input type="number" id="lead-time" min="0" required>
                </div>
                
                <button type="submit">Calcular</button>
            </form>
        `;

        document.getElementById('inventory-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const demandRate = parseFloat(document.getElementById('demand-rate').value);
            const orderCost = parseFloat(document.getElementById('order-cost').value);
            const holdingCost = parseFloat(document.getElementById('holding-cost').value);
            const leadTime = parseFloat(document.getElementById('lead-time').value);
            
            if (demandRate <= 0 || orderCost <= 0 || holdingCost <= 0) {
                resultElement.innerHTML = `<p>Todos los valores deben ser mayores que cero.</p>`;
            } else {
                // Cálculo de EOQ (Economic Order Quantity)
                const eoq = Math.sqrt((2 * demandRate * orderCost) / holdingCost);
                
                // Cálculo del punto de reorden
                const dailyDemand = demandRate / 365;
                const reorderPoint = dailyDemand * leadTime;
                
                // Número óptimo de pedidos al año
                const optimalOrders = demandRate / eoq;
                
                resultElement.innerHTML = `
                    <p>Cantidad Económica de Pedido (EOQ): <span class="result-value">${Math.round(eoq)} unidades</span></p>
                    <p>Punto de Reorden: <span class="result-value">${Math.ceil(reorderPoint)} unidades</span></p>
                    <p>Número óptimo de pedidos al año: <span class="result-value">${optimalOrders.toFixed(1)}</span></p>
                    <p>Cuando el inventario llegue a ${Math.ceil(reorderPoint)} unidades, debes hacer un pedido de ${Math.round(eoq)} unidades.</p>
                `;
            }
            
            resultContainer.classList.remove('hidden');
        });
    }
});