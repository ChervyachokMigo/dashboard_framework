const _PROGRESS = {
    list: []
}

const available_props = ['title', 'value', 'max_value'];

const create_progress_item = ({ name, title, value, max_value }) => {
    $('.progress').append(
    `<div class="progress_item" id="${name}">` +
		`<label for="progress_title">${title}</label>` +
		`<progress class="progress_bar" max="${max_value}" value="${value}"></progress>` +
    '</div>');
}

const change_progress_value = ({ name, prop, value }) => {
	const i = _PROGRESS.list.findIndex( v => v.name === name);

	if (i === -1 || available_props.indexOf(prop) === -1 ) {
		return false;
	}

	_PROGRESS.list[i][prop] = value;

	switch (prop) {
		case 'title':
            $(`.progress>.progress_item[id=${name}]>label`).text(value);
            break;
        case 'value':
            $(`.progress>.progress_item[id=${name}]>progress`).val(value);
            break;
        case'max_value':
            $(`.progress>.progress_item[id=${name}]>progress`).attr('max', value);
            break;
        default:
            console.error(`Invalid property: ${prop}`);
            return false;
	}
}

const create_progress_list = ({ list }) => {
    _PROGRESS.list = list;
    for (let args of list){
        create_progress_item(args);
    }
}


const add_progress = ({ name, title, value, max_value }) => {
        if (_PROGRESS.list.findIndex( v => v.name === name) === -1) {
            _PROGRESS.list.push({ name, title, value, max_value });
            return true;
        }

        return false;
}