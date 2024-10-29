//
// OneLink() method for fdic site.  Coded for staging and live sites.
//
// History:
//    arivard   ::  10-Aug-2011  :: created

//----------------------------------------------------------------------
function kDebug (sMessage)
//----------------------------------------------------------------------
{
	//alert (sMessage); //-- uncomment this line to debug logic

} // kDebug

//----------------------------------------------------------------------
function OneLink (sLanguage, /*optional*/sHostname)
//----------------------------------------------------------------------
{
	sRedirectTo = sHostname; // by default

	if (!sHostname) {
		// if hostname is not passed in, use the current location:
		sHostname = document.location.hostname;
	}
	
	// is we are already on a translated domain: en-, zh- or en-
	if (sHostname.match (/^[ze][hsn][-]/))
	{
		var sExistingLang = sHostname.slice(0,sHostname.indexOf("-"));
		kDebug ("existing lang = " + sExistingLang);
		if (sLanguage == sExistingLang) {
			kDebug ('NO-OP: we are already on: ' + sLanguage);
			return;
		}
		else if (sLanguage == "en")
		{
			// they are going to English from a translated site:
			if (sHostname.match (/onelink-translations.com/)) {
				kDebug ("translated staging site, trying to go back to english");
				sRedirectTo = sHostname.slice(3,sHostname.indexOf("-fdic")) + ".fdic.com";
				kDebug (sRedirectTo);
			}
			else {
				kDebug ("translated live site, trying to go back to english");
				sRedirectTo = sHostname.slice (3);   // <-- strip off existing language prefix
			}
		}
		else {
			sRedirectTo = sHostname.slice (3);      // <-- strip off existing language prefix
			sRedirectTo = sLanguage + "-" + sRedirectTo; // <-- add new language prefix
		}
	}
	else if (sHostname == "es.fdic.com") // exception to generic rule
	{
		switch (sLanguage)
		{
		case "es":
			kDebug ('NO-OP: we are already on: ' + sLanguage);
			return;
		case "zh":
			sRedirectTo = "zh.fdic.com";
			break;
		default:
			sRedirectTo = "www.fdic.com";
			break;
		}
	}
	else if (sHostname == "zh.fdic.com") // exception to generic rule
	{
		switch (sLanguage)
		{
		case "es":
			sRedirectTo = "es.fdic.com";
			break;
		case "zh":
			kDebug ('NO-OP: we are already on: ' + sLanguage);
			return;
		default:
			sRedirectTo = "www.fdic.com";
			break;
		}
	}
	else if (sHostname == "www.fdic.com") // exception to generic rule
	{
		switch (sLanguage)
		{
		case "es":
			sRedirectTo = "es.fdic.com";
			break;
		case "zh":
			sRedirectTo = "zh.fdic.com";
			break;
		default:
			kDebug ('NO-OP: we are already on: ' + sLanguage);
			return;
		}
	}
	else if (sLanguage == "en")
	{
		kDebug ('NO-OP: we are already on: ' + sLanguage);
		return;
	}
	else // generic live rule: just prepend language code to existing hostname
	{
		kDebug ("prepending " + sLanguage + " to " + sHostname);
		sRedirectTo = sLanguage + "-" + sHostname;	
	}
	
	kDebug ("redir to [" + sRedirectTo + "]");
	if ((sRedirectTo == "es-informeddelivery.fdic.com")||(sRedirectTo == "zh-informeddelivery.fdic.com")){
		document.location.href = document.location.protocol + "//" + "informeddelivery.fdic.com" + document.location.pathname + document.location.search;	
	}
	// bring the user to the SAME PAGE on the other domain (including the query string):
	document.location.href = document.location.protocol + "//" + sRedirectTo + document.location.pathname + document.location.search;
  // 04/25/2019 - updated to remove language specific informed delivery

} // OneLink -- fdic Version

