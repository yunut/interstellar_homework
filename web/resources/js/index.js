// 콤마를 붙이는 함수
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 콤마를 제거하는 함수
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}


// + 버튼 클릭 시 가지수 입력 폼 추가
function addCoinInfo() {
    var table = document.getElementById("coinInfo");

    var tr = '<tr><td> <input type=text id="coinUnit" onkeyup=\'inputNumberFormat(this);\' value="" style="width:100px"/></td><td><input type=text id="coinCount" value="" style="width:100px"/></td></tr>';
    table.innerHTML += tr;
}

// - 버튼 클릭 시 입력 폼 삭제
function delCoinInfo() {
    var table = document.getElementById("coinInfo");
    if(table.rows.length > 2) {
        table.removeChild(table.childNodes[table.childNodes.length-1]);
    }
}

function calCoin() {
    //XXX 유효성 검사 (input 태그가 비어져있는지, 모두 숫자형식의 데이터가 입력되었는지)
    var targetMoney = uncomma(document.getElementById("targetMoney").value);
    var coinInfo = [];
    var table = document.getElementById("coinInfo");
    for(var i=1;i<table.rows.length;i++) {
        var tableTr = table.rows[i];
        var unit = uncomma(tableTr.cells[0].children[0].value);
        var count = tableTr.cells[1].children[0].value;
        var obj = new Object();
        obj["unit"] = unit;
        obj["count"] = count;
        coinInfo.push(obj);
    }

    // ajax 요청
    var data = JSON.stringify({
        targetMoney: targetMoney,
        coins: coinInfo
    });

    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 출력 구현
                var resultDiv = document.getElementById("result");
                var result = JSON.parse(xhr.response);

                if(document.getElementById("resultArea") != undefined) {
                    document.getElementById("resultArea").remove();
                }
                var nCareer = document.createElement("textarea");
                nCareer.setAttribute("rows", 5);
                nCareer.setAttribute("cols", 50);
                nCareer.setAttribute("id", "resultArea");
                resultDiv.appendChild(nCareer);

                nCareer.append("총 " + result.num + "가지\n");
                result.mathematicals.forEach((value, index, array)=>{
                    nCareer.append(value + "\n");
                })
            } else {
                // 실패시  처리 구현
                console.log("연결 실패");
            }
        }
    }
    //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.open("POST", "http://localhost:8080/cal.json", true);
    //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.setRequestHeader('Content-Type', 'application/json');
    //Json형식의 data를 포함하여 요청 전송
    xhr.send(data);
}