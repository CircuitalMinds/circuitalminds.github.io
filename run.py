from sys import argv
from utils import run_script, base_path


def config_update(mode="development"):
    fpath = base_path.joinpath(f"config/{mode}.yml")
    file = base_path.joinpath("_config.yml")
    if mode == "development":
        file.open("w").write(fpath.open().read())
    elif mode == "production":
        file.open("w").write(fpath.open().read())


class Main:
    opts = ["serve", "build", "push"]

    @staticmethod
    def push():
        config_update(mode="production")
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
    config_update()
    opt = argv[1] if len(argv) > 1 else None
    if opt in Main.opts:
        getattr(Main, opt)()
