import os
import re

FINAL = ""

def handleFile(cat, path, file: str):
    global FINAL

    full_path = os.path.join(path, file)

    if not file.endswith(".css"):
        return
    
    componentType = file.removesuffix(".css")

    with open(full_path, "r") as opened:
        receivedContents = opened.read()

        if cat == "components":
            receivedContents = receivedContents.replace("%CR", f"[data-component-type=\"{componentType}\"]")

        FINAL += receivedContents
        opened.close()

def build():
    global FINAL

    dir = os.getcwd()

    target = os.path.join(dir, "styling")

    for item in os.listdir(target):
        path = os.path.join(target, item)

        if os.path.isfile(path):
            print(f"File {item} not allowed in root of styling. Please move the file to it's proper category.")
        else:
            for root, dirs, files in os.walk(path):
                for file in files:
                    handleFile(cat=item, path=root, file=file)
                    print(f"Handled file {file}")

        print("Then")

    print("Started building sbstyles.css")

    sbstyles = os.path.join(dir, "sbstyles.css")
    with open(sbstyles, "w+") as f:
        # I think compact css would be ideal for this
        FINAL = re.sub(r'[\r\n\t]+', '', FINAL)
        f.write(FINAL)

        print("Finished writing, now closing")
        f.close()

    print("Then")

    print("Build finished")

if __name__ == "__main__":
    build()