const _images = {
    list: [],
    pending: []
};

const change_image_html_src = (id, src) => {

    load_image(src).then( ({error, image_html}) => {
        if (error) {
            console.error(error);
            return false;
        }

        const feed_event_selector = `.feed_event[id=feed_event_${id}]`;

        $(feed_event_selector).fadeOut(500, () => {
            delete_outer_feed_elements();
            $(`.feed_event[id=feed_event_${id}] .feed_event_icon`).html(image_html);
            delete_outer_feed_elements();
            $(feed_event_selector).fadeIn(500);
        });

    });
}

const check_local_image = ({id, src}) => {
    const i = _images.list.findIndex( v => v.remote_src === src );

    let image_src = '';

    if (i > -1 ){
        image_src = _images.list[i].src;
    } else {
        socket_send('get_image', {src});
        _images.pending.push({id, src});
        image_src = src;
    }

    change_image_html_src(id, image_src);
}


const change_pending_image_html = ({remote_src, src}) => {
    const i = _images.pending.findIndex( v => v.src === remote_src);
    if (i > -1){
        const id = _images.pending[i].id;
        change_image_html_src(id, src);
        _images.pending.splice(i, 1);
    }
}

const response_image = async ({is_loading = false, remote_src, src }) => {
    if (is_loading){
        return false;
    }

    _images.list.push({remote_src, src});
    change_pending_image_html({remote_src, src});
}

const load_image = async (src) => {
    return new Promise( (resolve, rej) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve ({image_html: img});
        img.onerror = () => resolve ({error: '404'})
    })
}
