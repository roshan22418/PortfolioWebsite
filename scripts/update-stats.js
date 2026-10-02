/*
   Refreshes data/stats.json from the public LeetCode and GeeksforGeeks APIs.
   Run:  node scripts/update-stats.js      (Node 18+)

   Browsers can't call these APIs directly (CORS), so this runs on your
   machine or in the GitHub Action (.github/workflows/update-stats.yml)
   and the site just reads the generated JSON.
*/

const fs = require("fs");
const path = require("path");

const LEETCODE_USER = "Roshan228906";
const GFG_USER = "roshankumadu6o";
const OUT = path.join(__dirname, "..", "data", "stats.json");

async function leetcode(){

    const query = `query($u:String!){
        matchedUser(username:$u){ submitStats{ acSubmissionNum{ difficulty count } } }
        userContestRanking(username:$u){ rating attendedContestsCount }
    }`;

    const res = await fetch("https://leetcode.com/graphql", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Referer":"https://leetcode.com" },
        body:JSON.stringify({ query, variables:{ u:LEETCODE_USER } })
    });

    const { data } = await res.json();
    const counts = Object.fromEntries(
        data.matchedUser.submitStats.acSubmissionNum.map(x => [x.difficulty, x.count])
    );

    return {
        total:counts.All,
        easy:counts.Easy,
        medium:counts.Medium,
        hard:counts.Hard,
        rating:data.userContestRanking ? Math.round(data.userContestRanking.rating) : null,
        contests:data.userContestRanking ? data.userContestRanking.attendedContestsCount : 0
    };

}

async function gfg(){

    const res = await fetch(
        "https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=" + GFG_USER,
        { headers:{ "User-Agent":"Mozilla/5.0" } }
    );

    const { data } = await res.json();

    return {
        total:data.total_problems_solved,
        score:data.score,
        instituteRank:data.institute_rank
    };

}

(async () => {

    // keep values this script can't fetch (e.g. extraSolved)
    let previous = {};
    try{ previous = JSON.parse(fs.readFileSync(OUT, "utf8")); }catch(e){}

    const result = { ...previous, updated:new Date().toISOString() };

    for(const [key, fn] of [["leetcode", leetcode], ["gfg", gfg]]){
        try{
            result[key] = await fn();
            console.log("updated", key, result[key]);
        }catch(err){
            console.warn("could not update", key, "-", err.message, "(keeping old values)");
        }
    }

    fs.writeFileSync(OUT, JSON.stringify(result, null, 2) + "\n");

})();
