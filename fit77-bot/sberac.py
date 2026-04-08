import os
from PIL import Image

# KONFIGURACE
INPUT_DIR = "vstupy_od_jardy"
OUTPUT_DIR = "fitness77_final"
MAX_SIZE = (1920, 1080)
QUALITY = 85

# STRUKTURA SLOŽEK
FOLDERS = {
    "interier": "01_Gym_Interier",
    "bazar": "02_Bazar_Stroje",
    "produkty": "03_Produkty_Suplementy",
    "ostatni": "04_Ostatni_Texty"
}

def inicializace():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    for folder_path in FOLDERS.values():
        path = os.path.join(OUTPUT_DIR, folder_path)
        if not os.path.exists(path):
            os.makedirs(path)

def zpracuj_vsechno():
    print(f"*smrk* Jarda-Processor 3.1 (Manual Power) startuje...")
    
    for filename in os.listdir(INPUT_DIR):
        if filename.startswith('.'): continue # Ignorovat systémové soubory Macu
        
        file_path = os.path.join(INPUT_DIR, filename)
        name_lower = filename.lower()
        
        # 1. LOGIKA TŘÍDĚNÍ
        if any(x in name_lower for x in ["gym", "fitko", "prostory", "interier"]):
            target_key = "interier"
        elif any(x in name_lower for x in ["bazar", "prodej"]):
            target_key = "bazar"
        elif any(x in name_lower for x in ["suplement", "produkt", "zbozi", "kreatin", "protein"]):
            target_key = "produkty"
        else:
            target_key = "ostatni"

        target_folder_path = os.path.join(OUTPUT_DIR, FOLDERS[target_key])
        base_name = os.path.splitext(filename)[0]

        # 2. ZPRACOVÁNÍ OBRÁZKŮ
        if name_lower.endswith(('.png', '.jpg', '.jpeg', '.webp', '.heic')):
            try:
                with Image.open(file_path) as img:
                    # Zachování průhlednosti u PNG (pro tvoje ruční ořezy)
                    if img.mode in ('RGBA', 'P') or name_lower.endswith('.png'):
                        img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                        save_path = os.path.join(target_folder_path, f"f77-{target_key}-{base_name}.png")
                        img.save(save_path, "PNG", optimize=True)
                        print(f"PNG (oříznuto ručně): {filename} -> {FOLDERS[target_key]}")
                    else:
                        # Klasický JPG pro interiéry a zbytek
                        img = img.convert("RGB")
                        img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                        save_path = os.path.join(target_folder_path, f"f77-{target_key}-{base_name}.jpg")
                        img.save(save_path, "JPEG", quality=QUALITY, optimize=True)
                        print(f"JPG: {filename} -> {FOLDERS[target_key]}")
            except Exception as e:
                print(f"Chyba u {filename}: {e}")

        # 3. ZPRACOVÁNÍ TEXTŮ
        elif name_lower.endswith(('.txt', '.md', '.docx')):
            import shutil
            new_name = f"TEXT-{filename}"
            shutil.copy2(file_path, os.path.join(target_folder_path, new_name))
            print(f"Text: {filename} -> {FOLDERS[target_key]}")

if __name__ == "__main__":
    if not os.path.exists(INPUT_DIR):
        os.makedirs(INPUT_DIR)
        print(f"Vytvořil jsem '{INPUT_DIR}'. Nasypej tam ty soubory a pusť mě!")
    else:
        inicializace()
        zpracuj_vsechno()
        print(f"\n*smrk* Hotovo, koukoute! Máš to roztříděný. Můžeš to sypat na produkci! 🚀")