package service;

import dto.Coin;
import dto.Money;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;

@Service
public class MoneyService {

    public Money.MoneyResponse calMoney(Money.MoneyRequest request) {
        int targetMoney = request.getTargetMoney();
        int maxCoinIndex = request.getCoins().size();

        LinkedHashMap<Integer, Integer> coinCheckMap = new LinkedHashMap<>();
        ArrayList<String> answers = new ArrayList<>();
        for(Coin coin : request.getCoins()) {
            coinCheckMap.put(coin.getUnit(), 0);
        }
        dfs(targetMoney, 0, maxCoinIndex, 0, coinCheckMap,answers, request);

        Money.MoneyResponse moneyResponse = new Money.MoneyResponse();
        moneyResponse.setNum(answers.size());
        moneyResponse.setMathematicals(answers);
        return moneyResponse;
    }

    public void dfs(int targetMoney, int currentMoney, int maxCoinIndex, int currentCoinIndex, LinkedHashMap<Integer,Integer> coinCheckMap, ArrayList<String> answers, Money.MoneyRequest request) {
        if(currentMoney > targetMoney) return;
        if(currentCoinIndex == maxCoinIndex) {
            if (currentMoney == targetMoney) {
                ArrayList<String> matchematicals = new ArrayList<>();
                for (int unit : coinCheckMap.keySet()) {
                    if (coinCheckMap.get(unit) > 0) matchematicals.add(unit + "*" + coinCheckMap.get(unit));
                }
                String totalMatchematical = StringUtils.join(matchematicals, " + ");
                answers.add(totalMatchematical);
            }
        }

        if(currentCoinIndex >= maxCoinIndex) return;
        int coinCount = request.getCoins().get(currentCoinIndex).getCount();
        int coinUnit = request.getCoins().get(currentCoinIndex).getUnit();
        for(int i=0;i<=coinCount;i++) {
            coinCheckMap.put(coinUnit, coinCheckMap.get(coinUnit) + i);
            dfs(targetMoney, currentMoney+ coinUnit * i, maxCoinIndex, currentCoinIndex+1 , coinCheckMap, answers, request);
            coinCheckMap.put(coinUnit, coinCheckMap.get(coinUnit) - i);
        }

    }
}
