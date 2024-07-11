package com.gk.study.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.Order;
import com.gk.study.service.OrderService;
import com.gk.study.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

    @Autowired
    OrderMapper mapper; // 自动注入 OrderMapper 实例

    /**
     * 获取所有订单列表
     *
     * @return 返回所有订单的列表
     */
    @Override
    public List<Order> getOrderList() {
        return mapper.getList(); // 调用 OrderMapper 的 getList 方法获取所有订单列表
    }

    /**
     * 创建订单
     *
     * @param order 订单对象
     */
    @Override
    public void createOrder(Order order) {
        long ct = System.currentTimeMillis(); // 获取当前时间戳
        order.setOrderTime(String.valueOf(ct)); // 设置订单时间为当前时间戳的字符串表示
        order.setOrderNumber(String.valueOf(ct)); // 设置订单号为当前时间戳的字符串表示
        order.setStatus("1"); // 设置订单状态为 "1"，表示订单创建状态
        mapper.insert(order); // 将订单对象插入数据库
    }

    /**
     * 删除订单
     *
     * @param id 订单的ID
     */
    @Override
    public void deleteOrder(String id) {
        mapper.deleteById(id); // 根据订单ID从数据库中删除订单
    }

    /**
     * 更新订单
     *
     * @param order 更新后的订单对象
     */
    @Override
    public void updateOrder(Order order) {
        mapper.updateById(order); // 根据订单ID更新数据库中的订单信息
    }

    /**
     * 获取用户的订单列表
     *
     * @param userId 用户ID
     * @param status 订单状态
     * @return 返回符合条件的用户订单列表
     */
    @Override
    public List<Order> getUserOrderList(String userId, String status) {
        return mapper.getUserOrderList(userId, status); // 调用 OrderMapper 的 getUserOrderList 方法获取用户的订单列表
        // 下面是使用 MyBatis Plus 的 QueryWrapper 进行条件查询的注释代码，如有需要可以取消注释并使用
//        QueryWrapper<Order> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("user_id", userId);
//        if (StringUtils.isNotBlank(status)) {
//            queryWrapper.eq("status", status);
//        }
//        queryWrapper.orderBy(true, false, "order_time");
//        return mapper.selectList(queryWrapper);
    }
}
