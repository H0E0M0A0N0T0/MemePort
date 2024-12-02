// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18; // Updated to a more recent version for better security

// Uncomment this line to use console.log for debugging purposes in Hardhat
// import "hardhat/console.sol";

/// @title Lock Contract
/// @notice This contract locks funds until a specified unlock time and allows only the owner to withdraw them after the unlock time.
contract Lock {
    // State variable to store the unlock time
    uint public unlockTime;
    
    // State variable to store the contract owner
    address payable public owner;

    // Event emitted when a withdrawal occurs
    event Withdrawal(uint amount, uint when);

    /// @dev Contract constructor to initialize the unlock time and store the owner.
    /// @param _unlockTime The time (in seconds) after which the funds can be withdrawn.
    constructor(uint _unlockTime) payable {
        // Ensure that the unlock time is in the future
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender); // Set the deployer as the contract owner
    }

    /// @notice Allows the owner to withdraw the funds after the unlock time.
    /// @dev Only the owner can call this function, and the funds can only be withdrawn after the unlock time has passed.
    function withdraw() public {
        // Uncomment the line below for debugging with Hardhat console
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        // Check if the unlock time has passed
        require(block.timestamp >= unlockTime, "You can't withdraw yet");

        // Ensure that only the owner can withdraw the funds
        require(msg.sender == owner, "You aren't the owner");

        // Emit the withdrawal event before transferring funds
        emit Withdrawal(address(this).balance, block.timestamp);

        // Transfer all the funds to the owner
        owner.transfer(address(this).balance);
    }

    /// @notice Allows anyone to check the current balance of the contract.
    /// @return The current balance of the contract.
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
