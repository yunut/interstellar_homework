package controller;

import dto.Money;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import service.MoneyService;

@Controller
public class Home {

    @Autowired
    MoneyService moneyService;

    @GetMapping(value = "/")
    public String main() {
        return "index";
    }

    @PostMapping(value = "/cal.json")
    public Money.MoneyResponse cal(@RequestBody Money.MoneyRequest request) {
        moneyService.calMoney(request);
        return null;
    }
}
