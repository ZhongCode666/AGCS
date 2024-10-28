let update_span_interval = [];

async function updateUgvHeightSpan(){
    const ugv_h = await fetchUGVheight();
    if(ugv_h == null){
        console.error("set ugv height span failed");
        return;
    }
    document.getElementById("agent2-time").innerText = Math.round(ugv_h[1]);
    document.getElementById("agent2-height").innerText = Math.round(ugv_h[0]);
}

async function updateUavHeightSpan(){
    const uav_h = await fetchUAVheight();
    if(uav_h == null){
        console.error("set uav height span failed");
        return;
    }
    document.getElementById("agent1-time").innerText = Math.round(uav_h[1]);
    document.getElementById("agent1-height").innerText = Math.round(uav_h[0]);
}

async function updateUgvYawSpan(){
    const ugv_yaw = await fetchUGVyaw();
    if(ugv_yaw == null){
        console.error("set ugv yaw span failed");
        return;
    }
    document.getElementById("agent2-heading").innerText = Math.round(ugv_yaw);
}

async function updateUavYawSpan(){
    const uav_yaw = await fetchUAVyaw();
    if(uav_yaw == null){
        console.error("set uav yaw span failed");
        return;
    }
    document.getElementById("agent1-heading").innerText = Math.round(uav_yaw);
}

async function updateDistanceSpan(){
    const d = await fetchDistance();
    if(d == null){
        console.error("set distance span failed");
        return;
    }
    document.getElementById("distance").innerText = Math.round(d);
}

async function setOriginTime(time_str){
    document.getElementById("origin").innerText = time_str;
}

async function updateDHspan(){
    const d = await checkDH();
    if(d == null){
        console.error("set DH span failed");
        return;
    }
    document.getElementById("D-H").innerText = `${Math.round(d.D)}-${Math.round(d.H)}`;
}

async function setRunDistanceSpan(d){
    document.getElementById("run_distance").innerText = Math.round(d);
}

function startDataFilling(){
    const funlist = [
        updateUgvHeightSpan, updateUavHeightSpan, updateUgvYawSpan,
        updateUavYawSpan, updateDistanceSpan, updateDHspan
    ];
    for (const f of funlist){
        update_span_interval.push(setInterval(f, 1000));
    }

}

function endDataFilling(){
    for (const f of update_span_interval){
        if(f){
            clearInterval(f);
        }
    }
    update_span_interval = [];
}