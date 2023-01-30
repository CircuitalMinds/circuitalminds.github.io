from sys import argv
from utils import run_script, base_path, host


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
    config_update(mode="development")
    opt = argv[1] if len(argv) > 1 else None
    if opt in Main.opts:
        getattr(Main, opt)()
