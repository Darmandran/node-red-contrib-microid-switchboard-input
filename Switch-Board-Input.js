


module.exports = function(RED) {

    function SwitchBoardNode(config) {
        RED.nodes.createNode(this,config);
        this.board = config.board;
        this.MAC = config.MAC;
		this.input = config.input;
        this.state = config.state;

        var node = this;
        this.on('input', function(msg) {
            
        	var state = node.state;
        	var board = node.board;
            var input = node.input;
        	var MAC = node.MAC;

            if(msg.payload.MAC !== MAC && msg.payload.device !== board) return;

            const {device,temp,status} = msg.payload
            
            validTrigger = false;

            if(msg.payload.deviceShadow.buttonNumber.length>0){
                if(input!="any"){
                    for(key in msg.payload.deviceShadow.buttonNumber){
                        if(msg.payload.deviceShadow.buttonNumber[key] == input){
                            if(state=="BUTTON"){
                                validTrigger = true;
                            }else if(msg.payload.deviceShadow.buttonCondition[input-1] == state){
                                validTrigger = true;
                            }
                        }
                    }
                }else{
                    validTrigger = true
                }
                
                if(!validTrigger)return;

            }else{
                return;
            }  
         
            
            node.send(msg);
        });
    }
    RED.nodes.registerType("Switch-Board-Input",SwitchBoardNode);
}