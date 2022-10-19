<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/resources/js/index.js"></script>
<html>
  <head>
    <title>인터스텔라 과제테스트</title>
  </head>
  <body>
    <table id="amountInfo">
      <tbody>
        <tr>
          <td>
            지폐금액
          </td>
          <td>
            <input type='text' onkeyup='inputNumberFormat(this);' id='targetMoney'><br/>
          </td>
        </tr>
        <tr>
          <td>
            동전의 가짓 수
          </td>
          <td>
            <input type='button' id='plus' value='+' onclick="addCoinInfo()"/>
            <input type='button' id='minus' value='-' onclick="delCoinInfo()"/> <br/>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
            <table id = coinInfo>
              <thead>
                <tr>
                  <td>
                    동전금액
                  </td>
                  <td>
                    동전개수
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type=text id="coinUnit" onkeyup='inputNumberFormat(this);' style="width:100px" />
                  </td>
                  <td>
                    <input type=text id="coinCount" onkeyup='inputNumberFormat(this);' style="width:100px"/>
                  </td>
                </tr>
              </tbody>
            </table>
          <td/>
        </tr>
      </tbody>
    </table>
    <input type='button' id="cal" value="계산" onclick="calCoin()"/>
    <div id="result">

    </div>
  </body>
</html>
