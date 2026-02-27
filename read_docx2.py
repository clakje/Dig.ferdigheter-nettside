import docx
import sys

try:
    doc = docx.Document(sys.argv[1])
    for para in doc.paragraphs:
        print(para.text)
except Exception as e:
    print("Error:", e)
