package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.mapper.ThingWishMapper;
import com.gk.study.service.ThingWishService;
import com.gk.study.entity.ThingWish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ThingWishServiceImpl extends ServiceImpl<ThingWishMapper, ThingWish> implements ThingWishService {

    @Autowired
    ThingWishMapper mapper; // 自动注入 ThingWishMapper 实例，用于数据库操作

    /**
     * 获取用户的事物心愿列表
     *
     * @param userId 用户ID
     * @return 返回用户的事物心愿列表，以Map形式表示
     */
    @Override
    public List<Map> getThingWishList(String userId) {
        return mapper.getThingWishList(userId); // 调用Mapper方法获取用户的事物心愿列表
    }

    /**
     * 创建事物心愿
     *
     * @param thingWish 事物心愿对象
     */
    @Override
    public void createThingWish(ThingWish thingWish) {
        mapper.insert(thingWish); // 插入事物心愿记录
    }

    /**
     * 删除事物心愿
     *
     * @param id 事物心愿ID
     */
    @Override
    public void deleteThingWish(String id) {
        mapper.deleteById(id); // 根据ID删除事物心愿记录
    }

    /**
     * 根据用户ID和事物ID获取事物心愿
     *
     * @param userId 用户ID
     * @param thingId 事物ID
     * @return 返回对应用户和事物的事物心愿对象，如果不存在则返回null
     */
    @Override
    public ThingWish getThingWish(String userId, String thingId) {
        QueryWrapper<ThingWish> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("thing_id", thingId)
                .eq("user_id", userId);
        return mapper.selectOne(queryWrapper); // 根据条件查询事物心愿记录，返回单条记录或null
    }
}
