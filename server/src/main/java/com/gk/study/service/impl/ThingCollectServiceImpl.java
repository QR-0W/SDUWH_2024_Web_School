package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.mapper.ThingCollectMapper;
import com.gk.study.service.ThingCollectService;
import com.gk.study.entity.ThingCollect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ThingCollectServiceImpl extends ServiceImpl<ThingCollectMapper, ThingCollect> implements ThingCollectService {

    @Autowired
    ThingCollectMapper mapper; // 自动注入 ThingCollectMapper 实例，用于数据库操作

    /**
     * 获取用户收藏的事物列表
     *
     * @param userId 用户ID
     * @return 返回用户收藏的事物列表，以 Map 的形式表示
     */
    @Override
    public List<Map> getThingCollectList(String userId) {
        return mapper.getThingCollectList(userId); // 调用 ThingCollectMapper 的 getThingCollectList 方法获取用户收藏的事物列表
    }

    /**
     * 创建事物收藏记录
     *
     * @param thingCollect 事物收藏对象
     */
    @Override
    public void createThingCollect(ThingCollect thingCollect) {
        mapper.insert(thingCollect); // 将事物收藏对象插入数据库
    }

    /**
     * 删除事物收藏记录
     *
     * @param id 事物收藏记录的ID
     */
    @Override
    public void deleteThingCollect(String id) {
        mapper.deleteById(id); // 根据ID从数据库中删除事物收藏记录
    }

    /**
     * 根据用户ID和事物ID获取事物收藏记录
     *
     * @param userId 用户ID
     * @param thingId 事物ID
     * @return 返回符合条件的事物收藏记录，如果不存在则返回 null
     */
    @Override
    public ThingCollect getThingCollect(String userId, String thingId) {
        QueryWrapper<ThingCollect> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("thing_id", thingId) // 添加条件：事物ID等于指定的thingId
                .eq("user_id", userId); // 添加条件：用户ID等于指定的userId
        return mapper.selectOne(queryWrapper); // 使用查询包装器查询符合条件的单条事物收藏记录
    }
}
