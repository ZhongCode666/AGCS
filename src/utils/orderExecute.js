// 执行设置阈值
function executeThreshold() {
    const thresholdValue = Number(document.getElementById('threshold').value);
    const flag = setth(thresholdValue);
    if(flag){
        alert('执行阈值设置成功！😊');
    }
    else{
        alert('执行阈值设置失败！🤯');
    }
}

// 执行 D-H 操作
function executeDH() {
    const dValue = document.getElementById('d-input').value;
    const hValue = document.getElementById('h-input').value;
    
    if (dValue === '' || hValue === ''){
        alert('执行DH设置失败,DH为空！🤯');
        return
    }
    flag = setDH(Number(dValue), Number(hValue));
    if(flag){
        alert('执行DH设置成功！😀');
    }
    else{
        alert('执行DH设置失败！🤯');
    }
}
