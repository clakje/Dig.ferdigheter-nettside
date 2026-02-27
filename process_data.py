import os
import json
import shutil

base_dir = r"c:\Kodeprogrammer\prosjekter\Digitale dråpen\faginnhold"
output_dir = r"c:\Kodeprogrammer\prosjekter\Digitale dråpen\src\data"
output_file = os.path.join(output_dir, "mockData.json")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

data = []

if os.path.exists(base_dir):
    for idx, filename in enumerate(os.listdir(base_dir)):
        filepath = os.path.join(base_dir, filename)
        if not os.path.isfile(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            
        lines = content.split('\n')
        title = lines[0].strip() if len(lines) > 0 else "Uten tittel"
        
        # Find first non-empty line after title for short description
        short_desc = ""
        content_start_idx = 1
        for i in range(1, len(lines)):
            if lines[i].strip():
                short_desc = lines[i].strip()
                content_start_idx = i + 1
                break
                
        full_content = "\n".join(lines[content_start_idx:]).strip()
        
        data.append({
            "id": str(idx + 1),
            "title": title,
            "shortDescription": short_desc,
            "fullContent": full_content,
            "keywords": [filename.lower().replace(" ", "-")],
            "icon": "BookOpen"
        })

    with open(output_file, "w", encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully processed {len(data)} files into {output_file}")
    
    # Delete the original folder as requested
    shutil.rmtree(base_dir)
    print(f"Deleted folder {base_dir}")
else:
    print(f"Folder {base_dir} not found.")
