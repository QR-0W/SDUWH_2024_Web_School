package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.Address;
import com.gk.study.mapper.AddressMapper;
import com.gk.study.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl extends ServiceImpl<AddressMapper, Address> implements AddressService {

    @Autowired
    AddressMapper mapper; // 自动注入AddressMapper

    /**
     * 获取指定用户的地址列表
     *
     * @param userId 用户ID
     * @return 地址列表
     */
    @Override
    public List<Address> getAddressList(String userId) {
        QueryWrapper<Address> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId); // 查询条件：用户ID等于userId
        queryWrapper.orderBy(true, false, "create_time"); // 按创建时间倒序排序
        return mapper.selectList(queryWrapper); // 执行查询并返回结果列表
    }

    /**
     * 创建地址
     *
     * @param address 地址对象
     */
    @Override
    public void createAddress(Address address) {
        System.out.println(address); // 打印地址信息（调试用）
        address.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置创建时间为当前时间戳
        mapper.insert(address); // 插入地址记录
    }

    /**
     * 删除地址
     *
     * @param id 地址ID
     */
    @Override
    public void deleteAddress(String id) {
        mapper.deleteById(id); // 根据ID删除地址记录
    }

    /**
     * 更新地址信息
     *
     * @param address 地址对象
     */
    @Override
    public void updateAddress(Address address) {
        mapper.updateById(address); // 根据ID更新地址信息
    }
}
