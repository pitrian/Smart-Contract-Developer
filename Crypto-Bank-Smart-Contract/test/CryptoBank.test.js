const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoBank", function () {
  let cryptoBank;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const CryptoBank = await ethers.getContractFactory("CryptoBank");
    cryptoBank = await CryptoBank.deploy();
    await cryptoBank.waitForDeployment();
  });

  describe("Deposit", function () {
    it("Should accept ETH deposit", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await expect(
        cryptoBank.connect(user1).deposit({ value: depositAmount })
      ).to.changeEtherBalances([user1, cryptoBank], [-depositAmount, depositAmount]);
    });

    it("Should update user balance correctly", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });

      const balance = await cryptoBank.getBalance(user1.address);
      expect(balance).to.equal(depositAmount);
    });

    it("Should emit Deposit event", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await expect(cryptoBank.connect(user1).deposit({ value: depositAmount }))
        .to.emit(cryptoBank, "Deposit")
        .withArgs(user1.address, depositAmount);
    });

    it("Should revert when depositing 0 ETH", async function () {
      await expect(
        cryptoBank.connect(user1).deposit({ value: 0 })
      ).to.be.revertedWith("Deposit amount must be greater than 0");
    });

    it("Should accumulate multiple deposits", async function () {
      const firstDeposit = ethers.parseEther("1.0");
      const secondDeposit = ethers.parseEther("2.0");

      await cryptoBank.connect(user1).deposit({ value: firstDeposit });
      await cryptoBank.connect(user1).deposit({ value: secondDeposit });

      const balance = await cryptoBank.getBalance(user1.address);
      expect(balance).to.equal(firstDeposit + secondDeposit);
    });
  });

  describe("Withdraw", function () {
    it("Should allow withdrawal of deposited ETH", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });

      await expect(
        cryptoBank.connect(user1).withdraw(depositAmount)
      ).to.changeEtherBalances([cryptoBank, user1], [-depositAmount, depositAmount]);
    });

    it("Should update balance after withdrawal", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("0.5");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });
      await cryptoBank.connect(user1).withdraw(withdrawAmount);

      const balance = await cryptoBank.getBalance(user1.address);
      expect(balance).to.equal(depositAmount - withdrawAmount);
    });

    it("Should emit Withdraw event", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });

      await expect(cryptoBank.connect(user1).withdraw(depositAmount))
        .to.emit(cryptoBank, "Withdraw")
        .withArgs(user1.address, depositAmount);
    });

    it("Should revert when withdrawing more than balance", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("2.0");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });

      await expect(
        cryptoBank.connect(user1).withdraw(withdrawAmount)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should revert when withdrawing with zero balance", async function () {
      const withdrawAmount = ethers.parseEther("1.0");

      await expect(
        cryptoBank.connect(user1).withdraw(withdrawAmount)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should revert when withdrawing 0 ETH", async function () {
      await expect(
        cryptoBank.connect(user1).withdraw(0)
      ).to.be.revertedWith("Withdrawal amount must be greater than 0");
    });
  });

  describe("Balance Tracking", function () {
    it("Should return correct balance for user", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await cryptoBank.connect(user1).deposit({ value: depositAmount });

      const balance = await cryptoBank.getBalance(user1.address);
      expect(balance).to.equal(depositAmount);
    });

    it("Should return 0 for user with no deposits", async function () {
      const balance = await cryptoBank.getBalance(user1.address);
      expect(balance).to.equal(0);
    });

    it("Should track balances separately for different users", async function () {
      const deposit1 = ethers.parseEther("1.0");
      const deposit2 = ethers.parseEther("2.0");

      await cryptoBank.connect(user1).deposit({ value: deposit1 });
      await cryptoBank.connect(user2).deposit({ value: deposit2 });

      const balance1 = await cryptoBank.getBalance(user1.address);
      const balance2 = await cryptoBank.getBalance(user2.address);

      expect(balance1).to.equal(deposit1);
      expect(balance2).to.equal(deposit2);
    });
  });
});
