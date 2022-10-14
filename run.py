from sys import argv
from os.path import join
from utils import getconf, get_host, run_script, base_path, getjson, savejson


class Data:
    path = base_path.joinpath("_data")
    files = {}

    def __init__(self):
        for i in self.path.iterdir():
            self.files[i.name.split(".json")[0]] = getjson(i)
    
    def get(self, name):
        return self.files.get(name)

    def set(self, name, key, value):
        self.files[name].update({key: value})
        savejson(
            self.path.joinpath(name + "json"),
            self.files[name]
        )


class Config:
    production = dict(
        site=dict(url="https://circuitalminds.github.io"),
        api=dict(url="https://circuitalminds.herokuapp.com")
    )
    production.update(dict(
        site=dict(static_url=join(production["site"]["url"], "static"))
    ))

    development = dict(site=dict(url=f"http://{get_host()}"))
    development.update(dict(
        site=dict(
            static_url=f'{development["site"]["url"]}:8080/static'
        ),
        api=dict(
            url=f'{development["site"]["url"]}:8080'
        )
    ))

    api = dict(file=base_path.joinpath("_data/api.yml"), data=dict())
    site = dict(file=base_path.joinpath("_config.yml"), data=dict())

    def __init__(self, mode="development"):
        data = dict()
        if mode == "development":
            data = self.development
        elif mode == "production":
            data = self.production
        self.api["data"] = getconf(self.api["file"])
        self.api["data"].update(data["api"])
        self.site["data"] = getconf(self.site["file"])
        self.site["data"].update(data["site"])

    def update(self):
        def writefile(filepath, **data):
            textfile = filepath.open().read()
            datafile = getconf(filepath)
            for key, value in data.items():
                if key in datafile:
                    textfile = textfile.replace(
                        f'{key}: "{datafile[key]}"',
                        f'{key}: "{value}"'
                    )
            filepath.open("w").write(textfile)
        for x in (self.api, self.site):
            writefile(x["file"], **x["data"])
        self.api["data"] = getconf(self.api["file"])
        self.site["data"] = getconf(self.site["file"])


class Run:
    opts = ["serve", "build", "push"]

    def push(self):
        Config(mode="production").update()
        run_script("push")

    def serve(self):
        Config().update()
        run_script("make", "serve")

    def build(self):
        Config().update()
        run_script("make", "build")


if __name__ == "__main__":
    opt = argv[1] if len(argv) > 1 else None
    if opt in Run.opts:
        f = Run()
        getattr(f, opt)()
