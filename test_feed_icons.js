const dashboard = require('dashboard_framework');

const main = async () => {
    const colors = { 
        enable: [59, 124, 255], 
        disable: [25, 53, 110], 
        processing: [182, 205, 252],
        neutral: [97, 97, 97]
    };

    const screen_name = 'twitch_chat';

    await dashboard.run(4477,4478);

    await dashboard.set_setting({ name: 'debug', value: true });
	await dashboard.set_setting({ name: 'fullscreen', value: false });
	await dashboard.set_setting({ name: 'mute', value: false });

    await dashboard.create_feed({feedname: 'last_beatmaps'});
    await dashboard.bind_screen_element({name: screen_name, element: 'last_beatmaps'});

	await dashboard.emit_event({
		feedname: 'last_beatmaps',
		type: 'beatmap',
		title: 'Tetoris',
		desc: 'Shigure Ui',
		url: { href: 'https://osu.ppy.sh/beatmapsets/2315418' },
		icon: 'https://assets.ppy.sh/beatmaps/2315418/covers/card.jpg'
	});

}

main();