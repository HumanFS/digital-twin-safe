#  👨‍🤝‍👨 The Digital Twin Safe 🔒

### A little house for your digital twin. 🏡 

![human-file-system-banner-logo](https://user-images.githubusercontent.com/2808553/180306571-ac9cc741-6f34-4059-a814-6f8a72ed8322.png)

Import data from all your apps and wearables so you can centrally own, control, and share all your digital exhaust.

Try it out at [humanfs.io](https://humanfs.io)!  

For support requests, please open up a [bug issue](https://github.com/HumanFS/digital-twin-safe/issues/new?template=bug-report.md) or reach out via [Discord](https://curedao.org/discord).

Based on the awesome [Gnosis Safe](https://gnosis-safe.io/), the most trusted platform to store digital assets on Ethereum.


# The Human File System SDK

**A Simple API for Patient-Controlled Health Data Aggregation, Sharing, and Monetization**

The Human File System Collective Superteam DAO is a collective of separate HackFS teams cooperating to accelerating clinical discovery and reduce suffering.

Together, we are creating a set of interoperable software libraries that can be used independently to create user-accesss controlled digital twins on the blockchain.

The libaries can be used independently, but will all be included in the HumanFS SDK.

## ❓ Why in the hell are you doing this?

There are 350k health apps containing various types of symptom and factor data.  However, the isolated data's relatively useless in all these silos. In order to make clinical discoveries, all the factor data needs to be combined with the outcome data.

**Web2 Problem**

The web2 solution to combining all this data is a nightmare of

1. creating thousands of OAuth2 data connectors
2. running a bunch of importer cron jobs on AWS.

**Web3 Solution**

User auth/databases/key management/access control/3rd party OAuth tokens abstracted away by a single, easy-to-use API

i.e.

Pain Tracking App A:

`db.collections.create('Arthritis Severity', timeSeriesData);`

Diet-Tracking App B:

`let timeSeriesData = db.collections.get('Arthritis Severity');`

⇒ Making it possible for Diet-Tracking App B (and/or Pain Tracking App A) to easily analyze the relationship between dietary factors and Arthritis Severity using causal inference predictive model control recurrent neural networks.

## 🌈 Get Involved

Join us on [Discord](https://curedao.org/discord)!

## Overview

![digital-twin-safe-screenshot-home](https://user-images.githubusercontent.com/2808553/200402565-72bc85a3-deb2-4f1a-a9b1-bde108e63d87.png)

## Variables

![digital-twin-safe-screenshot-variables](https://user-images.githubusercontent.com/2808553/200402422-41213d62-324d-44db-a725-fc0eab619e45.png)

### Data Sources

![digital-twin-safe-screenshot-data-sources](https://user-images.githubusercontent.com/2808553/200402625-8c4ab0b1-829c-4128-8b12-509c2f885b96.png)

# 📚 Libraries Used

[Data Storage, Authorization and Sharing](https://github.com/yash-deore/sshr-hackfs) - Lit Programmable Key Pairs (PKPs) for access control over protected health information (PHI) with data storage on Ceramic. XMTP (Extensible Message Transport Protocol) is an open protocol and network for secure, private messaging between patients and physicians.

### Libraries TODO
- [Zero Knowledge Unique Patient Identifier Key in a Soul Bound NFT](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=ff0c50bf-3c11-4076-8c9c-18d8c46ecf05) - For patients, owning an NFT of their medical data would be like creating a sentry to guard that personal information. The NFT would act as a gatekeeper, tracking who requested access, who was granted access, and when—and record all those actions publicly.
- [Federated Learning](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=f25f12a9-7e3d-4488-85f7-023f95f75dfe) - Fluence to perform decentralized analysis of human generated data from applications and backends on peer-to-peer networks
- [Proof of Humanity](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=db1092b9-91b4-4352-999a-f088ffefd6c8) - The Proof of Attendance Protocol for Sybil Resistant data collection, ensuring that robots aren't selling fake health data.
- [Reward open-source health innovation](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=7261a8d8-f1ad-493c-a41c-b70a36507763) - Valist to reward public good open-source health technology innovations using Software License NFTs and proof of open-source contribution.
- [Querying specific health data](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=3a546a7f-2aa6-43a1-8dda-08c5a62c83b4) - Tableland for querying the HumanFS for specific data types and time periods.
- [NFT Health Data Marketplace](https://app.dework.xyz/hackfs-dhealth-colle/main-space-477/projects/nft-health-data-mark) - NFTPort for minting data sets that can be sold to pharmaceutical companies in a health data marketplace.
- [On-Chain Analytics](https://app.dework.xyz/hackfs-dhealth-colle/suggestions?taskId=0114d499-36ff-4451-9d1a-e870c753e155) - Covalent for Health Data NFT marketplaces, On-Chain Analytics / Dashboards, Health Data Wallets, Health Data Asset tracking, and ROI for NFT generation and sales.

For technical information please refer to the [Gnosis Safe Developer Portal](https://docs.gnosis.io/safe/).


## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See [Deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

We use [yarn](https://yarnpkg.com) in our infrastructure, so we decided to go with yarn in the README.
Please install yarn globally if you haven't already.

### Environment variables

The app grabs environment variables from the `.env` file. Copy our template to your own local file:

```
cp .env.example .env
```

To execute transactions, you'll need to create an [Infura](https://infura.io) project and set the project ID in the `.env` you've just created:

```
REACT_APP_INFURA_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Once done, you'll need to restart the app if it's already running.

### Installing and running

Install dependencies for the project:

```
yarn install
```

To launch the dev version of the app locally:

```
yarn start
```

Alternatively, to run the production version of the app:

```
yarn build
mv build app
python -m SimpleHTTPServer 3000
```

And open http://localhost:3000/app in the browser.

### Docker

If you prefer to use Docker:

```
docker-compose build && docker-compose up
```

### Building

To get a complete bundle using the current configuration use:

```
yarn build
```

## Running the tests

To run the tests:

```
yarn test
```

### Lint

ESLint will be run automatically before you commit. To run it manually:

```
yarn lint:fix
```

## Deployment

### Dev & staging

The code is deployed to a testing website automatically on each push via a GitHub Action.
The GitHub Action will create a new subdomain and post the link as a comment in the PR.

When pushing to the `main` branch, the code will be automatically deployed to [staging](https://safe-team.staging.gnosisdev.com/).

### Production

Deployment to production is done manually. Please see the [release procedure](docs/release-procedure.md) notes for details.

## Built With

- [React](https://reactjs.org/) - A JS library for building user interfaces
- [Material UI 4.X](https://material-ui.com/) - React components that implement Google's Material Design
- [redux, immutable, reselect, final-form](https://redux.js.org/) - React ecosystem libraries
- [Gnosis Safe](https://gnosis-safe.io/) - The most trusted platform to store digital assets on Ethereum.

![app diagram](https://user-images.githubusercontent.com/381895/129330828-c067425b-d20b-4f67-82c7-c0598deb453a.png)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/gnosis/gnosis-team-safe/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
