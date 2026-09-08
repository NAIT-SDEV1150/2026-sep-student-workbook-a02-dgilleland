const buckets = [];
const addBucket = function(text) {
  let parts = text.split('/');
  let earned = parseInt(parts[0]);
  let possible = parseInt(parts[1]);
  let percent = earned / possible * 100;
  buckets.push({earned, possible, percent});
  bucketTotal += possible;
  earnedTotal += earned;
}
let total, bucketTotal = 0, earnedTotal = 0;
const setAssignmentTotal = function(totalPoints) {
    total = parseInt(totalPoints);
}
const getStats = function() {
    const earned = Math.round(earnedTotal / bucketTotal * 100).toFixed(0);
    const trending = `${earnedTotal}/${bucketTotal} = ${earned}%`
    const earnedPercent = Math.round(earnedTotal / total * 100).toFixed(0);
    const earnedToDate = `${earnedTotal}/${total} = ${earnedPercent}%`;
    return {
        trending,
        earnedToDate
    }
}

export default { buckets, addBucket, setAssignmentTotal, getStats }
