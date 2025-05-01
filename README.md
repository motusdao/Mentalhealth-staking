# 🧠 MotusDAO Stake4Health

> A MiniPay-compatible decentralized staking fund to subsidize mental health services using stablecoins on Celo.

MotusDAO Stake4Health enables individuals and institutions to stake cUSD into a transparent, on-chain smart contract. The staking rewards are used to **fund therapy and mental health support** for underserved populations. Built with love for the [MiniPay Hackathon](https://celo.org/minipay).

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
- 🎨 Modern dark theme UI with cyan accents
- 📱 Responsive design for both desktop and mobile

---

## ⚙️ Stack

| Layer        | Tech                               |
|--------------|------------------------------------|
| Chain        | Celo Alfajores Testnet            |
| Wallet       | MiniPay + SocialConnect           |
| Contracts    | Solidity + Hardhat                |
| Frontend     | React + TypeScript + viem         |
| Styling      | Tailwind CSS                      |
| Hosting      | ngrok (for MiniPay test access)   |
| Treasury     | Gnosis Safe                       |

---

## 🧠 How It Works

1. User connects via MiniPay
2. Enters amount of cUSD to stake
3. Transaction is sent to `HealthStakingFund` smart contract
4. Funds are tracked and later moved to the DAO treasury
5. Mental health professionals are paid from staking rewards

---

## 🛠️ Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- MiniPay wallet extension

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

### 3. Set up environment variables

Create a `.env` file in the frontend directory:
```env
REACT_APP_CHAIN_ID=44787
REACT_APP_NETWORK_NAME="Celo Alfajores"
```

### 4. Start the frontend

```bash
npm run start
```

The application will be available at `http://localhost:3000`

### 5. Start ngrok tunnel (for MiniPay testing)

```bash
npx ngrok http 3000
```

Paste the `https://your-ngrok-url` into MiniPay Developer Settings → Load Test Page.

### Common Issues & Solutions

1. If you see "MiniPay wallet not detected":
   - Make sure you have MiniPay wallet installed
   - Ensure you're on the Celo Alfajores network

2. If transactions fail:
   - Ensure you have test cUSD tokens in your wallet
   - Get tokens from the [Celo Faucet](https://celo.org/faucet)

---

## 🔐 Contract Addresses (Alfajores Testnet)

```
STAKING_CONTRACT=0x64608C2d5E4685830348e9155bAB423bf905E9c9
FEE_CURRENCY=0x765DE816845861e75A25fCA122bb6898B8B1282a
```

---

## 📂 Project Structure

```
stake4health/
├── contracts/              # Solidity smart contracts
├── scripts/               # Deployment scripts
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   ├── abi/          # Contract ABIs
│   ├── public/
├── hardhat.config.js      # Hardhat project config
├── .env                   # Environment variables (not committed)
```

---

## 👨‍💻 Team

- **Founder / Lead** – [@brahma101.eth](https://x.com/brahma101_eth)
- **Frontend/backend / Smart Contracts** – [@SergioFinix](https://github.com/SergioFinix)
- **Mentors / Contributors** – Open to Collab 🤝

---

## 📃 License

MIT — Use it, fork it, build on it.

Mental health is a public good. Let's fund it. 💚
```