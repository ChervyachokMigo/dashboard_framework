const { existsSync, mkdirSync, readdirSync } = require("fs-extra");
const path = require("path");
const { play } = require("sound-play");
const md5File = require('md5-file');
const { copyFileSync } = require("fs");

let sounds_folder = null;
let notifies = [];

const SOUNDS_PATH = path.join(__dirname, '..', 'public', 'cache', 'sounds');

module.exports = {
    /**
     * @param folder_path
     * @param sounds
     * @property name
     * @property file
     */
    set_notifies: ({folder_path, sounds}) => {
        if (!existsSync(folder_path)){
            mkdirSync(folder_path, {recursive: true});
            console.error('sounds folder was created. puts in sounds');
            return;
        }

        if (!existsSync(SOUNDS_PATH)){
            mkdirSync(SOUNDS_PATH, {recursive: true});
        }

        sounds_folder = path.join(path.dirname(process.argv[1]), folder_path);

        const files = readdirSync(folder_path, {encoding: 'utf8'});

        for (let {file, name} of sounds) {
            if (!name || !file) {
                console.error('unknown object of sound. read docs');
                break;
            }
            if (files.indexOf(file) > -1 && name.length > 0){
                const src = path.join(sounds_folder, file);
                const md5 = `${md5File.sync(src)}${path.extname(file)}`;
                const dest = path.join(SOUNDS_PATH, md5);
                copyFileSync(src, dest);
                notifies.push({ name, file, md5 });
            }
        }

        return notifies;
    },

    get_notifies: () => {
        return notifies;
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