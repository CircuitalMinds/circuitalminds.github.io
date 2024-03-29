from sys import argv
from utils import run_script, base_path, host, setenv
from time import sleep
import webbrowser as browser
from multiprocessing import Pool
global procs
procs = []


def open_page():
    sleep(3)
    browser.open(host["url"])


def config_update(mode="development"):
    fpath = base_path.joinpath(f"conf/{mode}.yml")
    file = base_path.joinpath("_config.yml")
    if mode == "development":
        file.open("w").write(
            fpath.open().read().replace(
                "<URL>", host["url"]
            )
        )
    elif mode == "production":
        file.open("w").write(fpath.open().read())


def run(proc):
    proc()


class Main:
    opts = ["serve", "build", "update"]

    @staticmethod
    def update():
        config_update(mode="production")
        setenv("allow-push", "true")
        run_script("push")

    @staticmethod
    def serve():
        config_update(mode="development")
        run_script("make", "serve")

    @staticmethod
    def build():
        config_update(mode="development")
        run_script("make", "build")


if __name__ == "__main__":    
    config_update(mode="development")    
    opt = argv[1] if len(argv) > 1 else None
    if opt in Main.opts:
        procs.append(getattr(Main, opt))
        try:
            with Pool(len(procs)) as p:
                p.map(run, procs)        
        except KeyboardInterrupt as err:
            print(err)
            
