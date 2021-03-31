import json
import requests



json_files = {"table": "table_data.json", "music_data": "music_data.json"}

header = [{"name": "id", "title": "ID", "size": 50, "sortable": "true", "sortDir": "asc", "format": "number"}, 
          {"name": "name", "title": "Name", "sortable": "true"}]

def save_data(data):
    with open("table_data.json", "w") as outfile:
        json_file = json.dumps(data, indent=4, sort_keys=False)
        outfile.write(json_file)
        outfile.close()

def get_table_data():
    music_data = json.load(open(json_files["music_data"]))
    json_data = {'header': header}
    data = []    
    s = 1
    for song in music_data['data']:
        data.append([s, f'<button style="border: 1px solid dark; margin: 0; width: 100%; height: 100%;" class="button fg-teal" onclick="songFromList({s});">{song["video_title"]}</button>'])
        s += 1
    json_data['data'] = data
    save_data(json_data)
    return json_data

def get_music_data():
    json_data = json.load(open(json_files['music_data']))
    data = []
    for song in json_data['data']:
        data.append({"video_url": song["url"], "video_title": requests.utils.unquote(song["video_title"])})
    json_data['data'] = data
    save_data(json_data)
    
get_table_data()
