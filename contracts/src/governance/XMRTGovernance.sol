// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./XMRTToken.sol";

/**
 * @title XMRTGovernance
 * @dev Advanced DAO governance contract with AI integration
 */
contract XMRTGovernance is 
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl,
    AccessControl,
    ReentrancyGuard
{
    bytes32 public constant AI_ORACLE_ROLE = keccak256("AI_ORACLE_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    XMRTToken public immutable xmrtToken;

    // AI Integration
    address public aiOracle;
    mapping(uint256 => bool) public aiRecommendations; // proposalId => recommendation
    mapping(uint256 => string) public aiAnalysis; // proposalId => analysis

    // Proposal categories
    enum ProposalCategory {
        TREASURY,
        GOVERNANCE,
        TECHNICAL,
        EMERGENCY,
        AI_DECISION
    }

    mapping(uint256 => ProposalCategory) public proposalCategories;
    mapping(ProposalCategory => uint256) public categoryQuorums; // Custom quorum per category

    // Emergency proposals
    mapping(uint256 => bool) public emergencyProposals;
    uint256 public emergencyVotingPeriod = 1 days;

    // Delegation
    mapping(address => address) public delegates;
    mapping(address => uint256) public delegatedVotes;

    // Events
    event AIRecommendationReceived(uint256 indexed proposalId, bool recommendation, string analysis);
    event EmergencyProposalCreated(uint256 indexed proposalId);
    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
    event ProposalCategorySet(uint256 indexed proposalId, ProposalCategory category);

    constructor(
        XMRTToken _token,
        TimelockController _timelock,
        address _aiOracle
    )
        Governor("XMRT DAO")
        GovernorSettings(1, /* 1 block */ 50400, /* 1 week */ 0)
        GovernorVotes(IVotes(address(_token)))
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {
        xmrtToken = _token;
        aiOracle = _aiOracle;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AI_ORACLE_ROLE, _aiOracle);
        _grantRole(EMERGENCY_ROLE, msg.sender);

        // Set category-specific quorums
        categoryQuorums[ProposalCategory.TREASURY] = 10; // 10%
        categoryQuorums[ProposalCategory.GOVERNANCE] = 15; // 15%
        categoryQuorums[ProposalCategory.TECHNICAL] = 5; // 5%
        categoryQuorums[ProposalCategory.EMERGENCY] = 20; // 20%
        categoryQuorums[ProposalCategory.AI_DECISION] = 8; // 8%
    }

    /**
     * @dev Create a proposal with category
     */
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        ProposalCategory category
    ) public returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description);
        proposalCategories[proposalId] = category;

        emit ProposalCategorySet(proposalId, category);
        return proposalId;
    }

    /**
     * @dev Create an emergency proposal with expedited voting
     */
    function proposeEmergency(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) external onlyRole(EMERGENCY_ROLE) returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description, ProposalCategory.EMERGENCY);
        emergencyProposals[proposalId] = true;

        emit EmergencyProposalCreated(proposalId);
        return proposalId;
    }

    /**
     * @dev AI Oracle provides recommendation for a proposal
     */
    function provideAIRecommendation(
        uint256 proposalId,
        bool recommendation,
        string calldata analysis
    ) external onlyRole(AI_ORACLE_ROLE) {
        require(state(proposalId) == ProposalState.Active, "Proposal not active");

        aiRecommendations[proposalId] = recommendation;
        aiAnalysis[proposalId] = analysis;

        emit AIRecommendationReceived(proposalId, recommendation, analysis);
    }

    /**
     * @dev Delegate voting power to another address
     */
    function delegate(address delegatee) external {
        address currentDelegate = delegates[msg.sender];

        if (currentDelegate != address(0)) {
            delegatedVotes[currentDelegate] -= xmrtToken.votingPowerOf(msg.sender);
        }

        delegates[msg.sender] = delegatee;

        if (delegatee != address(0)) {
            delegatedVotes[delegatee] += xmrtToken.votingPowerOf(msg.sender);
        }

        emit DelegateChanged(msg.sender, currentDelegate, delegatee);
    }

    /**
     * @dev Get effective voting power including delegated votes
     */
    function getVotingPower(address account) public view returns (uint256) {
        return xmrtToken.votingPowerOf(account) + delegatedVotes[account];
    }

    /**
     * @dev Override quorum calculation based on proposal category
     */
    function quorum(uint256 blockNumber) public view override returns (uint256) {
        return (xmrtToken.getPastTotalSupply(blockNumber) * quorumNumerator(blockNumber)) / quorumDenominator();
    }

    /**
     * @dev Get category-specific quorum for a proposal
     */
    function proposalQuorum(uint256 proposalId) public view returns (uint256) {
        ProposalCategory category = proposalCategories[proposalId];
        uint256 totalSupply = xmrtToken.totalSupply();
        return (totalSupply * categoryQuorums[category]) / 100;
    }

    /**
     * @dev Override voting period for emergency proposals
     */
    function votingPeriod() public view override returns (uint256) {
        return super.votingPeriod();
    }

    /**
     * @dev Get voting period for specific proposal (emergency proposals have shorter period)
     */
    function proposalVotingPeriod(uint256 proposalId) public view returns (uint256) {
        if (emergencyProposals[proposalId]) {
            return emergencyVotingPeriod;
        }
        return votingPeriod();
    }

    /**
     * @dev Set AI Oracle address (only admin)
     */
    function setAIOracle(address newOracle) external onlyRole(DEFAULT_ADMIN_ROLE) {
        address oldOracle = aiOracle;
        aiOracle = newOracle;

        _revokeRole(AI_ORACLE_ROLE, oldOracle);
        _grantRole(AI_ORACLE_ROLE, newOracle);
    }

    /**
     * @dev Set category quorum (only governance)
     */
    function setCategoryQuorum(ProposalCategory category, uint256 quorumPercentage) 
        external 
        onlyGovernance 
    {
        require(quorumPercentage <= 50, "Quorum too high"); // Max 50%
        categoryQuorums[category] = quorumPercentage;
    }

    /**
     * @dev Set emergency voting period (only governance)
     */
    function setEmergencyVotingPeriod(uint256 newPeriod) external onlyGovernance {
        require(newPeriod >= 1 hours && newPeriod <= 7 days, "Invalid period");
        emergencyVotingPeriod = newPeriod;
    }

    // The following functions are overrides required by Solidity
    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}