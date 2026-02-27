import docx
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
try:
    doc = docx.Document(sys.argv[1])
    with open("c:\\Kodeprogrammer\\prosjekter\\Digitale dråpen\\masterplan.txt", "w", encoding="utf-8") as f:
        for para in doc.paragraphs:
            f.write(para.text + "\n")
except Exception as e:
    print("Error:", e)
