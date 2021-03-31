import json



def save_data(data):
    with open("music_data.json", "w") as outfile:
        json_file = json.dumps(data, indent=4, sort_keys=False)
        outfile.write(json_file)
        outfile.close()

json_files = [f"music_{j}.json" for j in range(1, 11)]
music_data = {"data": []}

for json_data in json_files:
    _data = list(json.load(open(json_data)).values())
    for song in _data:
        music_data['data'].append(song)        
save_data(music_data)
