// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract MemeOfTheDay {
    string public memeHash = "QmPsv6NXKjfSVkpZ8bxYeM2GTPU5mtLEFAgx96Q9Y1DGDi";

    function getMemeHash() external view returns (string memory) {
        return memeHash;
    }

    function updateMemeHash(string calldata _memeHash) external {
        memeHash = _memeHash;
    }
}