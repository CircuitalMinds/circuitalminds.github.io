import json
import requests



json_files = {"table": "table_data.json", "music_data": "music_data.json"}

def save_data(data):
    with open("music_data.json", "w") as outfile:
        json_file = json.dumps(data, indent=4, sort_keys=False)
        outfile.write(json_file)
        outfile.close()

def get_table_data():
    json_data = json.load(open(json_files["table"]))
    print(json_data)
    return json_data

def get_music_data():
    json_data = json.load(open(json_files['music_data']))
    data = []
    for song in json_data['data']:
        data.append({"video_url": song["url"], "video_title": requests.utils.unquote(song["video_title"])})
    json_data['data'] = data
    save_data(json_data)
    
get_music_data()
