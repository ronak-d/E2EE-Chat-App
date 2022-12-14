const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket is active");

  socket.on("chat", (payload) => {

    // Nodejs encryption
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // encryption
    function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
    // decryption
    function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    }

    // msg encrypting
    let msg = payload.message;

    var gfg = encrypt(msg);
    console.log(gfg);
    console.log(`decrypted ${decrypt(gfg)}`);

    console.log("payload", {payload});
    // console.log(io.emit("chat", payload)); //true

    // modifying msg to decrypting msg
    payload.message=decrypt(gfg);

    io.emit("chat", payload);
  });
});


server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
