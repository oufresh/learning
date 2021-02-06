export class AllInclusiveBroadcaster {  
    constructor(listener, channelName) {
    if (!channelName) channelName = "appChannel";
    this.broadcaster = new BroadcastChannel(channelName);
    this.messageReceiver = new BroadcastChannel(channelName);

    this.messageReceiver.onmessage = (event) => {
        listener(event.data);
    }
    }

  postmessage(data) {
    this.broadcaster.postMessage(data);
  }
}

/*
var broadcaster = new AllInclusiveBroadcaster((data) => alert(data));

broadcaster.postmessage("Hello BroadcastChannel");
*/