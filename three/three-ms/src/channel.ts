export default class AllInclusiveBroadcaster {
  broadcaster: BroadcastChannel;
  messageReceiver: BroadcastChannel;
  listners: Map<string, (data: any) => any>;

  constructor(channelName?: string) {
    if (!channelName) channelName = "appChannel";
    this.broadcaster = new BroadcastChannel(channelName);
    this.messageReceiver = new BroadcastChannel(channelName);
    this.listners = new Map();

    this.messageReceiver.onmessage = (event) => {
      this.listners.forEach((l) => {
        l(event.data);
      });
    };
    this.postMessage = this.postMessage.bind(this);
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  postMessage(data: any){
    this.broadcaster.postMessage(data);
  }

  addListener(name: string, f: (data: any) => any) {
    this.listners.set(name, f);
  }

  removeListener(name: string) {
    this.listners.delete(name);
  }
}

/*
var broadcaster = new AllInclusiveBroadcaster((data) => alert(data));

broadcaster.postmessage("Hello BroadcastChannel");
*/
