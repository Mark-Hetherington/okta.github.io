---
layout: blog_post
title: How to use KentorIT AuthServices with Okta
author:
- raphael_londner
tags: [saml, asp.net]
---
<style>
	.blog img {
	padding-top: 15px;
	padding-bottom:15px;
	}
</style>

If you're wondering how to configure an ASP.NET application with [KentorIT's AuthServices](https://github.com/KentorIT/authservices) and Okta, you've come to the right place. But before delving into the specifics of how to make Okta work with an SAML-enabled ASP.NET application powered by KentorIT AuthServices, is is worth spending some time going over a critical, but easily fixable issue:

**Important note** : As of March 22nd, 2016, you have 2 choices:  
  
1. Either get the source code of the AuthServices assemblies and compile them on your own machine. In this case, no specific adjustment is necessary.
2. Or use the v0.17 KentorIT NuGet assemblies. In this case, if you plan to use the SampleApplication project (not the SampleMvcApplication) for testing purposes, make sure you remove the following line from the web.config file:

	`<requestedAuthnContextclassRef="Password" comparison="Minimum" />`

	If you don't, the SP-initiated login flow will fail because Okta won't manage to deserialize the SAMLRequest parameter (due to a case issue).

Here's how you should configure an app powered by Kentor AuthServices to make it work with Okta:

   1.	Download the latest version of KentorIT's AuthServices from <https://github.com/KentorIT/authservices> and open the Kentor.AuthServices.sln solution in Visual Studio.
   2.	Identify the SampleApplication project and make a note of its URL property:  
   ![Visual Studio Project properties](/assets/img/KentorOkta/VSProjectProperties.png)  
   3.	Go to you Okta organization and navigate to Admin => Applications.
   4. Press the **Add Application** button and the green **Create New App** button  
![Press the Create a new Okta app](/assets/img/KentorOkta/CreateNewAppButton.png)
   5. Select the **SAML 2.0** option and press the **Create** button.
![Choose the SAML 2.0 template](/assets/img/KentorOkta/SAML2Option.png)
  6. Give your application a name and optionally upload a custom logo. We'll call it " **Kentor AuthServices App 1**"
![Give your Okta app a name](/assets/img/KentorOkta/OktaAppName.png)
  7. Press **Next**.
  8. In the **Single sign on URL** field, enter the url you retrieved above in step #2 and append " **/AuthServices/Acs**", for instance **http://localhost:18714/SamplePath/AuthServices/Acs**
  9. For the Audience URI field, enter the Url your retrieved above in step #2 and append " **/AuthServices**", for instance [**http://localhost:18714/SamplePath/AuthServices**](http://localhost:18714/SamplePath/AuthServices)
  10. In the **Name ID format** field, select **x509SubjectName**. 
  11. Select the **Show Advanced Settings** link and select **RSA-SHA1** for **Signature Algorithm**:
![Okta App Advanced Settings](/assets/img/KentorOkta/AppAdvancedSettings.png)
  12. In the Attribute Statements section, optionally enter additional attributes, such as in the following screenshot:
![Optional Attribute Statements](/assets/img/KentorOkta/OptionalAttributeStatements.png)
  13. Press the **Next** button. Select the **I'm a software vendor** option (if you're indeed a vendor - if you are developing an internal app, select the first option) and press the Finish button
![Select the customer or vendor option](/assets/img/KentorOkta/VendorOrCustomerOption.png)
  14. Now edit the web.config file of the SampleApplication project.
  15. In the `<kentor.authServices>` section, enter the following values:
  - **entityId** = same value as the Audience URI for the Okta app, e.g. [http://localhost:18714/SamplePath/AuthServices](http://localhost:18714/SamplePath/AuthServices)
  - **returnUrl** = value of the web application's url, i.e. [http://localhost:18714/SamplePath](http://localhost:18714/SamplePath)
  16. In the <identityProviders> section, enter the following values:
  - **entityId** = **Identity Provider Issuer** from **Sign On** => **View Setup Instructions**
![View setup instructions](/assets/img/KentorOkta/ViewSetupInstructions.png)
![Identity Provider Issuer](/assets/img/KentorOkta/IdentityProviderIssuer.png)
  - **signOnUrl** = value of the **Identity Provider Single Sign-On URL** below
![Identity Provider Single Sign-On URL](/assets/img/KentorOkta/IdPSSOUrl.png)
 - In the `<signingCertificate>` section, download the  **okta.cert** X.509 certificate from the instructions page in the Okta app and put it in the **App\_Data** folder of your web application. Then reference it accordingly (such as with **fileName="~/App\_Data/okta.cert**") in the web.config file.


You should be good to go now! Don't forget to assign users to your Okta application and test that you can sign in into your SAML application both from the Okta portal (IdP-initiated sign-in flow) and from your SAML application itself (SP-initiated sign-in flow).

If you run into any issue while using the SP-initiated login flow (when a user clicks on the "Sign In" link of the /SamplePath page), then try to recompile the KentorIT.AuthServices project and make sure it is used by your project. If your project uses v0.17 of the NuGet corresponding library, make sure to comment out any `<requestedAuthnContext >` section in your web.config file.

**Happy Okta'ing!**