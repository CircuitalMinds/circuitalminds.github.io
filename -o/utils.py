from pathlib import Path
from subprocess import getoutput
from os import system
base_path = Path(__file__).parent
home_path = Path.home()
host = dict(
    name=getoutput("hostname -I").strip()
)
host["url"] = f"http://{host['name']}"


def run_script(name, *args):
    script = str(base_path.joinpath(name))
    command = f"bash {script}"
    if args:
        command += " " + " ".join([arg for arg in args])
    system(command)
