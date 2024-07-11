package com.gk.study.service;

import com.gk.study.entity.Address; // 导入 Address 实体类

import java.util.List;

/**
 * AddressService 接口定义了操作地址信息的方法。
 */
public interface AddressService {

    /**
     * 获取用户的地址列表
     *
     * @param userId 用户ID
     * @return 返回该用户的地址列表
     */
    List<Address> getAddressList(String userId);

    /**
     * 创建新的地址
     *
     * @param address 待创建的地址对象
     */
    void createAddress(Address address);

    /**
     * 删除指定ID的地址
     *
     * @param id 待删除地址的ID
     */
    void deleteAddress(String id);

    /**
     * 更新地址信息
     *
     * @param address 待更新的地址对象
     */
    void updateAddress(Address address);
}
