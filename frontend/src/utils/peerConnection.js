// src/utils/peerConnection.js
import Peer from "simple-peer";

let peer = null;

export function createPeer(initiator, stream, signalCallback) {
  peer = new Peer({
    initiator,
    trickle: false,
    stream,
  });

  peer.on("signal", signal => {
    console.log("SIGNAL TO BE SENT:", signal);
    signalCallback(signal);
  });

  return peer;
}

export function signalPeer(signal) {
  if (peer) {
    console.log("SIGNAL RECEIVED:", signal);
    peer.signal(signal);
  }
}

export function destroyPeer() {
  if (peer) {
    peer.destroy();
    peer = null;
  }
}

export function getPeer() {
  return peer;
}
