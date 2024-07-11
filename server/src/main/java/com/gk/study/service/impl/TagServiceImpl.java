package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.mapper.TagMapper;
import com.gk.study.entity.Tag;
import com.gk.study.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    @Autowired
    TagMapper mapper; // 自动注入 TagMapper 实例，用于数据库操作

    /**
     * 获取所有标签列表
     *
     * @return 返回所有标签的列表
     */
    @Override
    public List<Tag> getTagList() {
        return mapper.selectList(new QueryWrapper<>()); // 使用 MyBatis Plus 的查询包装器查询数据库中的所有标签列表
    }

    /**
     * 创建标签
     *
     * @param tag 标签对象
     */
    @Override
    public void createTag(Tag tag) {
        System.out.println(tag); // 打印标签对象到控制台，用于调试
        tag.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置当前时间戳作为创建时间
        mapper.insert(tag); // 将标签对象插入到数据库
    }

    /**
     * 删除标签
     *
     * @param id 标签的ID
     */
    @Override
    public void deleteTag(String id) {
        mapper.deleteById(id); // 根据标签ID从数据库中删除标签
    }

    /**
     * 更新标签
     *
     * @param tag 更新后的标签对象
     */
    @Override
    public void updateTag(Tag tag) {
        mapper.updateById(tag); // 根据标签ID更新数据库中的标签信息
    }
}
