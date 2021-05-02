import json
import os

path = "../../music_containers"
data_containers = ["music_container"]
data_containers.extend([f"music_container_{j}" for j in range(1, 18)])
header = [{"name": "id", "title": "ID", "size": 50, "sortable": "true", "sortDir": "asc", "format": "number"},
          {"name": "name", "title": "Name", "sortable": "true"}]


def save_data(data_files):
    for name in data_files:
        with open(f"{name}.json", "w") as outfile:
            json_file = json.dumps(data_files[name], indent=4, sort_keys=True)
            outfile.write(json_file)
            outfile.close()

def get_songs():
    conts = [f"{path}/pendientes/music_{j}"
             for j in range(1, 8)]
    out_cont = lambda cont, n: cont.replace(f"pendientes/music_{n}", f"music_container_1{n}")
    for n in range(len(conts)):
        dir_path = f"{conts[n]}/videos"
        music_data = os.listdir(dir_path)[0:1]
        for song in music_data:
            print(f"{dir_path}/{song}", out_cont(cont=conts[n], n=n))
get_songs()