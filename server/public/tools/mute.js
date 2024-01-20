let volume = 1;
let mute = false;

const change_volume = () => {
    for (let i in $('audio')){
        $('audio')[i].volume = volume;
    }
}

const toggle_mute = () => {
    mute = !mute;
    volume = mute ? 0 : 1;
    console.log(mute, volume);
}

$('.mute').on('click', (e) => {
    toggle_mute();
    $('.mute img').attr('src', mute? 'images/unmute.png' :'images/mute.png' );
    change_volume();
});

const load_sound = async (src) => {
    return new Promise( (resolve, rej) => {
        let au = new Audio();
        au.src = get_notify_path(src);
        if (extname(src) === '.mp3') {
            au.type = "audio/mpeg";
        }
        au.preload = "auto";
        au.autoplay = true;
        au.volume = volume;
        au.onload = () => resolve ({audio_html: au});
        au.onerror = () => resolve ({error: '404'});
    })
}

const create_audio = (id, src) => {
    load_sound(src).then( ({error, audio_html}) => {
        if (error) {
            console.error(error);
            return false;
        }

        const feed_event_selector = `.feed_event[id=${id}]`;
        
        $(feed_event_selector).ready( () => {
            delete_outer_feed_elements();
            $(`.feed_event[id=${id}] .feed_event_sound`).html(audio_html);
        });

    });
}