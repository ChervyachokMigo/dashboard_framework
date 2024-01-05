
var connection = new WebSocket("ws://localhost:8888");

$(document).ready(function(){
    connection.send(JSON.stringify({action: "bot_restart"}));
});

connection.onopen = () => {
    connection.onclose = (ev=>{
        console.error('connection close');
        console.log(ev);
        location.reload();
    });
    
    connection.onerror = (err=>{
        console.error('connection error');
        console.log(err);
        location.reload();
    });

    connection.send(JSON.stringify({action: "connect"}));
};

connection.onmessage = (data) => {

    if (!isJSON(data.data)) {
        console.error('is not json');
        return false;
    }

    var data_json = JSON.parse(data.data);

};

    function isJSON(str) {
        try {
            JSON.parse(str.toString());
        } catch (e) {
            return false;
        }
        return true;
    }