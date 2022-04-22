import requests
import os
import glob

#project = raw_input("Project: ")
project = "at-linda"

path = "assets/"+project+"/data/"
print(" === Removing JS files ===")
for root, dirs, files in os.walk(path):
    for filename in files:
        ext = filename.split(".")[1]
        if ext == "js":
            print("DEL: "+filename)
            os.remove(path+filename)

print(" === Compiling PHP to JS ===")
for root, dirs, files in os.walk(path):
    for filename in files:
        ext = filename.split(".")[1]
        if ext == "php" and filename != "tpl.php" and filename[:4] != "ref_":
            print("CMP: "+filename)
            requests.get('http://55.55.55.55/assets/' +
                         project+'/data/'+filename)
