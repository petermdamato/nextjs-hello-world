// labelConstants.js
const labelConstants = {
  walkthrough: [
      {text:"This dial shows how quickly inflation increased this most recent month. It’s not how much prices increased, but how fast the increases have accelerated (or decelerated) since the month before.",tail:'top'},
      {text:"The gray triangle displays the acceleration rate of inflation from the previous month, showing how fast the rate rose that month compared to the month before that.",tail:'left'},
      {text:"The Federal Reserve has a target of 2% for inflation, and leverages its monetary policy tools to get close to that target. The four-pointed star shows the necessary acceleration rate for inflation to reach the target over the next 12 months.",tail:'left'},
      {text:"Policy makers typically try to hit the inflation targets through gradual changes (think of the “soft landing” that was the focus for this current Fed leadership). The six-pointed star shows a more aggressive path, displaying how much the speed of inflation would have hypothetically needed to decelerate or accelerate to meet the Fed’s 2% target this month.",tail:'left'},
      {text:"Custom content",tail:''}
    ],
  tooltips:{
sample: "This is the first tooltip text component we've built for Volya"
  },
  labels: {
    inflation: [
        "Extremely Low",
        "Significantly Low",
        "Somewhat Low",
        "Average",
        "Somewhat Elevated",
        "Significantly Elevated",
        "Extremely Elevated",
      ],
    rates:   [
        "Falling Extremely",
        "Falling Significantly",
        "Falling Somewhat",
        "Still",
        "Rising Somewhat",
        "Rising Significantly",
        "Rising Extremely",
      ],
      indices: 
        ["Composite", "CPI", "PCE", "Core CPI", "Core PCE"],
        legend: {inflation:['Current level of inflation','Previous month level of inflation'],rates:['Rate needed to reach Fed target over 12 months','Rate needed to reach Fed target this month']}
  },

  // Add more style variables as needed
};

export default labelConstants;