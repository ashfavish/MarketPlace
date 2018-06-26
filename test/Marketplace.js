// import marketplace contract
var Marketplace = artifacts.require("./Marketplace.sol");

//start contract testing
contract("Marketplace", function(accounts){
    
    // define global variables var=variable
    var articleName = "test_article";
    var articleDescription = "this is a test";
    // converting wei to ether *by default money in etherium is in wei virtual machine of etherium only accepts wei
    var articlePrice = web3.toWei(10, "ether");

    // start first test
    // special testing framework for Java Moca
    it("should have articleCounter of zero in the beginning", function(){
        //gets deployed instance of the contract 
        // .then makes javascript iterative (otherwise will run simultaneously)
        return Marketplace.deployed().then(function(instance){
            // call getNumberOfArticles
            return instance.getNumberofArticles();
            // pass on return value of getNumberOfArticles function
        }).then(function(articleCounter){
            // check condition - compare what we want to what we expect,  plus explanation if doesn't work 
            assert.equal(articleCounter, 0, "initial number not equal to zero");
        });
    });

    it("should have 1 article for sale", function() {
        var MarketplaceInstance;
        return Marketplace.deployed().then(function(instance){
            MarketplaceInstance = instance;
            return MarketplaceInstance.sellArticle(
                articleName,
                articleDescription,
                articlePrice,
                // need to put gas for function to run
                {'from': accounts[0]}
            );
        // }).then(function(receipt){
        //     //test event was triggered (receipt includes the event)
        }),then(function(){
            return MarketplaceInstance.getNumberofArticles();
        }).then(function(articleCounter) {
            assert.equal(articleCounter, 1, "articleCounter has not increased")
        }).then(function(){
            return MarketplaceInstance.articles(1);
        }).then(function(article){
            assert.equal(article[0], 1 , "id is not 1");
            assert.equal(article[1], articlePrice , "price is not 10 ehter");
            assert.equal(article[2], accounts[0] , "seller is not correct");
            assert.equal(article[3], 0x0 , "buyer is not unknown");
            assert.equal(article[4], articleName , "article name is not correct");
            assert.equal(article[5], articleDescription , "articledescription is not correct");

        });
    });
});