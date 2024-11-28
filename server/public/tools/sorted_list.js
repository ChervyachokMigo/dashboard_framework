const _sorted = {
    list: [],
};

const sort = () => {
	_sorted.list.sort((a, b) => b.value - a.value);
	let sorted_items = $('.sorted_item');
    sorted_items.sort(function(a, b) {
        return parseInt($(b).children('.item_value').text()) - parseInt($(a).children('.item_value').text());
    });
    sorted_items.detach().appendTo('.sorted');
}

const create_sorted_list = ({ list }) => {
    log ('create_sorted_list', {list});
    
    _sorted.list = list;

	$('body').append($('<div class="sorted"></div>'))

    for (let {name, value} of _sorted.list){
        $('.sorted').append(`
			<div class="sorted_item" id="${name}">
				<div class="item_name">${name}</div>
				<div class="item_value">${value}</div>
			</div>`);
    }
}

const sorted_add = ({ name, value }) => {
	if (_sorted.list.findIndex( v => v.name === name) === -1) {
		_sorted.list.push({ name, value });
		
		$('.sorted').append(`
			<div class="sorted_item" id="${name}">
				<div class="item_name">${name}</div>
				<div class="item_value">${value}</div>
			</div>`);

		sort();
		return true;
	}

	return false;
}

const sorted_change = ({ name, value }) => {
	const i = _sorted.list.findIndex( v => v.name === name);

	if (i === -1) {
		return false;
	}

	_sorted.list[i].value = value;

	$(`.sorted > #${name}`).children('.item_value').text(value);
	sort();
	
	return true;
}

const sorted_remove = ({ name }) => {
	const i = _sorted.list.findIndex( v => v.name === name);

	if (i === -1) {
		return false;
	}

	_sorted.list.splice(i, 1);
	$(`.sorted > #${name}`).remove();

	sort();
	return true;
}

const sorted_get_one = ({ name }) => {
	const i = _sorted.list.findIndex( v => v.name === name);

	if (i === -1) {
		return null;
	}

	return _sorted.list[i];
}
