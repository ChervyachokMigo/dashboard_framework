
let _settings = {};

const get_settings = ({ list }) => {
    _settings = {..._settings, ...list};
	for (let name in _settings) {
		const value = _settings[name];
		//print name and value
		console.log(
                'Name:', name,
                'Value:', value,
        )
		switch(name) {
			case 'fullscreen':
				if (value === true){
					$('.fullscreen').removeClass('hidden');
				} else {
					$('.fullscreen').addClass('hidden');
				}
				break;
			case 'mute': 
				if (value === true){
					$('.mute').removeClass('hidden');
				} else {
					$('.mute').addClass('hidden');
				}
		}
	}
}

const get_setting = (name) => {
    return get_value_by_key(_settings, name);
}

const set_setting = ({name, value}) => {
    _settings[name] = value;
}