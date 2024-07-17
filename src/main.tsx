import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';


const client = new Ably.Realtime({ key: '-8cGrQ.dqjZGQ:u6YfuuQJkmEaFtHXDBVH07a6oIXYG9fCHo-diVn9WBs' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <ChannelProvider channelName="data-sync">
        <App />
      </ChannelProvider>
    </AblyProvider>
  </React.StrictMode>,
)
