// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title XMRTToken
 * @dev Advanced ERC20 token for the XMRT ecosystem with governance features
 */
contract XMRTToken is ERC20, ERC20Burnable, ERC20Pausable, AccessControl, ReentrancyGuard {
    using SafeMath for uint256;

    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    // Token economics
    uint256 public constant MAX_SUPPLY = 21_000_000 * 10**18; // 21M tokens max supply
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18; // 1M initial supply

    // Staking and rewards
    mapping(address => uint256) private _stakedBalances;
    mapping(address => uint256) private _stakingTimestamps;
    mapping(address => uint256) private _rewards;

    uint256 public stakingRewardRate = 500; // 5% APY (500 basis points)
    uint256 public minimumStakingPeriod = 30 days;

    // Governance features
    mapping(address => uint256) private _votingPower;
    mapping(address => bool) private _delegates;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event VotingPowerUpdated(address indexed user, uint256 newPower);
    event DelegateSet(address indexed delegator, address indexed delegate);

    constructor(address _governance) ERC20("XMRT Token", "XMRT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, _governance);

        // Mint initial supply to deployer
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Mint new tokens (only by minters, respecting max supply)
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply().add(amount) <= MAX_SUPPLY, "XMRT: Max supply exceeded");
        _mint(to, amount);
    }

    /**
     * @dev Pause token transfers
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Stake tokens to earn rewards and gain voting power
     */
    function stake(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "XMRT: Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "XMRT: Insufficient balance");

        // Claim existing rewards before staking more
        if (_stakedBalances[msg.sender] > 0) {
            _claimRewards();
        }

        _transfer(msg.sender, address(this), amount);
        _stakedBalances[msg.sender] = _stakedBalances[msg.sender].add(amount);
        _stakingTimestamps[msg.sender] = block.timestamp;

        // Update voting power (1:1 ratio with staked tokens)
        _votingPower[msg.sender] = _stakedBalances[msg.sender];

        emit Staked(msg.sender, amount);
        emit VotingPowerUpdated(msg.sender, _votingPower[msg.sender]);
    }

    /**
     * @dev Unstake tokens and claim rewards
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "XMRT: Cannot unstake 0 tokens");
        require(_stakedBalances[msg.sender] >= amount, "XMRT: Insufficient staked balance");
        require(
            block.timestamp >= _stakingTimestamps[msg.sender].add(minimumStakingPeriod),
            "XMRT: Minimum staking period not met"
        );

        // Claim rewards before unstaking
        _claimRewards();

        _stakedBalances[msg.sender] = _stakedBalances[msg.sender].sub(amount);
        _votingPower[msg.sender] = _stakedBalances[msg.sender];

        _transfer(address(this), msg.sender, amount);

        emit Unstaked(msg.sender, amount);
        emit VotingPowerUpdated(msg.sender, _votingPower[msg.sender]);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _claimRewards();
    }

    /**
     * @dev Internal function to calculate and distribute rewards
     */
    function _claimRewards() internal {
        uint256 stakedAmount = _stakedBalances[msg.sender];
        if (stakedAmount == 0) return;

        uint256 stakingDuration = block.timestamp.sub(_stakingTimestamps[msg.sender]);
        uint256 reward = stakedAmount
            .mul(stakingRewardRate)
            .mul(stakingDuration)
            .div(365 days)
            .div(10000); // Convert basis points to percentage

        if (reward > 0 && totalSupply().add(reward) <= MAX_SUPPLY) {
            _mint(msg.sender, reward);
            _rewards[msg.sender] = _rewards[msg.sender].add(reward);
            _stakingTimestamps[msg.sender] = block.timestamp;

            emit RewardsClaimed(msg.sender, reward);
        }
    }

    /**
     * @dev Get staked balance of an account
     */
    function stakedBalanceOf(address account) external view returns (uint256) {
        return _stakedBalances[account];
    }

    /**
     * @dev Get voting power of an account
     */
    function votingPowerOf(address account) external view returns (uint256) {
        return _votingPower[account];
    }

    /**
     * @dev Get pending rewards for an account
     */
    function pendingRewards(address account) external view returns (uint256) {
        uint256 stakedAmount = _stakedBalances[account];
        if (stakedAmount == 0) return 0;

        uint256 stakingDuration = block.timestamp.sub(_stakingTimestamps[account]);
        return stakedAmount
            .mul(stakingRewardRate)
            .mul(stakingDuration)
            .div(365 days)
            .div(10000);
    }

    /**
     * @dev Set staking reward rate (only governance)
     */
    function setStakingRewardRate(uint256 newRate) external onlyRole(GOVERNANCE_ROLE) {
        require(newRate <= 2000, "XMRT: Reward rate too high"); // Max 20% APY
        stakingRewardRate = newRate;
    }

    /**
     * @dev Set minimum staking period (only governance)
     */
    function setMinimumStakingPeriod(uint256 newPeriod) external onlyRole(GOVERNANCE_ROLE) {
        require(newPeriod <= 365 days, "XMRT: Staking period too long");
        minimumStakingPeriod = newPeriod;
    }

    // Override required by Solidity
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}