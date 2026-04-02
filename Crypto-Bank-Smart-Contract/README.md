# Simple Crypto Bank Smart Contract

A beginner-level decentralized crypto bank smart contract where users can deposit and withdraw ETH. This project demonstrates Solidity fundamentals, smart contract architecture, and Ethereum interaction.

## Project Description

This is a Web3 learning project that implements a simple bank contract on the Ethereum blockchain. Users can:
- Deposit ETH into the contract
- Withdraw their deposited ETH
- View their balance

The contract follows security best practices including the checks-effects-interactions pattern and reentrancy protection using OpenZeppelin's ReentrancyGuard.

## Smart Contract Architecture

### Contract: CryptoBank

**State Variables:**
- `mapping(address => uint256) public balances` - Tracks ETH balance for each user

**Events:**
- `Deposit(address indexed user, uint256 amount)` - Emitted when user deposits ETH
- `Withdraw(address indexed user, uint256 amount)` - Emitted when user withdraws ETH

**Functions:**
- `deposit()` - Payable function to deposit ETH
- `withdraw(uint256 amount)` - Withdraw specified amount of ETH
- `getBalance(address user)` - View function to check user balance

### Security Features
- Uses Solidity 0.8+ (built-in overflow protection)
- Implements ReentrancyGuard from OpenZeppelin
- Follows checks-effects-interactions pattern
- Validates all inputs before processing

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- MetaMask wallet (for testnet interaction)
- Alchemy or Infura account (for RPC endpoint)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Crypto-Bank-Smart-Contract
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

## Compile Contracts

```bash
npx hardhat compile
```

## Run Tests

```bash
npx hardhat test
```

To run tests with coverage:
```bash
npx hardhat coverage
```

## Deploy Contract

### Local Hardhat Network
```bash
npx hardhat run scripts/deploy.js
```

### Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Example Interaction Using ethers.js

```javascript
const { ethers } = require("hardhat");

async function main() {
  // Get contract instance
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const CryptoBank = await ethers.getContractFactory("CryptoBank");
  const cryptoBank = CryptoBank.attach(contractAddress);

  // Get signer
  const [signer] = await ethers.getSigners();

  // Deposit 1 ETH
  const depositAmount = ethers.parseEther("1.0");
  const depositTx = await cryptoBank.deposit({ value: depositAmount });
  await depositTx.wait();
  console.log("Deposited 1 ETH");

  // Check balance
  const balance = await cryptoBank.getBalance(signer.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  // Withdraw 0.5 ETH
  const withdrawAmount = ethers.parseEther("0.5");
  const withdrawTx = await cryptoBank.withdraw(withdrawAmount);
  await withdrawTx.wait();
  console.log("Withdrawn 0.5 ETH");

  // Check final balance
  const finalBalance = await cryptoBank.getBalance(signer.address);
  console.log("Final Balance:", ethers.formatEther(finalBalance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Project Structure

```
Crypto-Bank-Smart-Contract/
├── contracts/
│   └── CryptoBank.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── CryptoBank.test.js
├── hardhat.config.js
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## Learning Objectives

- Understand Solidity mappings
- Understand `msg.sender` and `msg.value`
- Understand payable functions
- Learn ETH transfers
- Learn basic smart contract security patterns
- Learn how to deploy smart contracts

## Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)

## License

ISC
