package service;

import dto.Coin;
import dto.Money;
import org.springframework.stereotype.Service;

@Service
public class MoneyService {

    public Money.MoneyResponse calMoney(Money.MoneyRequest request) {
        int T = request.getTargetMoney();
        int k = request.getCoins().size();
        int dp [][] = new int[k+1][T+1];

        for(int i = 1 ; i < k+1 ; i++) {
            dp[i-1][0] = 1;
            Coin coin = request.getCoins().get(i-1);
            for(int j = 1 ; j < T+1 ; j++)
                for(int m = 0 ; m<=coin.getCount() && m*coin.getUnit()<=j;m++)
                    dp[i][j] += dp[i-1][j-m*coin.getUnit()];
        }
        System.out.println(dp[k][T]);

        return null;
    }

    public void dfs(int targetMoney, int sumMoney, Money.MoneyRequest request) {
        if(sumMoney > targetMoney) return;
        if(sumMoney == targetMoney) {
            //
        }

        for(int i=0;i<request.getCoins().size();i++) {
            dfs(request.getTargetMoney(), sumMoney + request.getCoins().get(i).getUnit(), request);

        }

    }
}
