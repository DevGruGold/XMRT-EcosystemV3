import { ethers } from 'hardhat'
import { verify } from '../utils/verify'

async function main() {
  console.log('🚀 Starting XMRT V3 deployment...')

  const [deployer] = await ethers.getSigners()
  console.log('Deploying with account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  // Deploy XMRT Token
  console.log('📄 Deploying XMRT Token...')
  const XMRTToken = await ethers.getContractFactory('XMRTToken')
  const xmrtToken = await XMRTToken.deploy(deployer.address)
  await xmrtToken.deployed()
  console.log('✅ XMRT Token deployed to:', xmrtToken.address)

  // Deploy Timelock Controller
  console.log('⏰ Deploying Timelock Controller...')
  const TimelockController = await ethers.getContractFactory('TimelockController')
  const timelock = await TimelockController.deploy(
    2 * 24 * 60 * 60, // 2 days delay
    [deployer.address], // proposers
    [deployer.address], // executors
    deployer.address // admin
  )
  await timelock.deployed()
  console.log('✅ Timelock Controller deployed to:', timelock.address)

  // Deploy Governance
  console.log('🏛️ Deploying XMRT Governance...')
  const XMRTGovernance = await ethers.getContractFactory('XMRTGovernance')
  const governance = await XMRTGovernance.deploy(
    xmrtToken.address,
    timelock.address,
    deployer.address // AI Oracle placeholder
  )
  await governance.deployed()
  console.log('✅ XMRT Governance deployed to:', governance.address)

  // Verify contracts on Etherscan
  if (process.env.ETHERSCAN_API_KEY) {
    console.log('🔍 Verifying contracts...')
    await verify(xmrtToken.address, [deployer.address])
    await verify(governance.address, [xmrtToken.address, timelock.address, deployer.address])
  }

  console.log('🎉 Deployment completed successfully!')
  console.log('📋 Contract Addresses:')
  console.log('XMRT Token:', xmrtToken.address)
  console.log('Timelock Controller:', timelock.address)
  console.log('XMRT Governance:', governance.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })