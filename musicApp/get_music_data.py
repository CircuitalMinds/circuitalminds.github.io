import json
import requests
import os


path_main = "../../music_containers"
path_containers = [f"{path_main}/music_container"]
path_containers.extend(
    [f"{path_main}/music_container_{n}" for n in range(1, 11)])
header_template = [{"name": "id", "title": "ID", "size": 50, "sortable": "true", "sortDir": "asc", "format": "number"},
                   {"name": "name", "title": "Name", "sortable": "true"}]


def save_data(data, file_name):
    with open(f"{file_name}.json", "w") as outfile:
        json_file = json.dumps(data, indent=4, sort_keys=True)
        outfile.write(json_file)
        outfile.close()


def table_template(index, video_title):
    _template = [f'''<button style="border: 1px solid dark; margin: 0; width: 100%; height: 100%;"''',
                 f'''class="button fg-teal"''',
                 f'''onclick="Api.changeVideo({index});">{video_title}''', f'''</button>''']
    template = ""
    for line in _template:
        template += f"{line} \n"
    return [index, template]


def get_meta_data(data):
    api = "http://127.0.0.1:5000/api/get_youtube_search_song"
    meta_data = json.load(open("./music_meta_tags_list.json"))
    for s in range(len(data)):
        video_title = data[s]["video_title"]
        video_url = data[s]["video_url"]
        if video_title not in list(meta_data.keys()):
            meta_data.update({video_title: requests.get(api, {"video_title": video_title}).json()})
            save_data(data=meta_data, file_name="music_meta_tags_list")
        if meta_data[video_title]["meta_tags"]["name_title"] != "":
            data[s] = {"video_title": meta_data[video_title]["meta_tags"]["name_title"], "video_url": video_url}    
    return meta_data, data


def get_data_list():
    get_data = lambda path: json.load(open(path))['data_list']
    data = {}
    for path in path_containers:
        data_list = get_data(path=f"{path}/data_list.json")        
        for song in data_list:
            video_title = song['video_title'].replace('.mp4', '')
            data[video_title] = song['video_url']
    titles = list(data.keys())
    titles.sort()
    return [{"video_title": title,
             "video_url": data[title]}
            for title in titles]


def get_music_data_list():
    _data_list = get_data_list()
    music_meta_tags_list, music_data_list = get_meta_data(data=_data_list)   
    music_template_list = dict(header=header_template, data=[table_template(index=s+1,
                                                                            video_title=music_data_list[s]['video_title'])
                                                             for s in range(len(music_data_list))])
    save_data(data=dict(music_data_list=music_data_list), file_name="music_data_list")
    save_data(data=music_template_list, file_name="music_template_list")
    return dict(music_data_list=music_data_list), music_template_list, music_meta_tags_list


get_music_data_list()
os.system("cd ../previews/ && python3 head_builders.py")
os.system("cd .. && git init && git add . && git commit -m 'auto'")
os.system("cd .. && git push")
