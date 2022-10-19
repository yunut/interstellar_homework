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
    var row = table.insertRow(table.rows.length);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "<input type=text id=\"coinUnit\" onKeyUp='inputNumberFormat(this);' value=\"\" style=\"width:100px\"/>";
    cell2.innerHTML = "<input type=text id=\"coinCount\" value=\"\" style=\"width:100px\"/>";
}

// - 버튼 클릭 시 입력 폼 삭제
function delCoinInfo() {
    var table = document.getElementById("coinInfo");
    if(table.rows.length > 2) {
        table.deleteRow(table.rows.length-1);
    }
}

function calCoin() {

    // 입력값 할당
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

    // 유효성 검사 (빈 값)
    if(targetMoney == "" || targetMoney == undefined) {
        alert("지폐금액을 입력해 주세요");
        return;
    }

    for(var i=0;i<coinInfo.length;i++) {
        if(coinInfo[i].unit == "" || coinInfo[i].unit == undefined) {
            alert("동전 금액에 빈값이 있습니다.");
            return;
        }
        if(coinInfo[i].count == "" || coinInfo[i].count == undefined) {
            alert("동전 개수에 빈값이 있습니다.");
            return;
        }
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

                var resultTextArea = document.getElementById("resultArea")
                if(resultTextArea != undefined) {
                    resultTextArea.remove();
                }

                var resultBox = document.createElement("textarea");
                resultBox.setAttribute("rows", 5);
                resultBox.setAttribute("cols", 50);
                resultBox.setAttribute("id", "resultArea");
                resultDiv.appendChild(resultBox);

                resultBox.append("총 " + result.num + "가지\n");
                result.mathematicals.forEach((value, index, array)=>{
                    resultBox.append(value + "\n");
                })
            } else {
                // 실패시  처리 구현
                console.log("처리 실패");
            }
        }
    }
    //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.open("POST", "http://3.38.73.128:9090/cal.json", true);
    //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.setRequestHeader('Content-Type', 'application/json');
    //Json형식의 data를 포함하여 요청 전송
    xhr.send(data);
}