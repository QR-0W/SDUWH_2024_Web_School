package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.mapper.ClassificationMapper;
import com.gk.study.entity.Classification;
import com.gk.study.service.ClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassificationServiceImpl extends ServiceImpl<ClassificationMapper, Classification> implements ClassificationService {

    @Autowired
    ClassificationMapper mapper; // 自动注入ClassificationMapper

    /**
     * 获取分类列表
     *
     * @return 分类列表
     */
    @Override
    public List<Classification> getClassificationList() {
        return mapper.selectList(new QueryWrapper<>()); // 查询所有分类并返回列表
    }

    /**
     * 创建分类
     *
     * @param classification 分类对象
     */
    @Override
    public void createClassification(Classification classification) {
        System.out.println(classification); // 打印分类信息（调试用）
        classification.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置创建时间为当前时间戳
        mapper.insert(classification); // 插入分类记录
    }

    /**
     * 删除分类
     *
     * @param id 分类ID
     */
    @Override
    public void deleteClassification(String id) {
        mapper.deleteById(id); // 根据ID删除分类记录
    }

    /**
     * 更新分类信息
     *
     * @param classification 分类对象
     */
    @Override
    public void updateClassification(Classification classification) {
        mapper.updateById(classification); // 根据ID更新分类信息
    }
}
