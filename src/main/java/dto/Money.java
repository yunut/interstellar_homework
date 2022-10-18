package dto;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Money {

    public static class MoneyRequest {
        private int targetMoney;
        private ArrayList<Coin> coins;

        public void setTargetMoney(int targetMoney) {
            this.targetMoney = targetMoney;
        }

        public int getTargetMoney() {
            return targetMoney;
        }

        public void setCoins(ArrayList<Coin> coins) {
            this.coins = coins;
        }

        public ArrayList<Coin> getCoins() {
            return coins;
        }
    }

    public static class MoneyResponse {
        private int num;
        private ArrayList<String> mathematicals;

        public void setNum(int num) {
            this.num = num;
        }

        public int getNum() {
            return num;
        }

        public void setMathematicals(ArrayList<String> mathematicals) {
            this.mathematicals = mathematicals;
        }

        public ArrayList<String> getMathematicals() {
            return mathematicals;
        }
    }
}
