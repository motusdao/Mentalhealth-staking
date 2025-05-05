// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract HealthStakingFund {
    address public owner;
    address public treasury;
    IERC20 public celoToken;
    IERC20 public cUSDToken;

    enum PoolType { Community, Institutional }

    struct StakeInfo {
        uint256 amount;
        uint256 duration;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount, PoolType poolType);
    event YieldSent(uint256 amount, address treasury);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _celoToken, address _cUSDToken, address _treasury) {
        owner = msg.sender;
        treasury = _treasury;
        celoToken = IERC20(_celoToken);
        cUSDToken = IERC20(_cUSDToken);
    }

    function stakeCELO(uint256 amount, PoolType poolType) external {
        require(celoToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        stakes[msg.sender] = StakeInfo(amount, 0);
        totalStaked += amount;
        emit Staked(msg.sender, amount, poolType);
    }

    function stakeCUSD(uint256 amount, uint256 duration) external {
        require(cUSDToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        stakes[msg.sender] = StakeInfo(amount, duration);
        totalStaked += amount;
        emit Staked(msg.sender, amount, PoolType.Community);
    }

    function sendMockYield(uint256 yieldAmount) external onlyOwner {
        require(cUSDToken.balanceOf(address(this)) >= yieldAmount, "Not enough balance");
        require(cUSDToken.transfer(treasury, yieldAmount), "Transfer failed");
        emit YieldSent(yieldAmount, treasury);
    }

    function getUserStake(address user) external view returns (uint256 amount, uint256 duration) {
        StakeInfo memory info = stakes[user];
        return (info.amount, info.duration);
    }

    function getTotalStaked() external view returns (uint256) {
        return totalStaked;
    }

    function updateTreasury(address newTreasury) external onlyOwner {
        treasury = newTreasury;
    }
}
