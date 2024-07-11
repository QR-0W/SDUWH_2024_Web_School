package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.service.UserService;
import com.gk.study.entity.User;
import com.gk.study.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper; // 自动注入 UserMapper 实例，用于数据库操作

    /**
     * 根据关键字查询用户列表
     *
     * @param keyword 查询关键字，用于模糊查询用户名
     * @return 返回符合条件的用户列表
     */
    @Override
    public List<User> getUserList(String keyword) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        if(StringUtils.isNotBlank(keyword)){
            // 使用关键字进行模糊查询
            queryWrapper.like("username", keyword);
        }
        queryWrapper.orderBy(true, false, "create_time");
        return userMapper.selectList(queryWrapper); // 执行查询并返回结果列表
    }

    /**
     * 获取管理员用户
     *
     * @param user 包含用户名和密码的用户对象
     * @return 返回符合条件的管理员用户对象，如果不存在则返回null
     */
    @Override
    public User getAdminUser(User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("username", user.getUsername());
        queryWrapper.eq("password", user.getPassword());
        queryWrapper.gt("role", "1"); // 查询角色大于1（即管理员）的用户
        return userMapper.selectOne(queryWrapper); // 执行查询并返回单条结果
    }

    /**
     * 获取普通用户
     *
     * @param user 包含用户名和密码的用户对象
     * @return 返回符合条件的普通用户对象，如果不存在则返回null
     */
    @Override
    public User getNormalUser(User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("username", user.getUsername());
        queryWrapper.eq("password", user.getPassword());
        queryWrapper.eq("role", "1"); // 查询角色为1（普通用户）的用户
        return userMapper.selectOne(queryWrapper); // 执行查询并返回单条结果
    }

    /**
     * 创建用户
     *
     * @param user 待创建的用户对象
     */
    @Override
    public void createUser(User user) {
        userMapper.insert(user); // 插入用户记录
    }

    /**
     * 删除用户
     *
     * @param id 待删除用户的ID
     */
    @Override
    public void deleteUser(String id) {
        userMapper.deleteById(id); // 根据ID删除用户记录
    }

    /**
     * 更新用户信息
     *
     * @param user 待更新的用户对象
     */
    @Override
    public void updateUser(User user) {
        userMapper.updateById(user); // 根据ID更新用户信息
    }

    /**
     * 根据token获取用户信息
     *
     * @param token 用户登录时生成的token
     * @return 返回符合条件的用户对象，如果不存在则返回null
     */
    @Override
    public User getUserByToken(String token) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("token", token);
        return userMapper.selectOne(queryWrapper); // 执行查询并返回单条结果
    }

    /**
     * 根据用户名获取用户信息
     *
     * @param username 用户名
     * @return 返回符合条件的用户对象，如果不存在则返回null
     */
    @Override
    public User getUserByUserName(String username) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("username", username);
        return userMapper.selectOne(queryWrapper); // 执行查询并返回单条结果
    }

    /**
     * 根据用户ID获取用户详细信息
     *
     * @param userId 用户ID
     * @return 返回符合条件的用户详细信息，如果不存在则返回null
     */
    @Override
    public User getUserDetail(String userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("id", userId);
        return userMapper.selectOne(queryWrapper); // 执行查询并返回单条结果
    }
}
