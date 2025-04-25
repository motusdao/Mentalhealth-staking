
# 🧠 Stake4Health

> A MiniPay-compatible decentralized staking fund to subsidize mental health services using stablecoins on Celo.

Stake4Health enables individuals and institutions to stake cUSD into a transparent, on-chain smart contract. The staking rewards are used to **fund therapy and mental health support** for underserved populations. Built with love for the [MiniPay Hackathon](https://celo.org/minipay).

---

## 🌍 Live Demo (MiniPay Only)

🧪 Open this on your Android MiniPay app in Developer Mode:

```
https://a268-189-203-116-101.ngrok-free.app
```

Steps to test:
1. Go to MiniPay → Settings → Developer Settings
2. Enable **Use Testnet**
3. Tap **Load Test Page** and paste the URL
4. Connect wallet → enter cUSD amount → click **Stake**

---

## 💡 Features

- 🔁 Stake cUSD using your MiniPay wallet
- 🧾 Funds flow into a smart contract managed by a DAO treasury (Safe)
- 🧠 Subsidies are distributed to certified mental health professionals
- 📲 Optimized for lightweight mobile use via MiniPay + viem
- 🔐 Institutional & community pool model

---

## ⚙️ Stack

| Layer        | Tech                               |
|--------------|------------------------------------|
| Chain        | Celo Alfajores Testnet             |
| Wallet       | MiniPay + SocialConnect            |
| Contracts    | Solidity + Hardhat                 |
| Frontend     | React + TypeScript + viem          |
| Hosting      | ngrok (for MiniPay test access)    |
| Treasury     | Gnosis Safe                        |

---

## 🧠 How It Works

1. User connects via MiniPay
2. Enters amount of cUSD to stake
3. Transaction is sent to `HealthStakingFund` smart contract
4. Funds are tracked and later moved to the DAO treasury
5. Mental health professionals are paid from staking rewards

---

## 🛠️ Local Development

### 1. Clone the project

```bash
git clone https://github.com/motusdao/Mentalhealth-staking.git
cd Mentalhealth-staking
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Start the frontend

```bash
npm run start
```

### 4. Start ngrok tunnel

```bash
npx ngrok http 3000
```

Paste the `https://your-ngrok-url` into MiniPay Developer Settings → Load Test Page.

---

## 🔐 .env Setup

At the project root, create a `.env` file:

```
PRIVATE_KEY=your_alfajores_wallet_private_key
```

> ⚠️ Never commit this file — it's used for contract deployment only.

---

## 📤 Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network alfajores
```

Use the [Celo Faucet](https://celo.org/faucet) to fund your deployer wallet with testnet CELO + cUSD.

---

## 📂 Project Structure

```
stake4health/
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment scripts
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.tsx         # MiniPay-enabled frontend
│   ├── abi/                # HealthStakingFund ABI
│   ├── public/
├── hardhat.config.js       # Hardhat project config
├── .env                    # Private key for deployer (not committed)
```

---

## 👨‍💻 Team

- **Founder / Lead** – [@brahma101.eth](https://x.com/brahma101_eth)
- **Frontend / Smart Contracts** – [@SergioFinix] (https://github.com/SergioFinix)
- **Mentors / Contributors** – Open to Collab 🤝

---

## 📃 License

MIT — Use it, fork it, build on it.

Mental health is a public good. Let's fund it. 💚
```
