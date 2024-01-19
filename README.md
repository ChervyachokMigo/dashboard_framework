set_setting ({name:string, value: boolean})
  available: { name: 'debug', value: boolean }

set_notifies({folder_path: string, Array [{name: string, file: string}...{},]})

add_status({name: string, text: string, values: Array [{name: string,text: string, color: Array [R,G,B] }...{},], status: string})

add_status_item({name: string, item_name: string, text: string, color: Array [R,G,B] })

set_status(Array [{name: string, text: string, values: Array [{name: string,text: string, color: Array [R,G,B] }...{},], status: string}...{},])

change_status({name: string, status: string})

change_text_item({name: string, item_name: string, text: string})

change_status_text({name: string, text: string})

create_feed({feedname: string})

emit_event({feedname: string, type: string, title: string, desc: string, url: string, icon: string, sound: string})

change_event_prop({feedname: string, type: string, propname: string, value: string})

css_apply({selector: string, prop: string, value: string})

run( WEBPORT: Number, SOCKETPORT: Number )






