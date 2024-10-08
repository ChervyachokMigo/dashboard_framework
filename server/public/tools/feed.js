const _FEED = {
    list: []
}

const create_feed_list = ({list}) => {
    log ('create_feed_list', {list});
    
    _FEED.list = list;
    for (let {feedname, stack} of list){
        $('.feed').attr('id', feedname);
        for (let args of stack){
            if ( calculate_feed_elements_width() / $(window).width() < 1 ){
                add_event_to_page('append', {feedname, ...args});
            }
        }
        
    }
}

const recreate_feed_list = () => {
    $('.feed').empty().ready( () => {
        create_feed_list({list: _FEED.list});
    });
}

const feed_event = ({id, type, title, desc, url, icon}) => {
    let url_html_begin = '';
    let url_html_end = '';
    let img_html = '';
	let classname = 'feed_event';
	let style = '';

	if (type === 'ticker') {
		classname = 'feed_event_ticker';
		style += 'top: ' + Math.trunc(Math.random() * 90) + 'vh;';
		setTimeout( () => {
			$(`.feed > #${classname}_${id}`).remove();
		}, 30000);
	}

    if (url && url.href) {
        url_html_begin = `<a href="${url.href}" ${url.title?`title="${url.title}"`:''}>`;
        url_html_end = '</a>';
    }

    if (icon) {
        img_html = `<div class="${classname}_icon"></div>`;
    }

    return `<div class="${classname}" style="${style}" type="${type}" id="${classname}_${id}">` +
        url_html_begin + 
        img_html +
        `<div class="${classname}_title">${title}</div>` +
        `<div class="${classname}_desc">${desc}</div>` +
        `<div class="${classname}_sound"></div>` +
        url_html_end +
    '</div>';
}

const calculate_feed_elements_width = () => {
    const  res = Number(
        $('.feed_event').get().reduce( (width, el) => width + $(el).outerWidth(true), 0) 
    );
    return isNaN(res)? 0 : res;
}

const delete_outer_feed_elements = () => {
    if ($('.feed_event').length > 0){
        while ( calculate_feed_elements_width() / $(window).width() > 1 ) {
            $('.feed').children().last().remove();
        }
    }
}

const add_event_to_page = (method, args) => {
    log ('add_event_to_page', method, args);

    let feed_event_html = feed_event(args);

    let feed_el = $('#'+args.feedname);

    let el_pend = null;

	if (args.type === 'ticker') {
		setTimeout( () => {
			remove_event(args);
		}, 30000);
	}

    switch (method) {
        case 'append':
            el_pend = feed_el.append(feed_event_html);
            break;
        case 'prepend':
            el_pend = feed_el.prepend(feed_event_html);
            break;
        default:
            console.error('error add event method', method);
    }

    el_pend.ready( () => {
        delete_outer_feed_elements();
        if (args.sound){
            create_audio(args.id, get_notify_path(args.sound));
        }
    });    

    if (args.icon){
        check_local_image({id: args.id, src: args.icon});
    }
}

const create_feed = ({feedname}) => {
    if (_FEED.list.findIndex( v => v.feedname === feedname) === -1) {
        _FEED.list.push({feedname, event_idx: new Date().valueOf(), stack: []});
    }
    return _FEED.list.findIndex( v => v.feedname === feedname);
}

const remove_event = ({feedname}) => {
	const i = _FEED.list.findIndex( v => v.feedname === feedname);

    if (i === -1) {
        return false;
    }

	_FEED.list.splice(i, 1);
}

const emit_event = (args) => {
    let i = create_feed(args);
    _FEED.list[i].event_idx = new Date().valueOf();
    _FEED.list[i].stack.unshift(args);
    add_event_to_page('prepend', args);
}



const change_event_prop = ({feedname, type, propname, value}) => {
    const i = _FEED.list.findIndex( v => v.feedname === feedname);

    if (i === -1) {
        return false;
    }

    if (_FEED.list[i].stack.length > 0){
        if (type === 'last' || type === 'first'){
            _FEED.list[i].stack[0][propname] = value;
        } else {
            const idxs = _FEED.list[i].stack.map( (val, idx) => {
                if (val.type === type){
                    return idx; 
                }
            });
            for (let x of idxs) {
                _FEED.list[i].stack[x][propname] = value;
            }
        }
    }

    let feed_event_selector = `.feed_event[type=${type}]`;
    if (type === 'last' || type === 'first'){
        feed_event_selector = `.feed_event:first`;
    }

    switch (propname) {
        case 'title':
            $(`${feed_event_selector}>.feed_event_title`).text(value);
            break;
        case 'desc':
            $(`${feed_event_selector}>.feed_event_desc`).text(value);
            break;
        case 'url':
            if (value){
                if ($(`${feed_event_selector} a`).length === 0) {
                    //нет ссылки
                    let url_begin = `<a href="${value}">`;
                    let url_end = '</a>';
                    $(`${feed_event_selector}`).html(
                        url_begin +
                        $(`${feed_event_selector}`).html() +
                        url_end
                    );
                } else {
                    //изменить ссылку
                    $(`${feed_event_selector} a`).attr('href', value);
                }
            } else {
                //удалить ссылку
                $(`${feed_event_selector}`).html($(`${feed_event_selector} a`).html());
            }
            break;
        default:
            console.error('unknown event prop')
    }
}