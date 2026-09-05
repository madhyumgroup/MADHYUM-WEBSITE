MADHYUM V36 TIMER / LIVE COUNTER FIX

Root cause found:
The V36 website JavaScript was pointing to an older Apps Script deployment ID.
Current Apps Script project URL supplied by the user uses this deployment ID:
AKfycbzRgbrdHLtZO6MB-WjazHCqHfQtVEeANQHrCet1Ag

Only the Apps Script URL in js/script.js was changed.
All other website files and structure are preserved from the supplied V36 package.

IMPORTANT:
The live website must use the deployed Web App URL ending in /exec, not /dev.
The Apps Script Web App must be deployed with public access appropriate for the public website (e.g. Anyone).
If the Apps Script code was changed after the last deployment, update/redeploy the Web App so /exec serves the latest code.
