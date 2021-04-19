// author @nikos Lamprakakis

function main() {
 
  //Step 1: Connect Google Ads to the Google Sheet
  var spreadsheetUrl = 'YOUR-GOOGLE-SHEET-FILE';
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var ss = spreadsheet.getSheetByName('Abbott');
  
  
  //Step 2: Get lastAmount of the Enabled Campaigns
  
  var sheetarray = [['campaign', 'clicks', 'cost']];
 
  var campaigns = AdsApp.campaigns()
      .withCondition("Status = ENABLED")
      .forDateRange("THIS_MONTH")
      .get();
  
   while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    sheetarray.push([
        campaign.getName(),
        campaign.getStatsFor("THIS_MONTH").getClicks(),
        campaign.getStatsFor("YESTERDAY").getCost()
      ]);
  }

//Step 3: Push Data to Google Sheet
Logger.log(sheetarray);
  
    if (sheetarray.length > 0) {
     
    ss.getRange(26, 1, sheetarray.length, sheetarray[0].length).setValues(sheetarray);
     
  } 
}
