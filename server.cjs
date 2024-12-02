import dotenv from "dotenv";
import express from "express";
import { ethers } from "ethers";

dotenv.config(); // Load .env variables

const app = express();
const port = 5000;

app.use(express.json()); // to parse incoming JSON requests

// Create providers for both networks
const avalancheProvider = new ethers.JsonRpcProvider(process.env.AVALANCHE_RPC);
const holeskyProvider = new ethers.JsonRpcProvider(process.env.HOLESKY_RPC);

// Create wallets using private key (for signing transactions)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, avalancheProvider);

// ERC20 ABI
const erc20Abi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Cross-chain transfer function
async function crossChainTransfer(
  fromTokenAddress,
  toTokenAddress,
  amount,
  fromTokenChainId,
  toTokenChainId
) {
  try {
    // Set the appropriate provider and token contract based on chain ID
    let providerFrom, providerTo;
    let fromContract, toContract;

    if (fromTokenChainId === 43113) {
      providerFrom = avalancheProvider;
      fromContract = new ethers.Contract(
        fromTokenAddress,
        erc20Abi,
        providerFrom
      );
    }
    if (toTokenChainId === 17000) {
      providerTo = holeskyProvider;
      toContract = new ethers.Contract(toTokenAddress, erc20Abi, providerTo);
    }

    // Sending the tokens to the destination contract
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18); // Convert to 18 decimals (ERC20 standard)

    // Create a transaction on the source network (Avalanche Fuji)
    const tx = await wallet.sendTransaction({
      to: fromTokenAddress,
      data: fromContract.interface.encodeFunctionData("transfer", [
        toTokenAddress,
        amountInWei,
      ]),
    });

    await tx.wait();

    // If the transaction is successful, initiate the transfer on the destination network (Holsky)
    const txTo = await wallet.sendTransaction({
      to: toTokenAddress,
      data: toContract.interface.encodeFunctionData("transfer", [
        wallet.address,
        amountInWei,
      ]),
    });

    await txTo.wait();

    return { success: true, message: "Transfer successful on both networks" };
  } catch (error) {
    console.error("Error in transfer:", error);
    return { success: false, message: error.message };
  }
}

// API route for initiating the transfer
app.post("/transfer", async (req, res) => {
  const {
    fromTokenAddress,
    toTokenAddress,
    amount,
    fromTokenChainId,
    toTokenChainId,
  } = req.body;

  if (
    !fromTokenAddress ||
    !toTokenAddress ||
    !amount ||
    !fromTokenChainId ||
    !toTokenChainId
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required parameters" });
  }

  const result = await crossChainTransfer(
    fromTokenAddress,
    toTokenAddress,
    amount,
    fromTokenChainId,
    toTokenChainId
  );

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
