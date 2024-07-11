package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.Notice;
import com.gk.study.mapper.NoticeMapper;
import com.gk.study.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {

    @Autowired
    NoticeMapper mapper; // 自动注入NoticeMapper

    /**
     * 获取所有公告列表
     *
     * @return 所有公告列表
     */
    @Override
    public List<Notice> getNoticeList() {
        return mapper.selectList(new QueryWrapper<>()); // 查询所有公告列表
    }

    /**
     * 创建公告
     *
     * @param notice 公告对象
     */
    @Override
    public void createNotice(Notice notice) {
        System.out.println(notice);
        notice.setCreateTime(String.valueOf(System.currentTimeMillis()));
        mapper.insert(notice); // 插入公告记录
    }

    /**
     * 删除公告
     *
     * @param id 公告ID
     */
    @Override
    public void deleteNotice(String id) {
        mapper.deleteById(id); // 根据ID删除公告记录
    }

    /**
     * 更新公告
     *
     * @param notice 公告对象
     */
    @Override
    public void updateNotice(Notice notice) {
        mapper.updateById(notice); // 根据ID更新公告信息
    }
}
