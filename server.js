const express = require("express");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require("cors");
const Messages = require("./models/dbMessages");
const User = require("./models/userMessages");
const web3 = require("web3");
const getRevertReason = require("eth-revert-reason");
const app = express();
const axios = require("axios");

// const pusher = new Pusher({
//   appId: "1652621",
//   key: "7d36bdde720f38ec83d4",
//   secret: "c0008b976e36fff2c70b",
//   cluster: "ap2",
//   useTLS: true,
// });

app.use(express.json());
app.use(cors());

const connection_url =
  "mongodb+srv://Pulkit_Jain:Pna1a2Y8jQKml61a@cluster0.mpfu8wk.mongodb.net/";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// db.once("open", async () => {
//   console.log("db connected");

//   const msgCollection = await db.collection("messagecontents");
//   const changeStream = await msgCollection.watch();
//   changeStream.on("change", async (change) => {
//     if (change.operationType === "insert") {
//       const messageDetails = await change.fullDocument;

//       await pusher.trigger("messages", "inserted", {
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//         received: messageDetails.received,
//       });
//       console.log("triggering pusher");
//     } else {
//       console.log("error triggering pusher");
//     }
//   });
// });
fetch;
//   res.status(200).send(allData);
// });

// app.post("/createUser", async (req, res) => {
//   const { name, email } = req.body;
//   const userPresent = await User.findOne({ email: email });
//   if (userPresent) {
//     res.status(200).send(userPresent);
//   } else {
//     const msg = await User.create({ name: name, email: email });
//     res.status(200).send(msg);
//   }
// });

// app.get("/fetchMessages", async (req, res) => {
//   // Messages.find((err, data) => {
//   //   if (err) {
//   //     res.status(500).send(err);
//   //   } else {
//   //     res.status(200).send(data);
//   //   }
//   // });
//   const allData = await Messages.find({});
//   res.status(200).send(allData);
//   console.log("888888888888888888");
// });
const networks = [
  {
    name: "ethMainnet",
    rpc: "wss://mainnet.gateway.tenderly.co	",
    abiUrl: "",
  },
  {
    name: "polygon",
    rpc: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
    // abiUrl: `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=VG3Z6X7UMSYF9UWNQMFWA4G79KI1VTV54X`,
  },
];

const getReverts = async (transaction, instance) => {
  console.log("------------------", transaction);
  try {
    const code = await instance.eth.call(transaction, transaction.blockNumber);
    return code;
  } catch (err) {
    console.log("------------------>>>>>>>>>>>", err);
    return err;
  }
};
//https://api.tenderly.co/api/v1/public-contract/{chainId}/tx/{txHash} api for fetching contract failed status
app.post("/getTransaction", async (req, res) => {
  const { hash } = req.body;
  const bbb = await axios.get(
    "https://api.tenderly.co/api/v1/public-contract/80001/tx/0x6783649fa6ba834b8d6db9fa51a9afdcbbcd995780052beb73024786d7886bb6"
  ); // 'Failed test'
  // console.log("/////////////////////////////", bbb);
  const result = await Promise.all(
    networks?.map(async (value) => {
      const instance = await new web3(value?.rpc);
      const result = await instance.eth.getTransactionReceipt(hash);
      const result2 = await instance.eth.getTransaction(hash);
      if (result) {
        const revertsReason = await getReverts(result2, instance);
        value.result = result;
        value.timestamp = (
          await instance.eth.getBlock(result?.blockHash)
        )?.timestamp;
        value.functionSelector = result2.input.slice(0, 10);
        return value;
      }
    })
  );
  const updatedresult = await result.filter((value) => {
    if (value != null) return value;
  });
  // let result = [];
  // for (let i = 0; i < networks.length; i++) {
  //   console.log("networks[i].rpc", networks[i].rpc);
  //   const instance = await new web3(networks[i].rpc);

  //   const results = await instance.eth.getTransaction(hash);
  //   console.log("results", i, " - ", results);
  //   if (results != null) {
  //     result.push({ results, name: networks[i].name });
  //   }
  // }
  // console.log("resuasdadad", result);
  res.json(updatedresult);
});

app.listen(9001, () => console.log("Listening on port 9001"));
