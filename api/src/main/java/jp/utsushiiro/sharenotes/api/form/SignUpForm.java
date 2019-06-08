package jp.utsushiiro.sharenotes.api.form;

import jp.utsushiiro.sharenotes.api.domain.User;
import lombok.Data;

@Data
public class SignUpForm {
    private String name;

    private String password;

    public User toUser() {
        User user = new User();
        user.setName(name);
        return user;
    }
}
