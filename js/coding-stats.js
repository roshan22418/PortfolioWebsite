/* ===========================
   CODING STATS
   The HTML already contains the last known numbers.
   This loads data/stats.json (refreshed by scripts/update-stats.js,
   or the GitHub Action) and updates them in place.
=========================== */

function setStat(name, value){

    if(value === null || value === undefined){ return; }

    document.querySelectorAll('[data-stat="' + name + '"]').forEach(el => {
        el.textContent = value;
    });

}

fetch("data/stats.json", { cache:"no-cache" })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {

        const lc = data.leetcode || {};
        const gfg = data.gfg || {};

        setStat("lc-total", lc.total);
        setStat("lc-easy", lc.easy);
        setStat("lc-medium", lc.medium);
        setStat("lc-hard", lc.hard);
        setStat("lc-rating", lc.rating ? Math.round(lc.rating) : null);
        setStat("lc-contests", lc.contests);

        setStat("gfg-total", gfg.total);
        setStat("gfg-score", gfg.score);
        setStat("gfg-rank", gfg.instituteRank);

        const extra = Number(data.extraSolved) || 0;
        const total = (Number(lc.total) || 0) + (Number(gfg.total) || 0) + extra;

        if(total > 0){
            setStat("total", Math.floor(total / 50) * 50 + "+");
        }

        if(data.updated){
            const label = document.getElementById("statsUpdated");
            if(label){
                label.textContent = "Last updated " + new Date(data.updated).toLocaleDateString("en-GB", {
                    day:"numeric", month:"short", year:"numeric"
                });
            }
        }

    })
    .catch(() => { /* keep the static numbers from the HTML */ });
