const { existsSync, mkdirSync, readdirSync } = require("fs-extra");
const path = require("path");
const { play } = require("sound-play");

let sounds_folder = null;
let notifies = [];

module.exports = {
    /**
     * @param folder_path
     * @param sounds
     * @property name
     * @property file
     */
    set_notify_sounds: ({folder_path, sounds}) => {
        if (!existsSync(folder_path)){
            mkdirSync(folder_path, {recursive: true});
            console.error('sounds folder was created. puts in sounds');
            return;
        }

        sounds_folder = folder_path;
        const files = readdirSync(folder_path, {encoding: 'utf8'});

        for (let {file, name} of sounds) {
            if (!name || !file) {
                console.error('unknown object of sound. read docs');
                break;
            }
            if (files.indexOf(file) > -1 && name.length > 0){
                notifies.push({name, file});
            }
        }
    },

    get_notify: (name) => {
        const res = notifies.find( v => v.name === name);
        return res;
    },

    play_notify: (name, volume = 1) => {
        const notify = notifies.find( v => v.name === name);
        if (!notify){
            return;
        }
        const workdir = path.dirname(process.argv[1]);
        const notify_filepath = path.join(workdir, sounds_folder, notify.file)
        play(notify_filepath, volume);
    }
}