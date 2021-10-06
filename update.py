from os import listdir, system
from os.path import isfile, join
is_acepted = lambda x: x not in [
    'Gemfile', 'Gemfile.lock', 'google7719ccdbe085881a.html', '_site',
    'install', 'LICENSE.txt', 'README.md', 'update.py', '_sass', '.git', '.sass-cache', '.idea'
]
get_dirs = lambda x: {x.split('/')[-1]: join(x, y) for y in listdir(x)}
data_update = lambda dir_path: {dir_path.split('/')[-1]: dir_path} if isfile(dir_path) else get_dirs(dir_path)
git_push = lambda branch_name: system(' && '.join([
    f'cd ../{branch_name}', 'git add .', 'git commit -m "deployment"', 'git push'
]))
branches = {'localhost': {}, 'main': {}}


def get_directories(branch_name):
    root = join('../', branch_name)    
    for fi in list(filter(is_acepted, listdir(root))):
        branches[branch_name].update(data_update(join(root, fi)))


def update_files(dir_name):
    fn, gn = [join('../', i, dir_name) for i in ('localhost', 'main')]
    if isfile(fn):
        system(f'cp -u {fn} {gn}')
    else:       
        system(f'cp -u -R {fn} {"/".join(gn.split("/")[:-1])}')                    


[get_directories(br) for br in branches]
[update_files(n) for n in branches['localhost']]
[git_push(br) for br in branches]
