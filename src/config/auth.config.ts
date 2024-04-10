// Example configuration - adjust the values for your setup
const supertokens = require("supertokens-node");

supertokens.init({
    supertokens: {
        connectionURI: "URL_TO_YOUR_SUPER_TOKENS_CORE_INSTANCE",
    },
    appInfo: {
        appName: "Exa Monster",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
    },
    recipeList: [
        // Import required SuperTokens recipes here. For example, ThirdPartyEmailPassword if you are using third party logins or just EmailPassword for email and password auth
    ]
});
