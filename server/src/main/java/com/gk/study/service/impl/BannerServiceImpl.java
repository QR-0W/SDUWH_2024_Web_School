package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.service.BannerService;
import com.gk.study.entity.Banner;
import com.gk.study.mapper.BannerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerServiceImpl extends ServiceImpl<BannerMapper, Banner> implements BannerService {

    @Autowired
    BannerMapper mapper; // 自动注入BannerMapper

    /**
     * 获取轮播图列表
     *
     * @return 轮播图列表
     */
    @Override
    public List<Banner> getBannerList() {
        return mapper.selectList(new QueryWrapper<>()); // 查询所有轮播图并返回列表
    }

    /**
     * 创建轮播图
     *
     * @param banner 轮播图对象
     */
    @Override
    public void createBanner(Banner banner) {
        System.out.println(banner); // 打印轮播图信息（调试用）
        banner.setCreateTime(String.valueOf(System.currentTimeMillis())); // 设置创建时间为当前时间戳
        mapper.insert(banner); // 插入轮播图记录
    }

    /**
     * 删除轮播图
     *
     * @param id 轮播图ID
     */
    @Override
    public void deleteBanner(String id) {
        mapper.deleteById(id); // 根据ID删除轮播图记录
    }

    /**
     * 更新轮播图信息
     *
     * @param banner 轮播图对象
     */
    @Override
    public void updateBanner(Banner banner) {
        mapper.updateById(banner); // 根据ID更新轮播图信息
    }
}
