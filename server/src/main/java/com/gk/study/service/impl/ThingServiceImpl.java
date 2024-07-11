package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.Thing;
import com.gk.study.entity.ThingTag;
import com.gk.study.mapper.ThingMapper;
import com.gk.study.mapper.ThingTagMapper;
import com.gk.study.service.ThingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ThingServiceImpl extends ServiceImpl<ThingMapper, Thing> implements ThingService {

    @Autowired
    ThingMapper mapper; // 自动注入 ThingMapper 实例，用于数据库操作

    @Autowired
    ThingTagMapper thingTagMapper; // 自动注入 ThingTagMapper 实例，用于事物标签关联操作

    /**
     * 根据条件获取事物列表
     *
     * @param keyword 关键字搜索
     * @param sort 排序方式（recent: 最近创建，hot/recommend: 热门或推荐）
     * @param c 分类ID
     * @param tag 标签ID
     * @return 返回符合条件的事物列表
     */
    @Override
    public List<Thing> getThingList(String keyword, String sort, String c, String tag) {
        QueryWrapper<Thing> queryWrapper = new QueryWrapper<>();

        // 搜索关键字
        queryWrapper.like(StringUtils.isNotBlank(keyword), "title", keyword);

        // 排序
        if (StringUtils.isNotBlank(sort)) {
            if (sort.equals("recent")) {
                queryWrapper.orderBy(true, false, "create_time");
            } else if (sort.equals("hot") || sort.equals("recommend")) {
                queryWrapper.orderBy(true, false, "pv");
            }
        } else {
            queryWrapper.orderBy(true, false, "create_time");
        }

        // 根据分类筛选
        if (StringUtils.isNotBlank(c) && !c.equals("-1")) {
            queryWrapper.eq(true, "classification_id", c);
        }

        // 查询符合条件的事物列表
        List<Thing> things = mapper.selectList(queryWrapper);

        // 根据标签筛选
        if (StringUtils.isNotBlank(tag)) {
            List<Thing> filteredThings = new ArrayList<>();
            QueryWrapper<ThingTag> thingTagQueryWrapper = new QueryWrapper<>();
            thingTagQueryWrapper.eq("tag_id", tag);
            List<ThingTag> thingTagList = thingTagMapper.selectList(thingTagQueryWrapper);
            for (Thing thing : things) {
                for (ThingTag thingTag : thingTagList) {
                    if (thing.getId().equals(thingTag.getThingId())) {
                        filteredThings.add(thing);
                    }
                }
            }
            things.clear();
            things.addAll(filteredThings);
        }

        // 附加事物标签
        for (Thing thing : things) {
            QueryWrapper<ThingTag> thingTagQueryWrapper = new QueryWrapper<>();
            thingTagQueryWrapper.lambda().eq(ThingTag::getThingId, thing.getId());
            List<ThingTag> thingTags = thingTagMapper.selectList(thingTagQueryWrapper);
            List<Long> tags = thingTags.stream().map(ThingTag::getTagId).collect(Collectors.toList());
            thing.setTags(tags);
        }

        return things;
    }

    /**
     * 创建事物
     *
     * @param thing 事物对象
     */
    @Override
    public void createThing(Thing thing) {
        System.out.println(thing); // 打印事物对象到控制台，用于调试
        thing.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置创建时间为当前时间戳

        // 初始化数值字段
        if (thing.getPv() == null) {
            thing.setPv("0");
        }
        if (thing.getScore() == null) {
            thing.setScore("0");
        }
        if (thing.getWishCount() == null) {
            thing.setWishCount("0");
        }

        mapper.insert(thing); // 将事物对象插入数据库

        // 更新事物标签
        setThingTags(thing);
    }

    /**
     * 删除事物
     *
     * @param id 事物ID
     */
    @Override
    public void deleteThing(String id) {
        mapper.deleteById(id); // 根据ID删除事物
    }

    /**
     * 更新事物
     *
     * @param thing 更新后的事物对象
     */
    @Override
    public void updateThing(Thing thing) {
        // 更新事物标签
        setThingTags(thing);

        mapper.updateById(thing); // 根据ID更新事物信息
    }

    /**
     * 根据ID获取事物详情
     *
     * @param id 事物ID
     * @return 返回对应ID的事物对象
     */
    @Override
    public Thing getThingById(String id) {
        Thing thing = mapper.selectById(id); // 根据ID查询事物信息
        thing.setPv(String.valueOf(Integer.parseInt(thing.getPv()) + 1)); // PV加1
        mapper.updateById(thing); // 更新PV计数到数据库
        return thing;
    }

    /**
     * 心愿数加1
     *
     * @param thingId 事物ID
     */
    @Override
    public void addWishCount(String thingId) {
        Thing thing = mapper.selectById(thingId);
        thing.setWishCount(String.valueOf(Integer.parseInt(thing.getWishCount()) + 1));
        mapper.updateById(thing);
    }

    /**
     * 收藏数加1
     *
     * @param thingId 事物ID
     */
    @Override
    public void addCollectCount(String thingId) {
        Thing thing = mapper.selectById(thingId);
        thing.setCollectCount(String.valueOf(Integer.parseInt(thing.getCollectCount()) + 1));
        mapper.updateById(thing);
    }

    /**
     * 获取用户发布的所有事物
     *
     * @param userId 用户ID
     * @return 返回用户发布的所有事物列表
     */
    @Override
    public List<Thing> getUserThing(String userId) {
        QueryWrapper<Thing> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return mapper.selectList(queryWrapper);
    }

    /**
     * 设置事物的标签
     *
     * @param thing 事物对象
     */
    public void setThingTags(Thing thing) {
        // 删除原有的标签关联
        Map<String, Object> map = new HashMap<>();
        map.put("thing_id", thing.getId());
        thingTagMapper.deleteByMap(map);

        // 添加新的标签关联
        if (thing.getTags() != null) {
            for (Long tag : thing.getTags()) {
                ThingTag thingTag = new ThingTag();
                thingTag.setThingId(thing.getId());
                thingTag.setTagId(tag);
                thingTagMapper.insert(thingTag);
            }
        }
    }

}