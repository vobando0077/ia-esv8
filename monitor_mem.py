import os
import sys
import time

def vigilar_memoria(pid):
    stat_path = f"/proc/{pid}/status"
    print(f"[*] Echándole un ojo clínico a las tripas del proceso PID {pid}...")
    print(f"[*] Presiona Ctrl+C para cortar la jugada.\n")
    
    try:
        while True:
            if not os.path.exists(stat_path):
                print(f"[-] ¡Aguas! El proceso con PID {pid} ya colgó los tenis (terminó).")
                break
            
            print(f"--- Monitoreo [{time.strftime('%H:%M:%S')}] ---")
            with open(stat_path, "r") as f:
                for line in f:
                    # Filtramos los indicadores clave de memoria
                    if line.startswith(("VmSize", "VmRSS", "VmData", "VmStk")):
                        print(f"    {line.strip()}")
            
            print("-" * 42)
            time.sleep(1) # Pausa de un segundo entre cada ojeada
            
    except KeyboardInterrupt:
        print("\n[+] Monitoreo finalizado por orden del patrón. ¡Fierro!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"[-] Te faltó el dato principal, mi compa.")
        print(f"Uso correcto: python3 {sys.argv[0]} <PID_DEL_PROCESO>")
        sys.exit(1)
        
    vigilar_memoria(sys.argv[1])

