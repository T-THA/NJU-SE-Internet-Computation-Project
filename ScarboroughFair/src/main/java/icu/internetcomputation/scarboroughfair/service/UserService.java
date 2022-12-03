package icu.internetcomputation.scarboroughfair.service;

import icu.internetcomputation.scarboroughfair.UserRepository;
import icu.internetcomputation.scarboroughfair.entity.User;
import icu.internetcomputation.scarboroughfair.entity.Message;
import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Resource
    UserRepository userRepository;
    // public UserService(UserRepository userRepository)
    // {
    //     this.userRepository = userRepository;
    // }

    public Iterable<User> findAll()
    {
        return userRepository.findAll();
    }

    public User findById(int id)
    {
       Optional<User> userOp = userRepository.findById(id);
       return userOp.orElse(null);
    }

    public User findByUserName(String username)
    {
        Iterable<User> userTable = findAll();
        for (User user : userTable) 
        {
            if(user.getName().equals(username))
            {
                return user;
            }
        }
        return null;
    }

    public Message addUser(String userName, String userPassword)
    {
        User u = findByUserName(userName);
        if(u != null)
        {
            return new Message(false,"主人重名了啦……(；′⌒`)");
        }
        int id = (int)userRepository.count() + 1;
        User user = new User(id, userName, userPassword);
        userRepository.save(user);
        return new Message(true,"欢迎来到新世界o(*￣▽￣*)ブ");
    }

    public Message deleteUser(int id)
    {
        User user = findById(id);
        if(user == null) 
        {
            return new Message(false,"找不到主人哦");
        }
        userRepository.deleteById(id);
        return new Message(true,"再见了~");
    }

    public Message checkUser(String userName, String userPassword)
    {
        User user = findByUserName(userName);
        if(user == null)
        {
            return new Message(false, "你真的是这个世界的人嘛(・∀・(・∀・(・∀・*)");
        }
        if(!user.getPassword().equals(userPassword))
        {
            return new Message(false,"咒语记错了啦……┭┮﹏┭┮");
        }else
        {
            return new Message(true,String.format("欢迎回家！ %s さま~o(*￣▽￣*)ブ",user.getName()));
        }
    }
    
    public Message edit(User newUser)
    {
        deleteUser(newUser.getId());
        userRepository.save(newUser);
        return new Message(true,"改好了~");
    }
}
