export default class AllInclusiveBroadcaster {
  constructor(channelName) {
    if (!channelName) channelName = "appChannel";
    this.broadcaster = new BroadcastChannel(channelName);
    this.messageReceiver = new BroadcastChannel(channelName);
    this.listners = [];

    this.messageReceiver.onmessage = (event) => {
      this.listners.forEach((l) => {
        l(event.data);
      });
    };
    this.postmessage = this.postMessage.bind(this);
    this.addListener = this.addListener.bind(this);
  }

  postMessage(data){
    this.broadcaster.postMessage(data);
  }

  addListener(f) {
    this.listners.push(f);
  }
}

/*
var broadcaster = new AllInclusiveBroadcaster((data) => alert(data));

broadcaster.postmessage("Hello BroadcastChannel");
*/
