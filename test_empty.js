const dashboard = require('./index');

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
	await dashboard.add_sorted({ name: 'player1', value: 1 });
	await dashboard.add_sorted({ name: 'player2', value: 2 });
	await dashboard.add_sorted({ name: 'player3', value: 3 });
	await dashboard.change_sorted({ name: 'player3', value: 3 });

	await dashboard.remove_sorted({ name: 'player2' });

    await dashboard.bind_screen_element({name: screen_name, element: 'last_beatmaps'});

    //await dashboard.css_apply({selector: 'body', prop: 'background-color', value: '#313131'});

    // await dashboard.emit_event({
    //     feedname: 'last_beatmaps',
    //     type: 'ticker',
    //     title: `тестовое сообщение`,
    // });

	// setInterval( async () => {
	// 	await dashboard.emit_event({
    //     feedname: 'last_beatmaps',
    //     type: 'ticker',
    //     title: `тестовое сообщение`,
    // });
	// }, 2000);
	let player3 = 5;
	setInterval( async () => {
		player3--;
		await dashboard.change_sorted({ name: 'player3', value: player3 });
	}, 1000);
}

main();