import json
import requests
import os


path_main = "../../audio_containers"
path_containers = [f"{path_main}/audio_container_{n}" for n in range(1, 8)]
header_template = [{"name": "id", "title": "ID", "size": 50, "sortable": "true", "sortDir": "asc", "format": "number"},
                   {"name": "name", "title": "Name", "sortable": "true"}]



def save_data(data, file_name):
    with open(f"{file_name}.json", "w") as outfile:
        json_file = json.dumps(data, indent=4, sort_keys=True)
        outfile.write(json_file)
        outfile.close()


def table_template(index, audio_title):
    _template = [f'''<button style="border: 1px solid dark; margin: 0; width: 100%; height: 100%;"''',
                 f'''class="button fg-teal"''',
                 f'''onclick="Api.changeAudio({index});">{audio_title}''', f'''</button>''']
    template = ""
    for line in _template:
        template += f"{line} \n"
    return [index, template]


def get_data_list():
    get_data = lambda path: json.load(open(path))['data_list']
    data = {}
    for path in path_containers:
        data_list = get_data(path=f"{path}/data_list.json")
        for song in data_list:
            if song['audio_title'].endswith("mp3"):           
                data[song['audio_title'].replace(".mp3", "")] = song['audio_url']
            elif song['audio_title'].endswith("MP3"):                
                data[song['audio_title'].replace(".MP3", "")] = song['audio_url']
    _data_list = list(data.keys())
    _data_list.sort()
    return [{"audio_title": title, "audio_url": data[title]} for title in _data_list]


def get_audio_data_list():
    audio_data_list = get_data_list()
    audio_template_list = dict(header=header_template, data=[table_template(index=s+1,
                                                                            audio_title=audio_data_list[s]['audio_title'])
                                                             for s in range(len(audio_data_list))])
    save_data(data=dict(audio_data_list=audio_data_list), file_name="audio_data_list")
    save_data(data=audio_template_list, file_name="audio_template_list")
    return dict(audio_data_list=audio_data_list), audio_template_list



get_audio_data_list()
os.system("cd .. && git init && git add . && git commit -m 'auto'")
os.system("cd .. && git push")
