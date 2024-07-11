package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.mapper.AdMapper;
import com.gk.study.service.AdService;
import com.gk.study.entity.Ad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdServiceImpl extends ServiceImpl<AdMapper, Ad> implements AdService {

    @Autowired
    AdMapper mapper; // 自动注入AdMapper

    /**
     * 获取广告列表
     *
     * @return 广告列表
     */
    @Override
    public List<Ad> getAdList() {
        return mapper.selectList(new QueryWrapper<>()); // 查询所有广告并返回列表
    }

    /**
     * 创建广告
     *
     * @param ad 广告对象
     */
    @Override
    public void createAd(Ad ad) {
        System.out.println(ad); // 打印广告信息（调试用）
        ad.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置创建时间为当前时间戳
        mapper.insert(ad); // 插入广告记录
    }

    /**
     * 删除广告
     *
     * @param id 广告ID
     */
    @Override
    public void deleteAd(String id) {
        mapper.deleteById(id); // 根据ID删除广告记录
    }

    /**
     * 更新广告信息
     *
     * @param ad 广告对象
     */
    @Override
    public void updateAd(Ad ad) {
        mapper.updateById(ad); // 根据ID更新广告信息
    }
}
