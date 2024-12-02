// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title TokenSwap - A contract for swapping ERC-20 tokens.
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract TokenSwap {
    address public owner;

    // Event emitted when a token swap occurs
    event TokenSwapped(
        address indexed fromToken,
        address indexed toToken,
        address indexed user,
        uint256 fromAmount,
        uint256 toAmount
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    /// @notice Swaps an ERC-20 token for another ERC-20 token.
    /// @param fromToken The address of the token being swapped.
    /// @param toToken The address of the token to receive.
    /// @param amount The amount of the fromToken to swap.
    /// @param rate The exchange rate (toToken per fromToken).
    function swap(
        address fromToken,
        address toToken,
        uint256 amount,
        uint256 rate
    ) external {
        require(fromToken != address(0) && toToken != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than zero");
        require(rate > 0, "Rate must be greater than zero");

        IERC20 fromTokenContract = IERC20(fromToken);
        IERC20 toTokenContract = IERC20(toToken);

        // Transfer fromToken from the user to the contract
        require(fromTokenContract.transferFrom(msg.sender, address(this), amount), "Transfer of fromToken failed");

        // Calculate the amount of toToken to send
        uint256 toAmount = amount * rate;

        // Ensure the contract has enough toToken balance
        require(toTokenContract.balanceOf(address(this)) >= toAmount, "Insufficient toToken balance in contract");

        // Transfer toToken to the user
        require(toTokenContract.transfer(msg.sender, toAmount), "Transfer of toToken failed");

        emit TokenSwapped(fromToken, toToken, msg.sender, amount, toAmount);
    }

    /// @notice Allows the owner to withdraw tokens from the contract.
    /// @param token The address of the token to withdraw.
    /// @param amount The amount of tokens to withdraw.
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20 tokenContract = IERC20(token);
        require(tokenContract.transfer(msg.sender, amount), "Withdrawal failed");
    }

    /// @notice Allows the owner to transfer ownership of the contract.
    /// @param newOwner The address of the new owner.
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}