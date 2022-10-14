from pathlib import Path
from json import load, dumps
from yaml import full_load
from subprocess import getoutput
from os import system
base_path = Path(__file__).parent
home_path = Path.home()


def getconf(filepath):
    return full_load(
        Path(str(filepath)).open()
    )


def run_script(name, *args):
    script = str(base_path.joinpath(name))
    command = f"bash {script}"
    if args:
        command += " " + " ".join([arg for arg in args])
    system(command)


def get_host():
    return getoutput("hostname -I").strip()


def writefile(filename, data):
    file = base_path.joinpath(filename)
    if file.is_file():
        file.open("w").write(data)


def getjson(filepath):
    return load(Path(str(filepath)).open())


def savejson(filepath, data):
    Path(str(filepath)).open("w").write(dumps(
        data,
        **dict(
            indent=4, 
            sort_keys=True,
            ensure_ascii=False
        )
    ))
