from sys import argv
from os import system
from subprocess import getoutput
from pathlib import Path
from yaml import full_load
root = Path("./").resolve()
host = getoutput("hostname -I").strip()


def write(filename, data):
    file = root.joinpath(filename)
    if file.is_file():
        file.open("w").write(data)


class Config:

    @staticmethod
    def gitignore():
        file = dict(
            path=root.joinpath(".gitignore"),
            data=[
                ".env", "*__pycache__", "*sass-cache", "*jekyll-cache", "*_site"
            ]
        )

        def update(*names):
            file["path"].open("w").write("\n".join(file["data"] + list(names)))
        file["update"] = update
        return file

    @staticmethod
    def site():
        file = dict(path=root.joinpath("_config.yml"))
        file["data"] = full_load(file["path"].open())

        def update(**data):
            fdata = file["path"].open().read()
            for key, value in data.items():
                if key in file["data"]:
                    fdata = fdata.replace(
                        f'{key}: "{file["data"][key]}"',
                        f'{key}: "{value}"'
                    )
            file["path"].open("w").write(fdata)
            file["data"] = full_load(file["path"].open())
        file["update"] = update
        return file


class Site:
    config = Config.site()
    run_opts = ["serve", "build", "push"]

    def __init__(self):
        self.config["update"](**dict(
            url=f"http://{host}"
        ))

    def push(self):
        Config.gitignore()["update"]()
        self.config["update"](**dict(
            url="https://circuitalminds.github.io"
        ))
        system("bash push")

    def serve(self):
        self.config["update"](**dict(
            url=f"http://{host}"
        ))
        system("bash make.sh serve")

    def build(self):
        self.config["update"](**dict(
            url=f"http://{host}"
        ))
        system(
            f'bash make.sh build {Path.home().joinpath("login").open().read().strip()}'
        )


if __name__ == "__main__":
    opt = argv[1] if len(argv) > 1 else None
    if opt in Site.run_opts:
        site = Site()
        getattr(site, opt)()
