package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.OpLog;
import com.gk.study.mapper.OpLogMapper;
import com.gk.study.service.OpLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpLogServiceImpl extends ServiceImpl<OpLogMapper, OpLog> implements OpLogService {

    @Autowired
    OpLogMapper mapper; // 自动注入OpLogMapper

    /**
     * 获取操作日志列表（前1000条）
     *
     * @return 操作日志列表
     */
    @Override
    public List<OpLog> getOpLogList() {
        QueryWrapper<OpLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderBy(true, false, "re_time"); // 按照re_time降序排序
        queryWrapper.last("limit 0, 1000"); // 只获取前1000条记录
        return mapper.selectList(queryWrapper); // 查询操作日志列表
    }

    /**
     * 创建操作日志
     *
     * @param opLog 操作日志对象
     */
    @Override
    public void createOpLog(OpLog opLog) {
        mapper.insert(opLog); // 插入操作日志
    }

    /**
     * 删除操作日志
     *
     * @param id 操作日志ID
     */
    @Override
    public void deleteOpLog(String id) {
        mapper.deleteById(id); // 根据ID删除操作日志
    }

    /**
     * 更新操作日志
     *
     * @param opLog 操作日志对象
     */
    @Override
    public void updateOpLog(OpLog opLog) {
        mapper.updateById(opLog); // 根据ID更新操作日志
    }

    /**
     * 获取登录日志列表（前1000条）
     *
     * @return 登录日志列表
     */
    @Override
    public List<OpLog> getLoginLogList() {
        QueryWrapper<OpLog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("re_url", "/api/user/userLogin"); // 查询登录日志
        queryWrapper.orderBy(true, false, "re_time"); // 按照re_time降序排序
        queryWrapper.last("limit 0, 1000"); // 只获取前1000条记录
        return mapper.selectList(queryWrapper); // 查询登录日志列表
    }
}
