from utils import getenv, setenv
from sys import argv
args = argv[1:]
if len(args) >= 2:
    opt = args[0]
    xargs = args[1:]
    if opt == "get":
        print(getenv(xargs[0]))
    elif opt == "set" and len(xargs) > 1:
        setenv(xargs[0], xargs[1])
