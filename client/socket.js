//! import { io } from 'socket.io-client';
//! import { Server } from 'socket.io';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

//* autoconnect is on
// export const socket = io(URL);

//* this prevents the socket from being connected right away
//* we can use socket.connect() to open a connection
// export const socket = io(URL, {
//   autoConnect: false,
// });

// const io = new Server({
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });

// io.listen(4000);
