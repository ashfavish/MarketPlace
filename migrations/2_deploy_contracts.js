//defines deploymentof contract
//importing contracts
var Marketplace = artifacts.require("./Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};

// 2 ways to test solidity coding - either solidity(not recommended), or with javascript testing