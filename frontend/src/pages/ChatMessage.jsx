import React from 'react'
import VideoProvider from '../utils/VideoContext'
import ChatMessageLayout from './ChatMessageLayout'

export default function ChatMessage() {
  return (
    <VideoProvider>
        <ChatMessageLayout/>
    </VideoProvider>
  )
}
