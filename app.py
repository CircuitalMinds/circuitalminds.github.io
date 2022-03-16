from sys import argv
from os.path import join
from json import load
from os import system
from yaml import full_load


class Site:
    path = join("/", *__file__.split("/")[:-1])
    host = "192.168.50.7"
    port = 8080
    url = dict(
        production="https://circuitalminds.github.io",
        development=f"http://{host}"
    )

    class Config:
        path = "./_config.yml"
        ignores = "\n".join([
            ".env", "*environment", "*__pycache__", "*sass-cache", "*_site"
        ])

        def get(self, name):
            return full_load(open(self.path)).get(name)

        def set(self, key, value):
            old_value = self.get(key)
            if old_value:
                data = open(self.path).read().replace(
                    f'{key}: "{old_value}"',
                    f'{key}: "{value}"'
                )
                with open(self.path, "w") as f:
                    f.write(data)

    def __init__(self):
        self.Config = self.Config()

    def update(self):
        self.Config.set("url", self.url["production"])
        with open(".gitignore", "w") as f:
            f.write(self.Config.ignores)
        system("bash push.sh")
        self.Config.set("url", self.url["development"])

    def run(self):
        params = " ".join([str(getattr(self, i)) for i in ("host", "port")])
        logfile = self.path.replace("site", "dataset/credentials.json")
        system(
            f"bash run.sh {params} {load(open(logfile))['desktop']['pwd']}"
        )


if __name__ == "__main__":
    opts = argv[1:]
    if "run" in opts:
        Site().run()
    elif "update" in opts:
        Site().update()
